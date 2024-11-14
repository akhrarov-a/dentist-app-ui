import { useNavigate } from 'react-router-dom';
import { useStore } from '@store';
import { ScheduleForm } from '../../../schedule.types';

/**
 * <CreateAppointment /> props
 */
const useCreateAppointmentProps = () => {
  const navigate = useNavigate();

  const {
    schedule: { createSchedule }
  } = useStore();

  return {
    onSubmit: (values: ScheduleForm) => createSchedule(values, navigate)
  };
};

export { useCreateAppointmentProps };
