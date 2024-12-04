import { DateType } from '../models';
import { HttpService } from './http.service';
import { PatientContract } from './patients.service';
import { ServiceContract } from './services.service';

/**
 * Schedule service
 */
class ScheduleService {
  public constructor(private http: HttpService) {}

  /**
   * Get schedules
   */
  public getSchedules = (params: GetAppointmentsParams) =>
    this.http.request<ApiResponseList<ScheduleContract>>({
      url: '/appointments',
      method: 'GET',
      params
    });

  /**
   * Get schedule by date
   */
  public getScheduleByDate = (date: string, type: DateType) =>
    this.http.request<{
      date: string;
      appointments: { date: string; appointments: ScheduleContract[] }[];
    }>({
      url: '/appointments/by/date',
      method: 'GET',
      params: { date, type }
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
  startTime: DateTimeString;
  endTime: DateTimeString;
  description: string;
  patient: PatientContract;
  appointmentServices: {
    id: number;
    service: ServiceContract;
    description: string;
  }[];
}>;

/**
 * Get appointments params
 */
type GetAppointmentsParams = {
  page?: number;
  perPage?: number;
  patient?: number;
  service?: number;
};

/**
 * Create schedule DTO
 */
type CreateScheduleDto = {
  patientId: number;
  services: {
    id: number;
    description: string;
  }[];
  startTime: DateTimeString;
  endTime: DateTimeString;
  description?: string;
};

/**
 * Update schedule DTO
 */
type UpdateScheduleDto = Partial<{
  id: number;
  patientId: number;
  services: {
    id: number;
    description: string;
  }[];
  startTime: DateTimeString;
  endTime: DateTimeString;
  description: string;
}>;

export { ScheduleService };
export type {
  ScheduleContract,
  CreateScheduleDto,
  UpdateScheduleDto,
  GetAppointmentsParams
};
