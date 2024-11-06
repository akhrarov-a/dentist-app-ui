import { makeAutoObservable } from 'mobx';
import { NavigateFunction } from 'react-router-dom';
import { message } from 'antd';
import { GlobalStore } from '@store';
import { GetPatientsParams, PatientContract } from '@api';
import { PatientForm } from './patients.types.ts';
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

  public setPatientsFilters = (filters: GetPatientsParams) => {
    this.patientsFilters = { ...this.patientsFilters, ...filters };
  };

  public clearInitialValues = () => {
    this.initialValues = {} as PatientForm;
  };

  public getPatients = async (page: number, perPage: number) => {
    this.global.showLoader();

    try {
      const response = await this.global.api.patients.getPatients({
        page,
        perPage,
        ...Object.fromEntries(
          Object.entries(this.patientsFilters).filter(([_, value]) => !!value)
        )
      });

      this.patients = response.data.data;
      this.totalPatients = response.data.totalPatients;
    } catch (error) {
      message.error('Something went wrong');
    } finally {
      this.global.hideLoader();
    }
  };

  public getPatientById = async (id: PatientContract['id']) => {
    this.global.showLoader();

    try {
      const response = await this.global.api.patients.getPatientById(id);

      this.currentPatientId = response.data.id;
      this.initialValues = PatientsAdapter.patientContractToPatientForm(
        response.data
      );
    } catch (error) {
      message.error('Something went wrong');
    } finally {
      this.global.hideLoader();
    }
  };

  public createPatient = async (
    data: PatientForm,
    navigate: NavigateFunction
  ) => {
    this.global.showLoader();

    try {
      const response = await this.global.api.patients.createPatient(
        PatientsAdapter.patientFormToCreatePatientDto(data)
      );

      message.success('Successfully created');
      navigate(`/patients/${response.data.id}`);
    } catch (error) {
      message.error('Something went wrong');
    } finally {
      this.global.hideLoader();
    }
  };

  public updatePatient = async (data: PatientForm) => {
    this.global.showLoader();

    try {
      await this.global.api.patients.updatePatient({
        id: this.currentPatientId,
        ...PatientsAdapter.patientFormToUpdatePatientDto(data)
      });

      message.success('Successfully updated');

      this.clearInitialValues();

      await this.getPatientById(this.currentPatientId);
    } catch (error) {
      message.error('Something went wrong');
    } finally {
      this.global.hideLoader();
    }
  };

  public deletePatient = async (id: PatientContract['id']) => {
    this.global.showLoader();

    try {
      await this.global.api.patients.deletePatientById(id);

      message.success('Successfully deleted');
    } catch (error) {
      message.error('Something went wrong');
    } finally {
      this.global.hideLoader();
    }
  };

  public deletePatients = async (ids: PatientContract['id'][]) => {
    this.global.showLoader();

    try {
      await this.global.api.patients.deletePatientsByIds(ids);

      message.success('Successfully deleted');
    } catch (error) {
      message.error('Something went wrong');
    } finally {
      this.global.hideLoader();
    }
  };
}

export { PatientsStore };
