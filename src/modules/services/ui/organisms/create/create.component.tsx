import { hoc } from '@utils';
import { Form } from '../../moleculars';
import { initialValues } from './create.constants';
import { useCreateServiceProps } from './create.props';

/**
 * <CreateService />
 */
const CreateService = hoc.observer(useCreateServiceProps, ({ onSubmit }) => (
  <Form initialValues={initialValues} onSubmit={onSubmit} />
));

export { CreateService };
