import { HttpService } from './http.service';
import { PatientContract } from './patients.service';

/**
 * Schedule service
 */
class ScheduleService {
  public constructor(private http: HttpService) {}

  /**
   * Get schedule for today
   */
  public getScheduleForToday = (params: GetScheduleParams) =>
    this.http.request<{ date: string; appointments: ScheduleContract[] }>({
      url: '/appointments',
      method: 'GET',
      params
    });

  /**
   * Get schedule by id
   */
  public getScheduleById = (id: ScheduleContract['id']) =>
    this.http.request<ScheduleContract>({
      url: `/appointments/${id}`,
      method: 'GET'
    });

  /**
   * Create schedule
   */
  public createSchedule = (data: CreateScheduleDto) =>
    this.http.request<Pick<ScheduleContract, 'id'>>({
      url: '/appointments',
      method: 'POST',
      data
    });

  /**
   * Update schedule
   */
  public updateSchedule = ({ id, ...data }: UpdateScheduleDto) =>
    this.http.request<void>({
      url: `/appointments/${id}`,
      method: 'PATCH',
      data
    });

  /**
   * Delete schedule by id
   */
  public deleteScheduleById = (id: ScheduleContract['id']) =>
    this.http.request<void>({
      url: `/appointments/${id}`,
      method: 'DELETE'
    });
}

/**
 * Schedule contract
 */
type ScheduleContract = CreateAndUpdateFields<{
  id: number;
  patient: PatientContract;
  startTime: DateTimeString;
  endTime: DateTimeString;
  description: string;
  userId: number;
}>;

/**
 * Get schedule params
 */
type GetScheduleParams = {
  date: MomentDateTimeString;
};

/**
 * Create schedule DTO
 */
type CreateScheduleDto = Omit<
  ScheduleContract,
  'id' | 'userId' | 'description' | 'createdAt' | 'updatedAt' | 'patient'
> &
  Partial<Pick<ScheduleContract, 'description'>> & {
    patientId: PatientContract['id'];
  };

/**
 * Update schedule DTO
 */
type UpdateScheduleDto = Partial<
  Omit<ScheduleContract, 'userId' | 'createdAt' | 'updatedAt' | 'patient'>
> & {
  patientId: PatientContract['id'];
};

export { ScheduleService };
export type {
  ScheduleContract,
  GetScheduleParams,
  CreateScheduleDto,
  UpdateScheduleDto
};
