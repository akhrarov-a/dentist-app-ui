import React from 'react';
import { Button, Form, Input } from 'antd';
import { hoc } from '@utils';
import { AuthLayout } from '../../moleculars';
import { useLoginProps } from './login.props';
import styles from './login.module.scss';

/**
 * <Login />
 */
const Login = hoc.observer(useLoginProps, ({ form, onLogin }) => (
  <AuthLayout>
    <Form
      form={form}
      layout="vertical"
      initialValues={{
        email: '',
        password: ''
      }}
      onFinish={onLogin}
      validateMessages={{ required: 'Required' }}
      scrollToFirstError
    >
      <Form.Item
        className={styles.row_input}
        label="Email"
        name="email"
        rules={[{ required: true }]}
        validateTrigger="onBlur"
      >
        <Input type="email" placeholder="email" />
      </Form.Item>

      <Form.Item
        className={styles.row_input}
        label="Password"
        name="password"
        rules={[{ required: true }]}
        validateTrigger="onBlur"
      >
        <Input type="password" placeholder="password" />
      </Form.Item>

      <Button className={styles.button} type="primary" htmlType="submit">
        Submit
      </Button>
    </Form>
  </AuthLayout>
));

export { Login };
