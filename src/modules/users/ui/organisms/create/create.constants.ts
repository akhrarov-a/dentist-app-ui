import { Status, UserRole } from '@api';
import { UserForm } from '../../../users.types';

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
