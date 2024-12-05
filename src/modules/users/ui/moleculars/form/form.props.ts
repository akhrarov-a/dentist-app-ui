import { UserForm } from '../../../users.types.ts';

/**
 * <Form /> props
 */
type FormProps = {
  isEdit?: boolean;
  isFetchedUser?: boolean;
  initialValues: UserForm;
  onSubmit: (values: UserForm) => void;
  toggleEditing?: () => void;
};

export type { FormProps };
