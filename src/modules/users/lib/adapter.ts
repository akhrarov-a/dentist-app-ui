import { CreateUserDto, UpdateUserDto, UserContract } from '@api';
import { UserForm } from '../users.types';

/**
 * Users adapter
 */
class UsersAdapter {
  static userContractToUserForm(user: UserContract): UserForm {
    return {
      firstname: user.firstname,
      lastname: user.lastname,
      description: user.description,
      phone: user.phone,
      email: user.email,
      layoutTitle: user.layoutTitle,
      holidays: user.holidays,
      weekends: user.weekends,
      workingHours: user.workingHours,
      language: user.language,
      role: user.role,
      status: user.status
    };
  }

  static userFormToCreateUserDto(user: UserForm): CreateUserDto {
    return {
      firstname: user.firstname,
      lastname: user.lastname,
      description: user.description,
      phone: user.phone,
      email: user.email,
      password: user.password,
      layoutTitle: user.layoutTitle,
      holidays: user.holidays,
      weekends: user.weekends,
      workingHours: user.workingHours,
      language: user.language,
      role: user.role,
      status: user.status
    };
  }

  static userFormToUpdateUserDto(user: UserForm): UpdateUserDto {
    return {
      firstname: user.firstname,
      lastname: user.lastname,
      description: user.description,
      phone: user.phone,
      email: user.email,
      password: user.password,
      layoutTitle: user.layoutTitle,
      holidays: user.holidays,
      weekends: user.weekends,
      workingHours: user.workingHours,
      language: user.language,
      role: user.role,
      status: user.status
    };
  }
}

export { UsersAdapter };
