import { hoc } from '@utils';
import { Form } from '../../moleculars';
import { useUpdatePatientProps } from './update.props';

/**
 * <UpdateAppointment />
 */
const UpdateAppointment = hoc.observer(
  useUpdatePatientProps,
  ({ initialValues, onSubmit, onDelete }) => (
    <Form
      isEdit
      initialValues={initialValues}
      onSubmit={onSubmit}
      onDelete={onDelete}
    />
  )
);

export { UpdateAppointment };
