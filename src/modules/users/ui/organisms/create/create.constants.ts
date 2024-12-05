import { UserForm } from '../../../users.types.ts';
import { Status, UserRole } from '@api';

/**
 * Initial values
 */
const initialValues: UserForm = {
  firstname: null,
  lastname: null,
  description: null,
  phone: null,
  email: null,
  password: null,
  layoutTitle: null,
  holidays: [],
  weekends: [],
  workingHours: null,
  language: 'RU',
  role: UserRole.DENTIST,
  status: Status.ACTIVE
};

export { initialValues };
