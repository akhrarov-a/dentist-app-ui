import { Dayjs } from 'dayjs';

/**
 * Schedule form
 */
type ScheduleForm = {
  patientId: number;
  description: string;
  startTime: Dayjs;
  endTime: Dayjs;
};

export type { ScheduleForm };
