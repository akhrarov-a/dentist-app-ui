import { NavigateFunction } from 'react-router-dom';
import { makeAutoObservable, runInAction } from 'mobx';
import { message } from 'antd';
import { AuthCredentials, UserRole } from '@api';
import { GlobalStore } from '@store';
import { TranslationFunctionType } from '@locales';

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
    t: TranslationFunctionType,
    authCredentials: AuthCredentials,
    navigate: NavigateFunction
  ) => {
    try {
      await this.global.api.auth.login(authCredentials);

      runInAction(() => {
        this.isAuthorized = true;
      });

      await this.global.profile.getUser(t);

      const userRole = this.global.profile.user?.role;
      if (userRole === UserRole.ADMIN) {
        navigate('/users');
      } else if (userRole === UserRole.DENTIST) {
        navigate('/schedule');
      }
    } catch (error) {
      message.error(t('errors.invalidCredentials'));
    }
  };

  public logout = async (t: TranslationFunctionType) => {
    try {
      await this.global.api.auth.logout();

      runInAction(() => {
        this.isAuthorized = false;
      });

      window.location.href = '/login';
    } catch (error) {
      message.error(t('errors.somethingWentWrong'));
    }
  };
}

export { AuthStore };
