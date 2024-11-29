import { ProfileContract, UpdateProfileDto } from '@api';
import { ProfileForm } from '../profile.types';

/**
 * Profile adapter
 */
class ProfileAdapter {
  static profileContractToProfileForm(patient: ProfileContract): ProfileForm {
    return {
      firstname: patient.firstname,
      lastname: patient.lastname,
      email: patient.email,
      phone: patient.phone,
      language: patient.language,
      layoutTitle: patient.layoutTitle,
      useMyFirstNameAndLastnameForLayoutTitle:
        patient.layoutTitle?.trim() ===
        `${patient.firstname} ${patient.lastname}`?.trim()
    };
  }

  static profileFormToUpdateProfileDto(patient: ProfileForm): UpdateProfileDto {
    return {
      firstname: patient.firstname,
      lastname: patient.lastname,
      email: patient.email,
      phone: patient.phone,
      language: patient.language,
      layoutTitle: patient.layoutTitle
    };
  }
}

export { ProfileAdapter };
