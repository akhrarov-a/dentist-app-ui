import axios, { AxiosRequestConfig } from 'axios';
import cookie from 'react-cookies';
import { HttpService } from './http.service';

/**
 * Auth service
 */
class AuthService {
  public constructor(private http: HttpService) {
    const accessToken: string = cookie.load('accessToken');
    const refreshToken: string = cookie.load('refreshToken');

    this.accessToken = accessToken;
    this.refreshToken = refreshToken;

    if (!accessToken && !refreshToken) return;

    this.setInterceptors();
  }

  private refreshToken: string;
  private accessToken: string;

  private requestInterceptorId: number;
  private responseInterceptorId: number;

  private refreshPromise: Promise<any> = null;

  /**
   * Clear promise
   */
  private clearPromise = () => {
    this.refreshPromise = null;
  };

  /**
   * Set tokens
   */
  private setTokens = ({ refreshToken, accessToken }: Tokens) => {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;

    cookie.save('accessToken', accessToken, { path: '/' });
    cookie.save('refreshToken', refreshToken, { path: '/', maxAge: 604800 });
  };

  /**
   * Set interceptors
   */
  private setInterceptors = () => {
    this.requestInterceptorId = this.http.instance.interceptors.request.use(
      async config => {
        if (!config.url.includes('auth/refresh') && this.refreshPromise) {
          try {
            await this.refreshPromise;
          } catch (error) {
            console.log(error, 'REFRESH ERROR');
          }
        }

        config.headers.Authorization = `Bearer ${this.getToken()}`;

        return config;
      }
    );

    this.responseInterceptorId = this.http.instance.interceptors.response.use(
      response => response,
      async error => {
        const refreshToken: string = cookie.load('refreshToken');

        if (
          !(axios.isAxiosError(error) && error.response?.status === 401) ||
          (error.config.url.startsWith('/auth') &&
            !error.config.url.includes('logout')) ||
          !refreshToken
        )
          throw error;

        return new Promise(async (resolve, reject) => {
          const config: AxiosRequestConfig & { _retry?: boolean } =
            error.config;

          try {
            if (!this.refreshPromise) {
              this.refreshPromise = this.refresh(refreshToken)
                .then(response => {
                  this.setTokens(response.data);
                })

                .finally(this.clearPromise);
            }

            await this.refreshPromise;
          } catch (e) {
            this.clearTokens();
            this.clearInterceptors();

            cookie.remove('accessToken');
            cookie.remove('refreshToken');
            cookie.remove('user');

            window.location.href = '/login';
          }

          try {
            const response = await this.http.request(config);

            resolve({ data: response });
          } catch (e) {
            reject(e);
          }
        });
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
    cookie.remove('user');
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

export { AuthService };
export type { AuthCredentials };
