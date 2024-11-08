import { hoc } from '@utils';
import { Form } from '../../moleculars';
import { initialValues } from './create.constants';
import { useCreatePatientProps } from './create.props';

/**
 * <CreatePatient />
 */
const CreatePatient = hoc.observer(useCreatePatientProps, ({ onSubmit }) => (
  <Form initialValues={initialValues} onSubmit={onSubmit} />
));

export { CreatePatient };
