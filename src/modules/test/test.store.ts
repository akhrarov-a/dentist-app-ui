import { makeAutoObservable } from 'mobx';
import { GlobalStore } from '@store';

/**
 * Test store
 */
class TestStore {
  constructor(global: GlobalStore) {
    this.global = global;

    makeAutoObservable(this, {}, { autoBind: true });
  }

  public global: GlobalStore;
}

export { TestStore };
