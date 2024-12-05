import { NavigateFunction } from 'react-router-dom';
import { makeAutoObservable, runInAction } from 'mobx';
import { AxiosError } from 'axios';
import { message } from 'antd';
import { GlobalStore } from '@store';
import { ApiErrorCodes, GetUsersParams, UserContract } from '@api';
import { filterOutFalsyValuesFromObject } from '@utils';
import { TranslationFunctionType } from '@locales';
import { UserForm } from './users.types.ts';
import { UsersAdapter } from './lib';

/**
 * Users store
 */
class UsersStore {
  constructor(global: GlobalStore) {
    this.global = global;

    makeAutoObservable(this, {}, { autoBind: true });
  }

  public global: GlobalStore;

  public users: UserContract[] = [];
  public totalUsers: number = 0;
  public usersFilters: Omit<GetUsersParams, 'page' | 'perPage'> = {};

  public currentUserId: UserContract['id'] = 0;
  public initialValues: UserForm = {} as UserForm;
  public isFetchedUser: boolean = false;

  public setUsersFilters = (filters: GetUsersParams) => {
    runInAction(() => {
      this.usersFilters = { ...this.usersFilters, ...filters };
    });
  };

  public clearInitialValues = () => {
    runInAction(() => {
      this.currentUserId = 0;
      this.initialValues = {} as UserForm;
      this.isFetchedUser = false;
    });
  };

  public getUsers = async (
    t: TranslationFunctionType,
    page: number,
    perPage: number
  ) => {
    this.global.showLoader();

    try {
      const response = await this.global.api.users.getUsers({
        page,
        perPage,
        ...filterOutFalsyValuesFromObject(this.usersFilters)
      });

      runInAction(() => {
        this.users = response.data.data;
        this.totalUsers = response.data.totalAmount;
      });
    } catch (error) {
      message.error(t('errors.somethingWentWrong'));
    } finally {
      this.global.hideLoader();
    }
  };

  public getUserById = async (
    t: TranslationFunctionType,
    id: UserContract['id']
  ) => {
    this.global.showLoader();

    try {
      const response = await this.global.api.users.getUserById(id);

      runInAction(() => {
        this.currentUserId = response.data.id;
        this.initialValues = UsersAdapter.userContractToUserForm(response.data);
      });
    } catch (e) {
      const error = e as AxiosError;

      if (error?.response?.status === 404) {
        message.error(t('errors.notFound')?.replace('{{id}}', id?.toString()));
      } else {
        message.error(t('errors.somethingWentWrong'));
      }
    } finally {
      runInAction(() => {
        this.isFetchedUser = true;
      });

      this.global.hideLoader();
    }
  };

  public createUser = async (
    t: TranslationFunctionType,
    data: UserForm,
    navigate: NavigateFunction
  ) => {
    this.global.showLoader();

    try {
      const response = await this.global.api.users.createUser(
        UsersAdapter.userFormToCreateUserDto(data)
      );

      message.success(t('successfullyCreated'));
      navigate(`/users/${response.data.id}`);
    } catch (e) {
      const error = e as AxiosError;

      const errorCode = (error?.response?.data as any)?.errorCode;

      if (errorCode === ApiErrorCodes.ALREADY_EXISTS) {
        message.error(t('errors.userWithThisEmailAlreadyExists'));
      } else {
        message.error(t('errors.somethingWentWrong'));
      }
    } finally {
      this.global.hideLoader();
    }
  };

  public updateUser = async (
    t: TranslationFunctionType,
    data: UserForm,
    callback: () => void
  ) => {
    this.global.showLoader();

    try {
      const currentUserId = this.currentUserId;

      await this.global.api.users.updateUser({
        id: currentUserId,
        ...UsersAdapter.userFormToUpdateUserDto(data)
      });

      message.success(t('successfullyUpdated'));

      this.clearInitialValues();

      await this.getUserById(t, currentUserId);

      callback();
    } catch (e) {
      const error = e as AxiosError;

      const errorCode = (error?.response?.data as any)?.errorCode;

      if (error?.response?.status === 404) {
        message.error(
          t('errors.notFound')?.replace(
            '{{id}}',
            this.currentUserId?.toString()
          )
        );
      } else if (errorCode === ApiErrorCodes.ALREADY_EXISTS) {
        message.error(t('errors.userWithThisEmailAlreadyExists'));
      } else {
        message.error(t('errors.somethingWentWrong'));
      }
    } finally {
      this.global.hideLoader();
    }
  };

  public deleteUser = async (
    t: TranslationFunctionType,
    id: UserContract['id'],
    navigate: NavigateFunction
  ) => {
    this.global.showLoader();

    try {
      await this.global.api.users.deleteUserById(id);

      message.success(t('successfullyDeleted'));

      navigate('/users');
    } catch (e) {
      const error = e as AxiosError;

      if (error?.response?.status === 404) {
        message.error(t('errors.notFound')?.replace('{{id}}', id?.toString()));
      } else {
        message.error(t('errors.somethingWentWrong'));
      }
    } finally {
      this.global.hideLoader();
    }
  };

  public deleteUsers = async (
    t: TranslationFunctionType,
    ids: UserContract['id'][]
  ) => {
    this.global.showLoader();

    try {
      await this.global.api.users.deleteUsersByIds(ids);

      message.success(t('successfullyDeleted'));
    } catch (e) {
      const error = e as AxiosError;

      if (error?.response?.status === 404) {
        message.error(t('errors.notFound')?.replace('{{id}}', ids.join(', ')));
      } else {
        message.error(t('errors.somethingWentWrong'));
      }
    } finally {
      this.global.hideLoader();
    }
  };
}

export { UsersStore };
