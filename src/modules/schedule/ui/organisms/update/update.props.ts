import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useStore } from '@store';
import { useLocales } from '@locales';
import { ScheduleForm } from '../../../schedule.types.ts';

/**
 * <UpdatePatient /> props
 */
const useUpdatePatientProps = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { t } = useLocales();

  const {
    schedule: {
      currentScheduleId,
      initialValues,
      getScheduleById,
      updateSchedule,
      deleteSchedule,
      clearInitialValues
    },
    services: { getServices }
  } = useStore();

  const onDelete = () => {
    deleteSchedule(t, currentScheduleId, navigate);
  };

  useEffect(() => {
    getServices(t, 1, 100000, false);

    return () => {
      clearInitialValues();
    };
  }, []);

  useEffect(() => {
    if (!params?.id) return;

    getScheduleById(t, +params.id);
  }, [params]);

  return {
    initialValues,
    onSubmit: (values: ScheduleForm) => updateSchedule(t, values),
    onDelete
  };
};

export { useUpdatePatientProps };
