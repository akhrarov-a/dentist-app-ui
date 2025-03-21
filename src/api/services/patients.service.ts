import { HttpService } from './http.service';

/**
 * Patients service
 */
class PatientsService {
  public constructor(private http: HttpService) {}

  /**
   * Get patients
   */
  public getPatients = (params: GetPatientsParams) =>
    this.http.request<ApiResponseList<PatientContract>>({
      url: '/patients',
      method: 'GET',
      params
    });

  /**
   * Find patients by firstname or lastname or phone
   */
  public findPatientsByFirstnameOrLastnameOrPhone = (search: string) =>
    this.http.request<PatientContract[]>({
      url: '/patients/by/firstname-or-lastname-or-phone',
      method: 'GET',
      params: { search }
    });

  /**
   * Get patient by id
   */
  public getPatientById = (id: PatientContract['id']) =>
    this.http.request<PatientContract>({
      url: `/patients/${id}`,
      method: 'GET'
    });

  /**
   * Create patient
   */
  public createPatient = (data: CreatePatientDto) =>
    this.http.request<Pick<PatientContract, 'id'>>({
      url: '/patients',
      method: 'POST',
      data
    });

  /**
   * Update patient
   */
  public updatePatient = ({ id, ...data }: UpdatePatientDto) =>
    this.http.request<void>({
      url: `/patients/${id}`,
      method: 'PATCH',
      data
    });

  /**
   * Delete patient by id
   */
  public deletePatientById = (id: PatientContract['id']) =>
    this.http.request<void>({
      url: `/patients/${id}`,
      method: 'DELETE'
    });

  /**
   * Delete patients by ids
   */
  public deletePatientsByIds = (ids: PatientContract['id'][]) =>
    this.http.request<void>({
      url: '/patients/by/ids',
      method: 'DELETE',
      data: { ids }
    });
}

/**
 * Patient contract
 */
type PatientContract = CreateAndUpdateFields<{
  id: number;
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  description: string;
}>;

/**
 * Get patients params
 */
type GetPatientsParams = Partial<
  Omit<PatientContract, 'id' | 'createdAt' | 'updatedAt'>
> & {
  page?: number;
  perPage?: number;
};

/**
 * Create patient DTO
 */
type CreatePatientDto = Omit<
  PatientContract,
  'id' | 'lastname' | 'email' | 'description' | 'createdAt' | 'updatedAt'
> &
  Partial<Pick<PatientContract, 'email' | 'description' | 'lastname'>>;

/**
 * Update patient DTO
 */
type UpdatePatientDto = Partial<
  Omit<PatientContract, 'createdAt' | 'updatedAt'>
>;

export { PatientsService };
export type {
  PatientContract,
  GetPatientsParams,
  CreatePatientDto,
  UpdatePatientDto
};
