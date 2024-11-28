import { NavigateFunction } from 'react-router-dom';
import { makeAutoObservable, runInAction } from 'mobx';
import { message } from 'antd';
import { GlobalStore } from '@store';
import { GetAppointmentsParams, ScheduleContract } from '@api';
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

  public loading: boolean = false;
  public schedules: ScheduleContract[] = [];
  public schedulesTotalAmount: number = 0;

  public currentScheduleId: ScheduleContract['id'] = 0;
  public initialValues: ScheduleForm = {} as ScheduleForm;

  public clearSchedules = () => {
    runInAction(() => {
      this.schedules = [];
      this.schedulesTotalAmount = 0;
    });
  };

  public clearInitialValues = () => {
    runInAction(() => {
      this.currentScheduleId = 0;
      this.initialValues = {} as ScheduleForm;
    });
  };

  public getSchedules = async ({
    date,
    showLoader = true,
    ...params
  }: GetAppointmentsParams & {
    date?: MomentDateTimeString;
    showLoader?: boolean;
  }) => {
    if (showLoader) {
      this.global.showLoader();
    } else {
      runInAction(() => {
        this.loading = true;
      });
    }

    try {
      if (date) {
        const response = await this.global.api.schedule.getScheduleByDate(date);

        runInAction(() => {
          this.schedules = response.data.appointments;
        });
      } else {
        const response = await this.global.api.schedule.getSchedules(params);

        runInAction(() => {
          this.schedules = response.data.data;
          this.schedulesTotalAmount = response.data.totalAmount;
        });
      }
    } catch (error) {
      message.error('Something went wrong');
    } finally {
      if (showLoader) {
        this.global.hideLoader();
      } else {
        runInAction(() => {
          this.loading = false;
        });
      }
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
      const currentScheduleId = this.currentScheduleId;
      
      await this.global.api.schedule.updateSchedule({
        id: currentScheduleId,
        ...ScheduleAdapter.scheduleFormToUpdateScheduleDto(data)
      });

      message.success('Successfully updated');

      this.clearInitialValues();

      await this.getScheduleById(currentScheduleId);
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
}

export { ScheduleStore };
