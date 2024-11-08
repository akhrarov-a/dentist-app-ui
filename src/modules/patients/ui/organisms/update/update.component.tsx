import { hoc } from '@utils';
import { Form } from '../../moleculars';
import { useUpdatePatientProps } from './update.props';

/**
 * <UpdatePatient />
 */
const UpdatePatient = hoc.observer(
  useUpdatePatientProps,
  ({ initialValues, onSubmit }) => (
    <Form isEdit initialValues={initialValues} onSubmit={onSubmit} />
  )
);

export { UpdatePatient };
