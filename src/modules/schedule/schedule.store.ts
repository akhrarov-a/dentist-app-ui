import { NavigateFunction } from 'react-router-dom';
import { makeAutoObservable, runInAction } from 'mobx';
import { message } from 'antd';
import { GlobalStore } from '@store';
import { DateType, GetAppointmentsParams, ScheduleContract } from '@api';
import { TranslationFunctionType } from '@locales';
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

  public schedulesByDate: { date: string; appointments: ScheduleContract[] }[] =
    [];

  public currentScheduleId: ScheduleContract['id'] = 0;
  public initialValues: ScheduleForm = {} as ScheduleForm;
  public isCloning: boolean = false;

  public clearSchedules = () => {
    runInAction(() => {
      this.schedulesByDate = [];
      this.schedules = [];
      this.schedulesTotalAmount = 0;
    });
  };

  public clearInitialValues = () => {
    runInAction(() => {
      this.currentScheduleId = 0;
      this.initialValues = {} as ScheduleForm;
      this.isCloning = false;
    });
  };

  public getSchedules = async ({
    t,
    date,
    type,
    showLoader = true,
    ...params
  }: GetAppointmentsParams & {
    t: TranslationFunctionType;
    date?: DateTimeString;
    type?: DateType;
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
        const response = await this.global.api.schedule.getScheduleByDate(
          date,
          type
        );

        runInAction(() => {
          this.schedulesByDate = response.data.appointments;
        });
      } else {
        const response = await this.global.api.schedule.getSchedules(params);

        runInAction(() => {
          this.schedules = response.data.data;
          this.schedulesTotalAmount = response.data.totalAmount;
        });
      }
    } catch (error) {
      message.error(t('errors.somethingWentWrong'));
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

  public cloneScheduleById = async (
    t: TranslationFunctionType,
    id: ScheduleContract['id']
  ) => {
    this.global.showLoader();

    try {
      const response = await this.global.api.schedule.getScheduleById(id);

      runInAction(() => {
        this.isCloning = true;
        const initialValues = ScheduleAdapter.scheduleContractToScheduleForm(
          response.data
        );

        this.initialValues = {
          ...initialValues,
          date: null
        };
      });

      this.global.patients.findPatients(t, response.data.patient.firstname);
    } catch (error) {
      message.error(t('errors.somethingWentWrong'));
    } finally {
      this.global.hideLoader();
    }
  };

  public getScheduleById = async (
    t: TranslationFunctionType,
    id: ScheduleContract['id']
  ) => {
    this.global.showLoader();

    try {
      const response = await this.global.api.schedule.getScheduleById(id);

      runInAction(() => {
        this.currentScheduleId = response.data.id;
        this.initialValues = ScheduleAdapter.scheduleContractToScheduleForm(
          response.data
        );
      });

      this.global.patients.findPatients(t, response.data.patient.firstname);
    } catch (error) {
      message.error(t('errors.somethingWentWrong'));
    } finally {
      this.global.hideLoader();
    }
  };

  public createSchedule = async (
    t: TranslationFunctionType,
    data: ScheduleForm,
    navigate: NavigateFunction
  ) => {
    this.global.showLoader();

    try {
      const response = await this.global.api.schedule.createSchedule(
        ScheduleAdapter.scheduleFormToCreateScheduleDto(data)
      );

      runInAction(() => {
        this.isCloning = false;
      });

      message.success(t('successfullyCreated'));
      navigate(`/schedule/${response.data.id}`);
    } catch (error) {
      message.error(t('errors.somethingWentWrong'));
    } finally {
      this.global.hideLoader();
    }
  };

  public updateSchedule = async (
    t: TranslationFunctionType,
    data: ScheduleForm
  ) => {
    this.global.showLoader();

    try {
      const currentScheduleId = this.currentScheduleId;

      await this.global.api.schedule.updateSchedule({
        id: currentScheduleId,
        ...ScheduleAdapter.scheduleFormToUpdateScheduleDto(data)
      });

      message.success(t('successfullyUpdated'));

      this.clearInitialValues();

      await this.getScheduleById(t, currentScheduleId);
    } catch (error) {
      message.error(t('errors.somethingWentWrong'));
    } finally {
      this.global.hideLoader();
    }
  };

  public deleteSchedule = async (
    t: TranslationFunctionType,
    id: ScheduleContract['id'],
    navigate: NavigateFunction
  ) => {
    this.global.showLoader();

    try {
      await this.global.api.schedule.deleteScheduleById(id);

      message.success(t('successfullyDeleted'));

      navigate('/schedule');
    } catch (error) {
      message.error(t('errors.somethingWentWrong'));
    } finally {
      this.global.hideLoader();
    }
  };
}

export { ScheduleStore };
