import { HttpService } from './http.service';
import { PatientContract } from './patients.service';
import { ServiceContract } from './services.service.ts';

/**
 * Schedule service
 */
class ScheduleService {
  public constructor(private http: HttpService) {}

  /**
   * Get schedule by patient
   */
  public getScheduleByPatient = (params: GetAppointmentsByPatientParams) =>
    this.http.request<ApiResponseList<ScheduleContract>>({
      url: '/appointments/by/patient',
      method: 'GET',
      params
    });

  /**
   * Get schedule by service
   */
  public getScheduleByService = (params: GetAppointmentsByServiceParams) =>
    this.http.request<ApiResponseList<ScheduleContract>>({
      url: '/appointments/by/service',
      method: 'GET',
      params
    });

  /**
   * Get schedule by date
   */
  public getScheduleByDate = (date: string) =>
    this.http.request<{ date: string; appointments: ScheduleContract[] }>({
      url: '/appointments/by/date',
      method: 'GET',
      params: { date }
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
  services: {
    service: ServiceContract;
    description: string;
  }[];
  startTime: DateTimeString;
  endTime: DateTimeString;
  description: string;
  userId: number;
}>;

/**
 * Get appointments by patient params
 */
type GetAppointmentsByPatientParams = {
  page: number;
  perPage: number;
  patient: number;
};

/**
 * Get appointments by service params
 */
type GetAppointmentsByServiceParams = {
  page: number;
  perPage: number;
  service: number;
};

/**
 * Create schedule DTO
 */
type CreateScheduleDto = Omit<
  ScheduleContract,
  | 'id'
  | 'userId'
  | 'description'
  | 'createdAt'
  | 'updatedAt'
  | 'patient'
  | 'services'
> &
  Partial<Pick<ScheduleContract, 'description'>> & {
    patientId: PatientContract['id'];
    services: {
      id: ServiceContract['id'];
      description: string;
    }[];
  };

/**
 * Update schedule DTO
 */
type UpdateScheduleDto = Partial<
  Omit<
    ScheduleContract,
    'userId' | 'createdAt' | 'updatedAt' | 'patient' | 'services'
  >
> & {
  patientId: PatientContract['id'];
  services: {
    id: ServiceContract['id'];
    description: string;
  }[];
};

export { ScheduleService };
export type {
  ScheduleContract,
  CreateScheduleDto,
  UpdateScheduleDto,
  GetAppointmentsByPatientParams,
  GetAppointmentsByServiceParams
};
