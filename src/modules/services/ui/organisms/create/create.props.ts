import { useNavigate } from 'react-router-dom';
import { useStore } from '@store';
import { useLocales } from '@locales';
import { ServiceForm } from '../../../services.types';

/**
 * <CreateService /> props
 */
const useCreateServiceProps = () => {
  const navigate = useNavigate();

  const { t } = useLocales();

  const {
    services: { createService }
  } = useStore();

  return {
    onSubmit: (values: ServiceForm) => createService(t, values, navigate)
  };
};

export { useCreateServiceProps };
