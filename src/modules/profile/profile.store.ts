import { makeAutoObservable, runInAction } from 'mobx';
import cookie from 'react-cookies';
import { AxiosError } from 'axios';
import { message } from 'antd';
import { GlobalStore } from '@store';
import { ProfileContract } from '@api';
import { Languages, TranslationFunctionType } from '@locales';
import { ProfileAdapter } from './lib';
import { ProfileForm } from './profile.types';

/**
 * Profile store
 */
class ProfileStore {
  constructor(global: GlobalStore) {
    this.global = global;

    makeAutoObservable(this, {}, { autoBind: true });
  }

  public global: GlobalStore;

  public user: ProfileContract = {} as ProfileContract;
  public initialValues: ProfileForm = {} as ProfileForm;

  public getUser = async (t: TranslationFunctionType) => {
    this.global.showLoader();

    try {
      const response = await this.global.api.profile.getCurrentUser();

      runInAction(() => {
        this.user = response.data;
        this.initialValues = ProfileAdapter.profileContractToProfileForm(
          response.data
        );
      });

      cookie.save('user', this.user, { path: '/', maxAge: 604800 });

      this.global.setLanguage(this.user.language?.toLowerCase() as Languages);
    } catch (e) {
      const error = e as AxiosError;

      if (error?.response?.status === 404) {
        message.error(t('errors.notFound'));
      } else {
        message.error(t('errors.somethingWentWrong'));
      }
    } finally {
      this.global.hideLoader();
    }
  };

  public updateProfile = async (
    t: TranslationFunctionType,
    data: ProfileForm,
    callback: () => void
  ) => {
    this.global.showLoader();

    try {
      await this.global.api.profile.updateCurrentUser(
        ProfileAdapter.profileFormToUpdateProfileDto(data)
      );

      message.success(t('successfullyUpdated'));

      await this.getUser(t);

      callback();
    } catch (e) {
      const error = e as AxiosError;

      if (error?.response?.status === 404) {
        message.error(
          t('errors.notFound')?.replace('{{id}}', this.user.id?.toString())
        );
      } else {
        message.error(t('errors.somethingWentWrong'));
      }
    } finally {
      this.global.hideLoader();
    }
  };
}

export { ProfileStore };
