import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useStore } from '@store';

/**
 * <UpdatePatient /> props
 */
const useUpdatePatientProps = () => {
  const params = useParams();

  const {
    patients: { initialValues, getPatientById, updatePatient }
  } = useStore();

  useEffect(() => {
    if (!params?.id) return;

    getPatientById(+params.id);
  }, [params]);

  return {
    initialValues,
    onSubmit: updatePatient
  };
};

export { useUpdatePatientProps };
