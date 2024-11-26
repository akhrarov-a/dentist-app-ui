import { Status } from '@api';
import { ServiceForm } from '../../../services.types.ts';

/**
 * Initial values
 */
const initialValues: ServiceForm = {
  name: null,
  status: Status.ACTIVE
};

export { initialValues };
