import dayjs, { Dayjs } from 'dayjs';
import moment from 'moment';
import { CreateScheduleDto, ScheduleContract, UpdateScheduleDto } from '@api';
import { ScheduleForm } from '../schedule.types';

const getIsoString = (time: Dayjs, date: Dayjs) =>
  moment(
    `${time.format('HH:mm')} ${date.format('YYYY-MM-DD')}`,
    'HH:mm YYYY-MM-DD'
  ).toISOString();

/**
 * Schedule adapter
 */
class ScheduleAdapter {
  static scheduleContractToScheduleForm(
    schedule: ScheduleContract
  ): ScheduleForm {
    return {
      patientId: schedule.patient.id,
      date: dayjs(schedule.startTime),
      startTime: dayjs(schedule.startTime),
      endTime: dayjs(schedule.endTime),
      description: schedule.description
    };
  }

  static scheduleFormToCreateScheduleDto(
    schedule: ScheduleForm
  ): CreateScheduleDto {
    return {
      patientId: schedule.patientId,
      startTime: getIsoString(schedule.startTime, schedule.date),
      endTime: getIsoString(schedule.endTime, schedule.date),
      description: schedule.description
    };
  }

  static scheduleFormToUpdateScheduleDto(
    schedule: ScheduleForm
  ): UpdateScheduleDto {
    return {
      patientId: schedule.patientId,
      startTime: getIsoString(schedule.startTime, schedule.date),
      endTime: getIsoString(schedule.endTime, schedule.date),
      description: schedule.description
    };
  }
}

export { ScheduleAdapter };
