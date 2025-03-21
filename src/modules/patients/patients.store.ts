import { NavigateFunction } from 'react-router-dom';
import { makeAutoObservable, runInAction } from 'mobx';
import { AxiosError } from 'axios';
import { message } from 'antd';
import { GlobalStore } from '@store';
import { ApiErrorCodes, GetPatientsParams, PatientContract } from '@api';
import { debounce, filterOutFalsyValuesFromObject } from '@utils';
import { TranslationFunctionType } from '@locales';
import { PatientForm } from './patients.types';
import { PatientsAdapter } from './lib';

/**
 * Patients store
 */
class PatientsStore {
  constructor(global: GlobalStore) {
    this.global = global;

    makeAutoObservable(this, {}, { autoBind: true });
  }

  public global: GlobalStore;

  public patients: PatientContract[] = [];
  public totalPatients: number = 0;
  public patientsFilters: Omit<GetPatientsParams, 'page' | 'perPage'> = {};

  public currentPatientId: PatientContract['id'] = 0;
  public initialValues: PatientForm = {} as PatientForm;
  public isFetchedPatient: boolean = false;

  public loading = {
    patients: false
  };

  public setPatientsFilters = (filters: GetPatientsParams) => {
    runInAction(() => {
      this.patientsFilters = { ...this.patientsFilters, ...filters };
    });
  };

  public clearInitialValues = () => {
    runInAction(() => {
      this.currentPatientId = 0;
      this.initialValues = {} as PatientForm;
      this.isFetchedPatient = false;
    });
  };

  public clearPatients = () => {
    runInAction(() => {
      this.patients = [];
      this.totalPatients = 0;
    });
  };

  public getPatients = async (
    t: TranslationFunctionType,
    page: number,
    perPage: number
  ) => {
    this.global.showLoader();

    try {
      const response = await this.global.api.patients.getPatients({
        page,
        perPage,
        ...filterOutFalsyValuesFromObject(this.patientsFilters)
      });

      runInAction(() => {
        this.patients = response.data.data;
        this.totalPatients = response.data.totalAmount;
      });
    } catch (error) {
      message.error(t('errors.somethingWentWrong'));
    } finally {
      this.global.hideLoader();
    }
  };

  public getPatientById = async (
    t: TranslationFunctionType,
    id: PatientContract['id']
  ) => {
    this.global.showLoader();

    try {
      const response = await this.global.api.patients.getPatientById(id);

      runInAction(() => {
        this.currentPatientId = response.data.id;
        this.initialValues = PatientsAdapter.patientContractToPatientForm(
          response.data
        );
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
        this.isFetchedPatient = true;
      });

      this.global.hideLoader();
    }
  };

  public createPatient = async (
    t: TranslationFunctionType,
    data: PatientForm,
    navigate?: NavigateFunction
  ) => {
    this.global.showLoader();

    try {
      const response = await this.global.api.patients.createPatient(
        PatientsAdapter.patientFormToCreatePatientDto(data)
      );

      message.success(t('successfullyCreated'));
      navigate?.(`/patients/${response.data.id}`);

      return true;
    } catch (e) {
      const error = e as AxiosError;

      const errorCode = (error?.response?.data as any)?.errorCode;

      if (errorCode === ApiErrorCodes.ALREADY_EXISTS) {
        message.error(t('errors.patientWithThisPhoneAlreadyExists'));

        if (window.location.pathname.includes('schedule')) {
          await this.findPatients(t, data.phone);
        }
      } else {
        message.error(t('errors.somethingWentWrong'));
      }
    } finally {
      this.global.hideLoader();
    }
  };

  public updatePatient = async (
    t: TranslationFunctionType,
    data: PatientForm,
    callback: () => void
  ) => {
    this.global.showLoader();

    try {
      const currentPatientId = this.currentPatientId;

      await this.global.api.patients.updatePatient({
        id: currentPatientId,
        ...PatientsAdapter.patientFormToUpdatePatientDto(data)
      });

      message.success(t('successfullyUpdated'));

      this.clearInitialValues();

      await this.getPatientById(t, currentPatientId);

      callback();
    } catch (e) {
      const error = e as AxiosError;

      const errorCode = (error?.response?.data as any)?.errorCode;

      if (error?.response?.status === 404) {
        message.error(
          t('errors.notFound')?.replace(
            '{{id}}',
            this.currentPatientId?.toString()
          )
        );
      } else if (errorCode === ApiErrorCodes.ALREADY_EXISTS) {
        message.error(t('errors.patientWithThisPhoneAlreadyExists'));
      } else {
        message.error(t('errors.somethingWentWrong'));
      }
    } finally {
      this.global.hideLoader();
    }
  };

  public deletePatient = async (
    t: TranslationFunctionType,
    id: PatientContract['id'],
    navigate: NavigateFunction
  ) => {
    this.global.showLoader();

    try {
      await this.global.api.patients.deletePatientById(id);

      message.success(t('successfullyDeleted'));

      navigate('/patients');
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

  public deletePatients = async (
    t: TranslationFunctionType,
    ids: PatientContract['id'][]
  ) => {
    this.global.showLoader();

    try {
      await this.global.api.patients.deletePatientsByIds(ids);

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

  public findPatients = async (t: TranslationFunctionType, search: string) => {
    const _search = search?.trim();

    if (!_search || search?.length < 2) return;

    this.loading = {
      ...this.loading,
      patients: true
    };

    try {
      const response =
        await this.global.api.patients.findPatientsByFirstnameOrLastnameOrPhone(
          _search
        );

      runInAction(() => {
        this.patients = response.data;
      });
    } catch (error) {
      message.error(t('errors.somethingWentWrong'));
    } finally {
      this.loading = {
        ...this.loading,
        patients: false
      };
    }
  };

  public debounceFindPatients = debounce(this.findPatients, 500);
}

export { PatientsStore };
