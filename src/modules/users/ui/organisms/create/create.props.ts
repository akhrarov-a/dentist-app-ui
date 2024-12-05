import { useNavigate } from 'react-router-dom';
import { useStore } from '@store';
import { useLocales } from '@locales';
import { UserForm } from '../../../users.types.ts';

/**
 * <CreateUser /> props
 */
const useCreateUserProps = () => {
  const navigate = useNavigate();

  const { t } = useLocales();

  const {
    users: { createUser }
  } = useStore();

  return {
    onSubmit: (values: UserForm) => createUser(t, values, navigate)
  };
};

export { useCreateUserProps };
