import { ScheduleForm } from '../../../schedule.types';

/**
 * Initial values
 */
const initialValues: ScheduleForm = {
  patientId: null,
  services: [],
  description: null,
  date: null,
  startTime: null,
  endTime: null
};

export { initialValues };
