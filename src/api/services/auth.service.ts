import axios from 'axios';
import cookie from 'react-cookies';
import { HttpService } from './http.service';
import { UserRole } from '../models';

/**
 * Auth service
 */
class AuthService {
  public constructor(private http: HttpService) {
    const accessToken: string = cookie.load('accessToken');
    const refreshToken: string = cookie.load('refreshToken');

    this.accessToken = accessToken;
    this.refreshToken = refreshToken;

    if (!accessToken) return;

    this.setInterceptors();
  }

  private refreshToken: string;
  private accessToken: string;

  private requestInterceptorId: number;
  private responseInterceptorId: number;

  /**
   * Set tokens
   */
  private setTokens = ({ refreshToken, accessToken }: Tokens) => {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;

    cookie.save('accessToken', accessToken, {});
    cookie.save('refreshToken', refreshToken, { maxAge: 7776000 });
  };

  /**
   * Set interceptors
   */
  private setInterceptors = () => {
    this.requestInterceptorId = this.http.instance.interceptors.request.use(
      config => {
        if (
          !config.url.startsWith('/auth') ||
          config.url.includes('reset-password') ||
          config.url === '/auth/logout'
        ) {
          config.headers.Authorization = `Bearer ${this.getToken()}`;
        }

        return config;
      }
    );

    this.responseInterceptorId = this.http.instance.interceptors.response.use(
      response => response,
      async error => {
        if (
          !(axios.isAxiosError(error) && error.response?.status === 401) ||
          error.config.url.startsWith('/auth')
        )
          throw error;

        const refreshToken: string = cookie.load('refreshToken');

        try {
          const refreshResponse = await this.refresh(refreshToken);

          this.setTokens(refreshResponse.data);
        } catch (e) {
          cookie.remove('accessToken');
          cookie.remove('refreshToken');

          window.location.reload();
        }

        return this.http.request(error.config);
      }
    );
  };

  /**
   * Clear tokens
   */
  private clearTokens = () => {
    delete this.accessToken;
    delete this.refreshToken;
  };

  /**
   * Clear interceptors
   */
  private clearInterceptors = () => {
    this.http.instance.interceptors.request.eject(this.requestInterceptorId);
    this.http.instance.interceptors.response.eject(this.responseInterceptorId);
  };

  /**
   * Get token
   */
  public getToken = () => this.accessToken;

  /**
   * Login
   */
  public login = async (data: AuthCredentials) => {
    const response = await this.http.request<Tokens>({
      url: `/auth/sign-in`,
      method: 'POST',
      data
    });
    this.setTokens(response.data);

    this.setInterceptors();
  };

  /**
   * Refresh
   */
  public refresh = (refreshToken: string) =>
    this.http.request<Tokens>({
      url: `/auth/refresh`,
      method: 'POST',
      data: { refreshToken }
    });

  /**
   * Get current user
   */
  public getCurrentUser = () =>
    this.http.request<User>({
      url: '/users/current'
    });

  /**
   * Logout
   */
  public logout = async () => {
    await this.http.request({
      url: `/auth/logout`,
      method: 'GET'
    });

    this.clearTokens();
    this.clearInterceptors();

    cookie.remove('accessToken');
    cookie.remove('refreshToken');
  };
}

/**
 * Tokens
 */
type Tokens = {
  accessToken: string;
  refreshToken: string;
};

/**
 * Auth credentials
 */
type AuthCredentials = {
  email: string;
  password: string;
};

/**
 * User
 */
type User = {
  id: number;
  firstname: string;
  lastname: string;
  description: string;
  phone: string;
  email: string;
  password: string;
  salt: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
};

export { AuthService };
export type { User, AuthCredentials };
