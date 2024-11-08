import { PatientForm } from '../../../schedule.types.ts';

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
