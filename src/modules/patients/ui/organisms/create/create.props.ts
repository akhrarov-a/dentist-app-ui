import { useNavigate } from 'react-router-dom';
import { useStore } from '@store';
import { PatientForm } from '../../../patients.types';

/**
 * <CreatePatient /> props
 */
const useCreatePatientProps = () => {
  const navigate = useNavigate();

  const {
    patients: { createPatient }
  } = useStore();

  return {
    onSubmit: (values: PatientForm) => createPatient(values, navigate)
  };
};

export { useCreatePatientProps };
