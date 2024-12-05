import { hoc } from '@utils';
import { Form } from '../../moleculars';
import { initialValues } from './create.constants';
import { useCreateUserProps } from './create.props';

/**
 * <CreateUser />
 */
const CreateUser = hoc.observer(useCreateUserProps, ({ onSubmit }) => (
  <Form initialValues={initialValues} onSubmit={onSubmit} />
));

export { CreateUser };
