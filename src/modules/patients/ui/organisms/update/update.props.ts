import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useStore } from '@store';
import { useLocales } from '@locales';
import { PatientForm } from '../../../patients.types';

/**
 * <UpdatePatient /> props
 */
const useUpdatePatientProps = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { t } = useLocales();

  const {
    patients: {
      currentPatientId,
      initialValues,
      getPatientById,
      updatePatient,
      deletePatient,
      clearInitialValues
    }
  } = useStore();

  const [isEditing, setIsEditing] = useState(false);

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const onDelete = () => {
    deletePatient(t, currentPatientId, navigate);
  };

  useEffect(
    () => () => {
      clearInitialValues();
    },
    []
  );

  useEffect(() => {
    if (!params?.id) return;

    getPatientById(t, +params.id);
  }, [params]);

  return {
    isEditing,
    initialValues,
    onSubmit: (values: PatientForm) => updatePatient(t, values, toggleEditing),
    onDelete,
    toggleEditing
  };
};

export { useUpdatePatientProps };
