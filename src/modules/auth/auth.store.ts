import { makeAutoObservable } from 'mobx';
import { GlobalStore } from '@store';
import { AuthCredentials } from '@api';

/**
 * Auth store
 */
class AuthStore {
  constructor(global: GlobalStore) {
    this.global = global;

    makeAutoObservable(this, {}, { autoBind: true });
  }

  public global: GlobalStore;

  public isAuthorized: boolean = false;

  public login = async (authCredentials: AuthCredentials) => {
    try {
      await this.global.api.auth.login(authCredentials);

      this.isAuthorized = true;
    } catch (error) {
      console.log(error);
    }
  };
}

export { AuthStore };
