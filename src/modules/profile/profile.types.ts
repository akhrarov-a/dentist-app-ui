import { Dayjs } from 'dayjs';

/**
 * Profile form
 */
type ProfileForm = {
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  layoutTitle: string;
  language: string;
  useMyFirstNameAndLastnameForLayoutTitle: boolean;
  holidays: Dayjs[];
  weekends: number[];
  workingHours: {
    start: Dayjs;
    end: Dayjs;
  };
};

export type { ProfileForm };
