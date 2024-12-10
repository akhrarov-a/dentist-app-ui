import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useStore } from '@store';
import { useLocales } from '@locales';
import { ScheduleForm } from '../../../schedule.types';

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
      isFetchedSchedule,
      getScheduleById,
      updateSchedule,
      deleteSchedule,
      clearInitialValues
    },
    services: { getServices },
    patients: { clearPatients }
  } = useStore();

  const onDelete = () => {
    deleteSchedule(t, currentScheduleId, navigate);
  };

  useEffect(() => {
    getServices(t, 1, 100000, false);

    return () => {
      clearInitialValues();
      clearPatients();
    };
  }, []);

  useEffect(() => {
    if (!params?.id) return;

    getScheduleById(t, +params.id);
  }, [params]);

  return {
    initialValues,
    isFetchedSchedule,
    onSubmit: (values: ScheduleForm) => updateSchedule(t, values),
    onDelete
  };
};

export { useUpdatePatientProps };
