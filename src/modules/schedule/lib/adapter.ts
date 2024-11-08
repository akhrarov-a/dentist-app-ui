import { CreateScheduleDto, ScheduleContract, UpdateScheduleDto } from '@api';
import { ScheduleForm } from '../schedule.types.ts';

/**
 * Schedule adapter
 */
class ScheduleAdapter {
  static scheduleContractToScheduleForm(
    schedule: ScheduleContract
  ): ScheduleForm {
    return {
      patientId: schedule.patient.id,
      startTime: schedule.startTime,
      endTime: schedule.endTime,
      description: schedule.description
    };
  }

  static scheduleFormToCreateScheduleDto(
    schedule: ScheduleForm
  ): CreateScheduleDto {
    return {
      patientId: schedule.patientId,
      startTime: schedule.startTime,
      endTime: schedule.endTime,
      description: schedule.description
    };
  }

  static scheduleFormToUpdateScheduleDto(
    schedule: ScheduleForm
  ): UpdateScheduleDto {
    return {
      patientId: schedule.patientId,
      startTime: schedule.startTime,
      endTime: schedule.endTime,
      description: schedule.description
    };
  }
}

export { ScheduleAdapter };
