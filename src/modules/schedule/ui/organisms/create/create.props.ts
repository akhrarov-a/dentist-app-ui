import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '@store';
import { ScheduleForm } from '../../../schedule.types';

/**
 * <CreateAppointment /> props
 */
const useCreateAppointmentProps = () => {
  const navigate = useNavigate();

  const {
    schedule: { createSchedule },
    services: { getServices }
  } = useStore();

  useEffect(() => {
    getServices(1, 100000);
  }, []);

  return {
    onSubmit: (values: ScheduleForm) => createSchedule(values, navigate)
  };
};

export { useCreateAppointmentProps };
