import { useNavigate } from 'react-router-dom';
import { Form } from 'antd';
import { useStore } from '@store';
import { AuthCredentials } from '@api';
import { useLocales } from '@locales';

/**
 * <Login /> props
 */
const useLoginProps = () => {
  const navigate = useNavigate();

  const { t } = useLocales();

  const {
    auth: { login }
  } = useStore();

  const [form] = Form.useForm();

  return {
    t,
    form,
    onLogin: (authCredentials: AuthCredentials) =>
      login(t, authCredentials, navigate)
  };
};

export { useLoginProps };
