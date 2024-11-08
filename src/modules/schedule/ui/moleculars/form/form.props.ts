import { ScheduleForm } from '../../../schedule.types.ts';

/**
 * <Form /> props
 */
type FormProps = {
  isEdit?: boolean;
  initialValues: ScheduleForm;
  onSubmit: (values: ScheduleForm) => void;
  toggleEditing?: () => void;
};

export type { FormProps };
