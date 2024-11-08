import { makeAutoObservable, runInAction } from 'mobx';
import cookie from 'react-cookies';
import { ApiService } from '@api';
import { AuthStore } from '@auth/auth.store';
import { PatientsStore } from '@patients/patients.store';
import { ProfileStore } from '@profile/profile.store';

/**
 * Global store
 */
class GlobalStore {
  public api: ApiService;
  public auth: AuthStore;
  public patients: PatientsStore;
  public profile: ProfileStore;

  constructor() {
    this.api = new ApiService();
    this.auth = new AuthStore(this);
    this.patients = new PatientsStore(this);
    this.profile = new ProfileStore(this);

    makeAutoObservable(this, {}, { autoBind: true });
  }

  public loading = false;

  public autoLogin = async () => {
    const accessToken = cookie.load('accessToken');
    const refreshToken = cookie.load('refreshToken');

    if (!accessToken && !refreshToken) {
      window.location.href = '/login';

      return;
    }

    try {
      await this.profile.getUser();
      this.auth.isAuthorized = true;
    } catch (error) {
      console.log(error);
    }
  };

  public showLoader = () => {
    runInAction(() => {
      this.loading = true;
    });
  };

  public hideLoader = () => {
    runInAction(() => {
      this.loading = false;
    });
  };
}

export { GlobalStore };
