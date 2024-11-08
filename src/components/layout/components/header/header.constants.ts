import { UserRole } from '@api';

/**
 * Links
 */
const links: {
  label: string;
  href: string;
  role: UserRole;
}[] = [
  {
    label: 'Appointments',
    href: '/appointments?page=1&perPage=20',
    role: UserRole.DENTIST
  },
  {
    label: 'Patients',
    href: '/patients?page=1&perPage=20',
    role: UserRole.DENTIST
  },
  {
    label: 'Users',
    href: '/users',
    role: UserRole.ADMIN
  }
];

export { links };
