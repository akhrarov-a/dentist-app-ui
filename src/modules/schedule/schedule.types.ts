import { Dayjs } from 'dayjs';

/**
 * Schedule form
 */
type ScheduleForm = {
  patientId: number;
  description: string;
  date: Dayjs;
  startTime: Dayjs;
  endTime: Dayjs;
};

export type { ScheduleForm };
