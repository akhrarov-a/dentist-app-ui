import { ServiceForm } from '../../../services.types';

/**
 * <Form /> props
 */
type FormProps = {
  isEdit?: boolean;
  isFetchedService?: boolean;
  initialValues: ServiceForm;
  onSubmit: (values: ServiceForm) => void;
  toggleEditing?: () => void;
};

export type { FormProps };
