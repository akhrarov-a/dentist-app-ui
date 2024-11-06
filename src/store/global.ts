import { makeAutoObservable, runInAction } from 'mobx';
import { ApiService } from '@api';
import { AuthStore } from '@auth/auth.store';
import { PatientsStore } from '@patients/patients.store.ts';

/**
 * Global store
 */
class GlobalStore {
  public api: ApiService;
  public auth: AuthStore;
  public patients: PatientsStore;

  constructor() {
    this.api = new ApiService();
    this.auth = new AuthStore(this);
    this.patients = new PatientsStore(this);

    makeAutoObservable(this, {}, { autoBind: true });
  }

  public loading = false;

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
