import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '@store';
import { useLocales } from '@locales';
import { initialValues as values } from './create.constants';
import { ScheduleForm } from '../../../schedule.types';

/**
 * <CreateAppointment /> props
 */
const useCreateAppointmentProps = () => {
  const navigate = useNavigate();

  const { t } = useLocales();

  const {
    schedule: { isCloning, initialValues, createSchedule, clearInitialValues },
    services: { getServices },
    patients: { clearPatients }
  } = useStore();

  const _initialValues = useMemo(
    () => (isCloning ? initialValues : values),
    [isCloning, initialValues, values]
  );

  useEffect(() => {
    getServices(t, 1, 100000, false);

    return () => {
      clearInitialValues();
      clearPatients();
    };
  }, []);

  return {
    _initialValues,
    onSubmit: (values: ScheduleForm) => createSchedule(t, values, navigate)
  };
};

export { useCreateAppointmentProps };
