import { Status, UserRole } from '@api';

/**
 * User form
 */
type UserForm = {
  firstname: string;
  lastname: string;
  description?: string;
  phone: string;
  email: string;
  password?: string;
  layoutTitle?: string;
  holidays?: string[];
  weekends?: string[];
  workingHours?: string;
  language?: string;
  role: UserRole;
  status: Status;
};

export type { UserForm };
