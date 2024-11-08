import { UserRole } from '@api';
import { TranslationFunctionType } from '@locales';

/**
 * Links
 */
const links = (
  t: TranslationFunctionType
): {
  label: string;
  href: string;
  role: UserRole;
}[] => [
  {
    label: t('links.schedule'),
    href: '/schedule',
    role: UserRole.DENTIST
  },
  {
    label: t('links.patients'),
    href: '/patients?page=1&perPage=20',
    role: UserRole.DENTIST
  },
  {
    label: t('links.users'),
    href: '/users',
    role: UserRole.ADMIN
  }
];

export { links };
