import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useStore } from '@store';
import { PatientForm } from '../../../patients.types';

/**
 * <UpdatePatient /> props
 */
const useUpdatePatientProps = () => {
  const params = useParams();
  const navigate = useNavigate();

  const {
    patients: {
      currentPatientId,
      initialValues,
      getPatientById,
      updatePatient,
      deletePatient
    }
  } = useStore();

  const [isEditing, setIsEditing] = useState(false);

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const onDelete = () => {
    deletePatient(currentPatientId, navigate);
  };

  useEffect(() => {
    if (!params?.id) return;

    getPatientById(+params.id);
  }, [params]);

  return {
    isEditing,
    initialValues,
    onSubmit: (values: PatientForm) => updatePatient(values, toggleEditing),
    onDelete,
    toggleEditing
  };
};

export { useUpdatePatientProps };
