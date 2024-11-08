/**
 * Links
 */
const links: {
  label: string;
  href: string;
  isAdministrator?: boolean;
}[] = [
  {
    label: 'Appointments',
    href: '/appointments?page=1&perPage=20'
  },
  {
    label: 'Patients',
    href: '/patients?page=1&perPage=20'
  },
  {
    label: 'Doctors',
    href: '/doctors',
    isAdministrator: true
  }
];

export { links };
