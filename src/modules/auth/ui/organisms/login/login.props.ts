import { Form } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useStore } from '@store';
import { AuthCredentials } from '@api';

/**
 * <Login /> props
 */
const useLoginProps = () => {
  const navigate = useNavigate();

  const {
    auth: { login }
  } = useStore();

  const [form] = Form.useForm();

  return {
    form,
    onLogin: (authCredentials: AuthCredentials) =>
      login(authCredentials, navigate)
  };
};

export { useLoginProps };
