import {
  AuthService,
  HttpService,
  PatientsService,
  ProfileService,
  ScheduleService,
  ServicesService,
  UsersService
} from './services';

/**
 * Api service
 */
class ApiService {
  private http = new HttpService(import.meta.env.VITE_API_URL);

  public auth = new AuthService(this.http);
  public patients = new PatientsService(this.http);
  public services = new ServicesService(this.http);
  public profile = new ProfileService(this.http);
  public schedule = new ScheduleService(this.http);
  public users = new UsersService(this.http);
}

export { ApiService };
export * from './models';
export * from './services';
