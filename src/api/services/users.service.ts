import { HttpService } from './http.service';
import { Status, UserRole } from '@api';

/**
 * Users service
 */
class UsersService {
  public constructor(private http: HttpService) {}

  /**
   * Get users
   */
  public getUsers = (params: GetUsersParams) =>
    this.http.request<ApiResponseList<UserContract>>({
      url: '/users',
      method: 'GET',
      params
    });

  /**
   * Get user by id
   */
  public getUserById = (id: UserContract['id']) =>
    this.http.request<UserContract>({
      url: `/users/${id}`,
      method: 'GET'
    });

  /**
   * Create user
   */
  public createUser = (data: CreateUserDto) =>
    this.http.request<Pick<UserContract, 'id'>>({
      url: '/users',
      method: 'POST',
      data
    });

  /**
   * Update user
   */
  public updateUser = ({ id, ...data }: UpdateUserDto) =>
    this.http.request<void>({
      url: `/users/${id}`,
      method: 'PATCH',
      data
    });

  /**
   * Delete user by id
   */
  public deleteUserById = (id: UserContract['id']) =>
    this.http.request<void>({
      url: `/users/${id}`,
      method: 'DELETE'
    });

  /**
   * Delete users by ids
   */
  public deleteUsersByIds = (ids: UserContract['id'][]) =>
    this.http.request<void>({
      url: '/users/by/ids',
      method: 'DELETE',
      data: { ids }
    });
}

/**
 * User contract
 */
type UserContract = CreateAndUpdateFields<{
  id: number;
  firstname: string;
  lastname: string;
  description: string;
  phone: string;
  email: string;
  language: string;
  role: UserRole;
  status: Status;
  layoutTitle: string;
  holidays: string[];
  weekends: string[];
  workingHours: string;
}>;

/**
 * Get users params
 */
type GetUsersParams = Partial<
  Omit<
    UserContract,
    | 'id'
    | 'language'
    | 'layoutTitle'
    | 'holidays'
    | 'weekends'
    | 'workingHours'
    | 'createdAt'
    | 'updatedAt'
  >
> & {
  page?: number;
  perPage?: number;
};

/**
 * Create user DTO
 */
type CreateUserDto = Omit<
  UserContract,
  | 'id'
  | 'description'
  | 'layoutTitle'
  | 'holidays'
  | 'weekends'
  | 'workingHours'
  | 'language'
  | 'createdAt'
  | 'updatedAt'
> &
  Partial<
    Pick<
      UserContract,
      | 'description'
      | 'layoutTitle'
      | 'holidays'
      | 'language'
      | 'weekends'
      | 'workingHours'
    >
  > & { password: string };

/**
 * Update user DTO
 */
type UpdateUserDto = Partial<
  Omit<UserContract, 'createdAt' | 'updatedAt'> & {
    password: string;
  }
>;

export { UsersService };
export type { UserContract, GetUsersParams, CreateUserDto, UpdateUserDto };
