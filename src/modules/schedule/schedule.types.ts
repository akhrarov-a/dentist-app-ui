/**
 * Schedule form
 */
type ScheduleForm = {
  patientId: number;
  description: string;
  startTime: DateTimeString;
  endTime: DateTimeString;
};

export type { ScheduleForm };
