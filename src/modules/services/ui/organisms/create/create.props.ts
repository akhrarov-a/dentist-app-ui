import { useNavigate } from 'react-router-dom';
import { useStore } from '@store';
import { ServiceForm } from '../../../services.types.ts';

/**
 * <CreateService /> props
 */
const useCreateServiceProps = () => {
  const navigate = useNavigate();

  const {
    services: { createService }
  } = useStore();

  return {
    onSubmit: (values: ServiceForm) => createService(values, navigate)
  };
};

export { useCreateServiceProps };
