import { makeAutoObservable } from 'mobx';
import { NavigateFunction } from 'react-router-dom';
import { message } from 'antd';
import { AuthCredentials } from '@api';
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

  public isAuthorized: boolean = false;

  public login = async (
    authCredentials: AuthCredentials,
    navigate: NavigateFunction
  ) => {
    try {
      await this.global.api.auth.login(authCredentials);

      this.isAuthorized = true;

      navigate('/');
    } catch (error) {
      message.error('Invalid credentials');
    }
  };

  public logout = async () => {
    try {
      await this.global.api.auth.logout();

      this.isAuthorized = false;

      window.location.href = '/login';
    } catch (error) {
      message.error('Something went wrong');
    }
  };
}

export { AuthStore };
