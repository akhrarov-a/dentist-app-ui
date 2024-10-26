import { ApiService } from '@api';
import { AuthStore } from '@auth/auth.store';
import { makeAutoObservable, runInAction } from 'mobx';

/**
 * Global store
 */
class GlobalStore {
  public api: ApiService;
  public auth: AuthStore;

  constructor() {
    this.api = new ApiService();
    this.auth = new AuthStore(this);

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
