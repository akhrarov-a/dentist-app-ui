import dayjs from 'dayjs';
import { CreateScheduleDto, ScheduleContract, UpdateScheduleDto } from '@api';
import { ScheduleForm } from '../schedule.types';

const format = 'HH:mm';

/**
 * Schedule adapter
 */
class ScheduleAdapter {
  static scheduleContractToScheduleForm(
    schedule: ScheduleContract
  ): ScheduleForm {
    return {
      patientId: schedule.patient.id,
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
      startTime: schedule.startTime.format(format),
      endTime: schedule.endTime.format(format),
      description: schedule.description
    };
  }

  static scheduleFormToUpdateScheduleDto(
    schedule: ScheduleForm
  ): UpdateScheduleDto {
    return {
      patientId: schedule.patientId,
      startTime: schedule.startTime.format(format),
      endTime: schedule.endTime.format(format),
      description: schedule.description
    };
  }
}

export { ScheduleAdapter };
