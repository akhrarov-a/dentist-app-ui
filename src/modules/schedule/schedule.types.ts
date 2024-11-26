import { Dayjs } from 'dayjs';

/**
 * Schedule form
 */
type ScheduleForm = {
  patientId: number;
  services: {
    id: number;
    description: string;
  }[];
  description: string;
  date: Dayjs;
  startTime: Dayjs;
  endTime: Dayjs;
};

export type { ScheduleForm };
