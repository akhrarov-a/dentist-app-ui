import { NavigateFunction } from 'react-router-dom';
import { makeAutoObservable, runInAction } from 'mobx';
import { message } from 'antd';
import { GlobalStore } from '@store';
import { GetAppointmentsByPatientParams, ScheduleContract } from '@api';
import { ScheduleForm } from './schedule.types';
import { ScheduleAdapter } from './lib';

/**
 * Schedule store
 */
class ScheduleStore {
  constructor(global: GlobalStore) {
    this.global = global;

    makeAutoObservable(this, {}, { autoBind: true });
  }

  public global: GlobalStore;

  public schedulesForPatient: ScheduleContract[] = [];
  public schedulesForPatientTotalAmount: number = 0;

  public schedules: ScheduleContract[] = [];

  public currentScheduleId: ScheduleContract['id'] = 0;
  public initialValues: ScheduleForm = {} as ScheduleForm;

  public loading = {
    schedulesForPatient: false
  };

  public clearSchedules = () => {
    runInAction(() => {
      this.schedules = [];
    });
  };

  public clearInitialValues = () => {
    runInAction(() => {
      this.initialValues = {} as ScheduleForm;
    });
  };

  public getSchedules = async (date: MomentDateTimeString) => {
    this.global.showLoader();

    try {
      const response = await this.global.api.schedule.getScheduleByDate(date);

      runInAction(() => {
        this.schedules = response.data.appointments;
      });
    } catch (error) {
      message.error('Something went wrong');
    } finally {
      this.global.hideLoader();
    }
  };

  public getScheduleById = async (id: ScheduleContract['id']) => {
    this.global.showLoader();

    try {
      const response = await this.global.api.schedule.getScheduleById(id);

      runInAction(() => {
        this.currentScheduleId = response.data.id;
        this.initialValues = ScheduleAdapter.scheduleContractToScheduleForm(
          response.data
        );
      });

      this.global.patients.findPatients(response.data.patient.firstname);
    } catch (error) {
      message.error('Something went wrong');
    } finally {
      this.global.hideLoader();
    }
  };

  public createSchedule = async (
    data: ScheduleForm,
    navigate: NavigateFunction
  ) => {
    this.global.showLoader();

    try {
      const response = await this.global.api.schedule.createSchedule(
        ScheduleAdapter.scheduleFormToCreateScheduleDto(data)
      );

      message.success('Successfully created');
      navigate(`/schedule/${response.data.id}`);
    } catch (error) {
      message.error('Something went wrong');
    } finally {
      this.global.hideLoader();
    }
  };

  public updateSchedule = async (data: ScheduleForm) => {
    this.global.showLoader();

    try {
      await this.global.api.schedule.updateSchedule({
        id: this.currentScheduleId,
        ...ScheduleAdapter.scheduleFormToUpdateScheduleDto(data)
      });

      message.success('Successfully updated');

      this.clearInitialValues();

      await this.getScheduleById(this.currentScheduleId);
    } catch (error) {
      message.error('Something went wrong');
    } finally {
      this.global.hideLoader();
    }
  };

  public deleteSchedule = async (
    id: ScheduleContract['id'],
    navigate: NavigateFunction
  ) => {
    this.global.showLoader();

    try {
      await this.global.api.schedule.deleteScheduleById(id);

      message.success('Successfully deleted');

      navigate('/schedule');
    } catch (error) {
      message.error('Something went wrong');
    } finally {
      this.global.hideLoader();
    }
  };

  public getScheduleForPatient = async (
    params: GetAppointmentsByPatientParams
  ) => {
    runInAction(() => {
      this.loading.schedulesForPatient = true;
    });

    try {
      const response =
        await this.global.api.schedule.getScheduleByPatient(params);

      runInAction(() => {
        this.schedulesForPatient = response.data.data;
        this.schedulesForPatientTotalAmount = response.data.totalAmount;
      });
    } catch (error) {
      message.error('Something went wrong');
    } finally {
      runInAction(() => {
        this.loading.schedulesForPatient = false;
      });
    }
  };
}

export { ScheduleStore };
