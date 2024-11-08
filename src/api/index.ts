import { AuthService, HttpService, PatientsService, ProfileService } from './services';

/**
 * Api service
 */
class ApiService {
  private http = new HttpService(import.meta.env.VITE_API_URL);

  public auth = new AuthService(this.http);
  public patients = new PatientsService(this.http);
  public profile = new ProfileService(this.http);
}

export { ApiService };
export * from './models';
export * from './services';
