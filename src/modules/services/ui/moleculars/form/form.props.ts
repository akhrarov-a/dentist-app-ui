import { ServiceForm } from '../../../services.types.ts';

/**
 * <Form /> props
 */
type FormProps = {
  isEdit?: boolean;
  initialValues: ServiceForm;
  onSubmit: (values: ServiceForm) => void;
  toggleEditing?: () => void;
};

export type { FormProps };
