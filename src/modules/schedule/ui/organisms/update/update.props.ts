import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useStore } from '@store';

/**
 * <UpdatePatient /> props
 */
const useUpdatePatientProps = () => {
  const params = useParams();
  const navigate = useNavigate();

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
    deleteSchedule(currentScheduleId, navigate);
  };

  useEffect(() => {
    getServices(1, 100000);

    return () => {
      clearInitialValues();
    };
  }, []);

  useEffect(() => {
    if (!params?.id) return;

    getScheduleById(+params.id);
  }, [params]);

  return {
    initialValues,
    onSubmit: updateSchedule,
    onDelete
  };
};

export { useUpdatePatientProps };
