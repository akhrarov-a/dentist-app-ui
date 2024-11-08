import { Button, Form, Input } from 'antd';
import { hoc, rules } from '@utils';
import { AuthLayout } from '../../moleculars';
import { useLoginProps } from './login.props';
import styles from './login.module.scss';

/**
 * <Login />
 */
const Login = hoc.observer(useLoginProps, ({ t, form, onLogin }) => (
  <AuthLayout>
    <Form
      form={form}
      layout="vertical"
      initialValues={{
        email: '',
        password: ''
      }}
      onFinish={onLogin}
      scrollToFirstError
    >
      <Form.Item
        className={styles.row_input}
        label={t('auth.login.email.label')}
        name="email"
        rules={[rules.required(t('form.validations.required'))]}
        validateTrigger="onBlur"
      >
        <Input type="email" placeholder={t('auth.login.email.placeholder')} />
      </Form.Item>

      <Form.Item
        className={styles.row_input}
        label={t('auth.login.password.label')}
        name="password"
        rules={[rules.required(t('form.validations.required'))]}
        validateTrigger="onBlur"
      >
        <Input
          type="password"
          placeholder={t('auth.login.password.placeholder')}
        />
      </Form.Item>

      <Button className={styles.button} type="primary" htmlType="submit">
        {t('auth.login.submit')}
      </Button>
    </Form>
  </AuthLayout>
));

export { Login };
