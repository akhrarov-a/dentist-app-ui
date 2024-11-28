import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '@store';
import { useLocales } from '@locales';
import { ScheduleForm } from '../../../schedule.types';

/**
 * <CreateAppointment /> props
 */
const useCreateAppointmentProps = () => {
  const navigate = useNavigate();

  const { t } = useLocales();

  const {
    schedule: { createSchedule },
    services: { getServices }
  } = useStore();

  useEffect(() => {
    getServices(t, 1, 100000);
  }, []);

  return {
    onSubmit: (values: ScheduleForm) => createSchedule(t, values, navigate)
  };
};

export { useCreateAppointmentProps };
