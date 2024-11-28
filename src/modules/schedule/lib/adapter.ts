import dayjs, { Dayjs } from 'dayjs';
import { CreateScheduleDto, ScheduleContract, UpdateScheduleDto } from '@api';
import { ScheduleForm } from '../schedule.types';

const getIsoString = (time: Dayjs, date: Dayjs) =>
  dayjs(
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
      services: schedule.appointmentServices.map(appointmentService => ({
        id: appointmentService.service.id,
        description: appointmentService.description
      })),
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
      services: schedule.services,
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
      services: schedule.services,
      startTime: getIsoString(schedule.startTime, schedule.date),
      endTime: getIsoString(schedule.endTime, schedule.date),
      description: schedule.description
    };
  }
}

export { ScheduleAdapter };
