import { hoc } from '@utils';
import { Form } from '../../moleculars';
import { initialValues } from './create.constants';
import { useCreateAppointmentProps } from './create.props';

/**
 * <CreateAppointment />
 */
const CreateAppointment = hoc.observer(
  useCreateAppointmentProps,
  ({ onSubmit }) => <Form initialValues={initialValues} onSubmit={onSubmit} />
);

export { CreateAppointment };
