import { HttpService } from './http.service';

/**
 * Services service
 */
class ServicesService {
  public constructor(private http: HttpService) {}

  /**
   * Get services
   */
  public getServices = (params: GetServicesParams) =>
    this.http.request<ApiResponseList<ServiceContract>>({
      url: '/services',
      method: 'GET',
      params
    });

  /**
   * Get service by id
   */
  public getServiceById = (id: ServiceContract['id']) =>
    this.http.request<ServiceContract>({
      url: `/services/${id}`,
      method: 'GET'
    });

  /**
   * Create service
   */
  public createService = (data: CreateServiceDto) =>
    this.http.request<Pick<ServiceContract, 'id'>>({
      url: '/services',
      method: 'POST',
      data
    });

  /**
   * Update service
   */
  public updateService = ({ id, ...data }: UpdateServiceDto) =>
    this.http.request<void>({
      url: `/services/${id}`,
      method: 'PATCH',
      data
    });

  /**
   * Delete service by id
   */
  public deleteServiceById = (id: ServiceContract['id']) =>
    this.http.request<void>({
      url: `/services/${id}`,
      method: 'DELETE'
    });

  /**
   * Delete services by ids
   */
  public deleteServicesByIds = (ids: ServiceContract['id'][]) =>
    this.http.request<void>({
      url: '/services/by/ids',
      method: 'DELETE',
      data: { ids }
    });
}

/**
 * Service contract
 */
type ServiceContract = CreateAndUpdateFields<{
  id: number;
  name: string;
}>;

/**
 * Get services params
 */
type GetServicesParams = {
  name?: string;
  page?: number;
  perPage?: number;
};

/**
 * Create service DTO
 */
type CreateServiceDto = Omit<ServiceContract, 'id' | 'createdAt' | 'updatedAt'>;

/**
 * Update service DTO
 */
type UpdateServiceDto = Partial<
  Omit<ServiceContract, 'createdAt' | 'updatedAt'>
>;

export { ServicesService };
export type {
  ServiceContract,
  GetServicesParams,
  CreateServiceDto,
  UpdateServiceDto
};
