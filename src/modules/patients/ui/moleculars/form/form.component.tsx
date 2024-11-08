import { Button, Form as AntdForm, Input } from 'antd';
import { observer } from 'mobx-react-lite';
import { rules } from '@utils';
import { PatientForm } from '../../../patients.types';
import { FormProps } from './form.props';
import styles from './form.module.scss';

/**
 * <Form />
 */
const Form = observer<FormProps>(({ isEdit, initialValues, onSubmit }) => {
  const [form] = AntdForm.useForm();

  return (
    <div className={styles.container}>
      <AntdForm<PatientForm>
        form={form}
        layout="vertical"
        initialValues={initialValues}
        onFinish={onSubmit}
        scrollToFirstError
      >
        <div className={styles.header}>
          <p>
            {isEdit
              ? `Edit patient ${initialValues.firstname || ''} ${initialValues.firstname || ''}`
              : 'Create patient'}
          </p>

          <Button type="primary" htmlType="submit">
            {isEdit ? 'Save' : 'Create'}
          </Button>
        </div>

        <div className={styles.content}>
          <AntdForm.Item
            label="Firstname"
            name="firstname"
            rules={[rules.whitespace(), rules.required()]}
            validateTrigger="onBlur"
          >
            <Input placeholder="firstname" />
          </AntdForm.Item>

          <AntdForm.Item
            label="Phone"
            name="phone"
            rules={[rules.whitespace(), rules.required()]}
            validateTrigger="onBlur"
          >
            <Input placeholder="phone" />
          </AntdForm.Item>

          <AntdForm.Item
            label="Lastname"
            name="lastname"
            rules={[rules.whitespace(), rules.required()]}
            validateTrigger="onBlur"
          >
            <Input placeholder="lastname" />
          </AntdForm.Item>

          <AntdForm.Item
            label="Email"
            name="email"
            rules={[rules.email(), rules.whitespace(), rules.required()]}
            validateTrigger="onBlur"
          >
            <Input type="email" placeholder="email" />
          </AntdForm.Item>
        </div>

        <AntdForm.Item
          label="Description"
          name="description"
          rules={[rules.whitespace()]}
          validateTrigger="onBlur"
        >
          <Input.TextArea placeholder="description" />
        </AntdForm.Item>
      </AntdForm>
    </div>
  );
});

export { Form };
