import dayjs from 'dayjs';
import { ProfileContract, UpdateProfileDto } from '@api';
import { ProfileForm } from '../profile.types';

/**
 * Profile adapter
 */
class ProfileAdapter {
  static profileContractToProfileForm(profile: ProfileContract): ProfileForm {
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
      weekends: profile.weekends
    };
  }

  static profileFormToUpdateProfileDto(profile: ProfileForm): UpdateProfileDto {
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
      weekends: profile.weekends
    };
  }
}

export { ProfileAdapter };
