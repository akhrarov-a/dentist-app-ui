import { PatientForm } from '../../../patients.types';

/**
 * <Form /> props
 */
type FormProps = {
  isEdit?: boolean;
  initialValues: PatientForm;
  onSubmit: (values: PatientForm) => void;
  toggleEditing?: () => void;
};

export type { FormProps };
