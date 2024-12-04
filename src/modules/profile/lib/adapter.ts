import dayjs from 'dayjs';
import { ProfileContract, UpdateProfileDto } from '@api';
import { ProfileForm } from '../profile.types';

/**
 * Profile adapter
 */
class ProfileAdapter {
  static profileContractToProfileForm(profile: ProfileContract): ProfileForm {
    const splitWorkingHours = profile.workingHours?.split('-');
    const start = splitWorkingHours?.[0]?.trim();
    const end = splitWorkingHours?.[1]?.trim();

    return {
      firstname: profile.firstname,
      lastname: profile.lastname,
      email: profile.email,
      phone: profile.phone,
      language: profile.language,
      layoutTitle: profile.layoutTitle,
      useMyFirstNameAndLastnameForLayoutTitle:
        profile.layoutTitle?.trim() ===
        `${profile.firstname} ${profile.lastname}`?.trim(),
      holidays: profile.holidays?.map(holiday => dayjs(holiday)),
      weekends: profile.weekends,
      workingHours: {
        start: start ? dayjs(start, 'HH:mm') : null,
        end: end ? dayjs(end, 'HH:mm') : null
      }
    };
  }

  static profileFormToUpdateProfileDto(profile: ProfileForm): UpdateProfileDto {
    const start = profile.workingHours.start?.format('HH:mm');
    const end = profile.workingHours.end?.format('HH:mm');

    return {
      firstname: profile.firstname,
      lastname: profile.lastname,
      email: profile.email,
      phone: profile.phone,
      language: profile.language,
      layoutTitle: profile.layoutTitle,
      holidays: profile.holidays?.map(holiday =>
        dayjs(holiday).format('YYYY-MM-DD')
      ),
      weekends: profile.weekends,
      workingHours: `${start || ''}-${end || ''}`
    };
  }
}

export { ProfileAdapter };
