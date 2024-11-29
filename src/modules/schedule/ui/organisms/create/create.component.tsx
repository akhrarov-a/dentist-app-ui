import { hoc } from '@utils';
import { Form } from '../../moleculars';
import { useCreateAppointmentProps } from './create.props';

/**
 * <CreateAppointment />
 */
const CreateAppointment = hoc.observer(
  useCreateAppointmentProps,
  ({ _initialValues, onSubmit }) => (
    <Form initialValues={_initialValues} onSubmit={onSubmit} />
  )
);

export { CreateAppointment };
