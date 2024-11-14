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
      deleteSchedule
    }
  } = useStore();

  const onDelete = () => {
    deleteSchedule(currentScheduleId, navigate);
  };

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
