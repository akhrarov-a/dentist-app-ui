import { AuthService, HttpService, PatientsService } from './services';

/**
 * Api service
 */
class ApiService {
  private http = new HttpService(import.meta.env.VITE_API_URL);

  public auth = new AuthService(this.http);
  public patients = new PatientsService(this.http);
}

export { ApiService };
export * from './models';
export * from './services';
