import { NavigateFunction } from 'react-router-dom';
import { makeAutoObservable, runInAction } from 'mobx';
import { message } from 'antd';
import { GlobalStore } from '@store';
import { GetServicesParams, ServiceContract } from '@api';
import { filterOutFalsyValuesFromObject } from '@utils';
import { TranslationFunctionType } from '@locales';
import { ServicesAdapter } from './lib';
import { ServiceForm } from './services.types.ts';

/**
 * Services store
 */
class ServicesStore {
  constructor(global: GlobalStore) {
    this.global = global;

    makeAutoObservable(this, {}, { autoBind: true });
  }

  public global: GlobalStore;

  public services: ServiceContract[] = [];
  public totalServices: number = 0;
  public servicesFilters: Omit<GetServicesParams, 'page' | 'perPage'> = {};

  public currentServiceId: ServiceContract['id'] = 0;
  public initialValues: ServiceForm = {} as ServiceForm;

  public loading = {
    services: false
  };

  public setServicesFilters = (filters: GetServicesParams) => {
    runInAction(() => {
      this.servicesFilters = { ...this.servicesFilters, ...filters };
    });
  };

  public clearInitialValues = () => {
    runInAction(() => {
      this.currentServiceId = 0;
      this.initialValues = {} as ServiceForm;
    });
  };

  public getServices = async (
    t: TranslationFunctionType,
    page: number,
    perPage: number,
    showLoader = true
  ) => {
    if (showLoader) {
      this.global.showLoader();
    } else {
      runInAction(() => {
        this.loading.services = true;
      });
    }

    try {
      const response = await this.global.api.services.getServices({
        page,
        perPage,
        ...filterOutFalsyValuesFromObject(this.servicesFilters)
      });

      runInAction(() => {
        this.services = response.data.data;
        this.totalServices = response.data.totalAmount;
      });
    } catch (error) {
      message.error(t('errors.somethingWentWrong'));
    } finally {
      if (showLoader) {
        this.global.hideLoader();
      } else {
        runInAction(() => {
          this.loading.services = false;
        });
      }
    }
  };

  public getServiceById = async (
    t: TranslationFunctionType,
    id: ServiceContract['id']
  ) => {
    this.global.showLoader();

    try {
      const response = await this.global.api.services.getServiceById(id);

      runInAction(() => {
        this.currentServiceId = response.data.id;
        this.initialValues = ServicesAdapter.serviceContractToServiceForm(
          response.data
        );
      });
    } catch (error) {
      message.error(t('errors.somethingWentWrong'));
    } finally {
      this.global.hideLoader();
    }
  };

  public createService = async (
    t: TranslationFunctionType,
    data: ServiceForm,
    navigate: NavigateFunction
  ) => {
    this.global.showLoader();

    try {
      const response = await this.global.api.services.createService(
        ServicesAdapter.serviceFormToCreateServiceDto(data)
      );

      message.success(t('successfullyCreated'));
      navigate(`/services/${response.data.id}`);
    } catch (error) {
      message.error(t('errors.somethingWentWrong'));
    } finally {
      this.global.hideLoader();
    }
  };

  public updateService = async (
    t: TranslationFunctionType,
    data: ServiceForm,
    callback: () => void
  ) => {
    this.global.showLoader();

    try {
      const currentServiceId = this.currentServiceId;

      await this.global.api.services.updateService({
        id: currentServiceId,
        ...ServicesAdapter.serviceFormToUpdateServiceDto(data)
      });

      message.success(t('successfullyUpdated'));

      this.clearInitialValues();

      await this.getServiceById(t, currentServiceId);

      callback();
    } catch (error) {
      message.error(t('errors.somethingWentWrong'));
    } finally {
      this.global.hideLoader();
    }
  };

  public deleteService = async (
    t: TranslationFunctionType,
    id: ServiceContract['id'],
    navigate: NavigateFunction
  ) => {
    this.global.showLoader();

    try {
      await this.global.api.services.deleteServiceById(id);

      message.success(t('successfullyDeleted'));

      navigate('/services');
    } catch (error) {
      message.error(t('errors.somethingWentWrong'));
    } finally {
      this.global.hideLoader();
    }
  };

  public deleteServices = async (
    t: TranslationFunctionType,
    ids: ServiceContract['id'][]
  ) => {
    this.global.showLoader();

    try {
      await this.global.api.services.deleteServicesByIds(ids);

      message.success(t('successfullyDeleted'));
    } catch (error) {
      message.error(t('errors.somethingWentWrong'));
    } finally {
      this.global.hideLoader();
    }
  };
}

export { ServicesStore };
