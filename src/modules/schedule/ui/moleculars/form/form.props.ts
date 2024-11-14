import { ScheduleForm } from '../../../schedule.types';

/**
 * <Form /> props
 */
type FormProps = {
  isEdit?: boolean;
  initialValues: ScheduleForm;
  onSubmit: (values: ScheduleForm) => void;
  onDelete?: () => void;
};

export type { FormProps };
