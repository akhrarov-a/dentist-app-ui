import { makeAutoObservable } from 'mobx';
import { GlobalStore } from '@store';

/**
 * Auth store
 */
class AuthStore {
  constructor(global: GlobalStore) {
    this.global = global;

    makeAutoObservable(this, {}, { autoBind: true });
  }

  public global: GlobalStore;
}

export { AuthStore };
