import { makeAutoObservable, runInAction } from 'mobx';
import cookie from 'react-cookies';
import { ApiService } from '@api';
import { Languages } from '@locales';
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
  public language: Languages = Languages.EN;

  public setLanguage = (language: Languages) => {
    runInAction(() => {
      this.language = language;
    });
  };

  public autoLogin = async () => {
    const accessToken = cookie.load('accessToken');
    const refreshToken = cookie.load('refreshToken');

    if (!accessToken && !refreshToken) {
      runInAction(() => {
        this.auth.isAuthorized = false;
      });

      window.location.href = '/login';

      return;
    }

    try {
      runInAction(() => {
        this.auth.isAuthorized = true;
      });

      await this.profile.getUser();
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
