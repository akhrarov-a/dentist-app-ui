import { Form } from 'antd';
import { useStore } from '@store';

/**
 * <Login /> props
 */
const useLoginProps = () => {
  const {
    auth: { login }
  } = useStore();

  const [form] = Form.useForm();

  return {
    form,
    onLogin: login
  };
};

export { useLoginProps };
