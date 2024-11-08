import { makeAutoObservable } from 'mobx';
import { message } from 'antd';
import { GlobalStore } from '@store';
import { ProfileContract } from '@api';
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

  public getUser = async () => {
    this.global.showLoader();

    try {
      const response = await this.global.api.profile.getCurrentUser();

      this.user = response.data;
      this.initialValues = ProfileAdapter.profileContractToProfileForm(
        response.data
      );
    } catch (error) {
      message.error('Something went wrong');
    } finally {
      this.global.hideLoader();
    }
  };

  public updatePatient = async (data: ProfileForm) => {
    this.global.showLoader();

    try {
      await this.global.api.profile.updateCurrentUser(
        ProfileAdapter.profileFormToUpdateProfileDto(data)
      );

      message.success('Successfully updated');

      await this.getUser();
    } catch (error) {
      message.error('Something went wrong');
    } finally {
      this.global.hideLoader();
    }
  };
}

export { ProfileStore };
