import { UserRole } from '@api';
import { HttpService } from './http.service';

/**
 * Profile service
 */
class ProfileService {
  public constructor(private http: HttpService) {}

  /**
   * Get current user
   */
  public getCurrentUser = () =>
    this.http.request<ProfileContract>({
      url: '/users/current'
    });

  /**
   * Update current user
   */
  public updateCurrentUser = (data: UpdateProfileDto) =>
    this.http.request<void>({
      method: 'PATCH',
      url: '/users/current',
      data
    });
}

/**
 * Profile contract
 */
type ProfileContract = {
  id: number;
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  layoutTitle: string;
  language: string;
  holidays: string[];
  weekends: number[];
  role: UserRole;
};

/**
 * Update current user dto
 */
type UpdateProfileDto = Omit<ProfileContract, 'id' | 'role'>;

export { ProfileService };
export type { ProfileContract, UpdateProfileDto };
