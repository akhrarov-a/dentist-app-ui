import { CreateServiceDto, ServiceContract, UpdateServiceDto } from '@api';
import { ServiceForm } from '../services.types.ts';

/**
 * Services adapter
 */
class ServicesAdapter {
  static serviceContractToServiceForm(service: ServiceContract): ServiceForm {
    return {
      name: service.name,
      status: service.status
    };
  }

  static serviceFormToCreateServiceDto(service: ServiceForm): CreateServiceDto {
    return {
      name: service.name,
      status: service.status
    };
  }

  static serviceFormToUpdateServiceDto(service: ServiceForm): UpdateServiceDto {
    return {
      name: service.name,
      status: service.status
    };
  }

  static serviceContractToOptionsList(services: ServiceContract[]) {
    return services.map(service => ({
      label: service.name,
      value: service.id
    }));
  }
}

export { ServicesAdapter };
