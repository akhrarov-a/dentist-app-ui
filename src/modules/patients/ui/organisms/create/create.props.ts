import { useNavigate } from 'react-router-dom';
import { useStore } from '@store';
import { useLocales } from '@locales';
import { PatientForm } from '../../../patients.types';

/**
 * <CreatePatient /> props
 */
const useCreatePatientProps = () => {
  const navigate = useNavigate();

  const { t } = useLocales();

  const {
    patients: { createPatient }
  } = useStore();

  return {
    onSubmit: (values: PatientForm) => createPatient(t, values, navigate)
  };
};

export { useCreatePatientProps };
