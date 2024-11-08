import { observer } from 'mobx-react-lite';
import { Button, Form as AntdForm, Input } from 'antd';
import { rules } from '@utils';
import { useStore } from '@store';
import { ProfileForm } from '../../../profile.types';
import styles from './form.module.scss';

/**
 * <Form />
 */
const Form = observer(({ toggleEditing }: { toggleEditing?: () => void }) => {
  const {
    profile: { initialValues, updateProfile }
  } = useStore();

  const [form] = AntdForm.useForm();

  const onSubmit = (values: ProfileForm) => {
    updateProfile(values, toggleEditing);
  };

  return (
    <div className={styles.container}>
      <AntdForm<ProfileForm>
        form={form}
        layout="vertical"
        initialValues={initialValues}
        onFinish={onSubmit}
        scrollToFirstError
      >
        <div className={styles.header}>
          <p>Profile</p>
          <div className={styles.header_buttons}>
            <Button htmlType="button" onClick={toggleEditing}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </div>
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
            <Input disabled type="email" placeholder="email" />
          </AntdForm.Item>
        </div>
      </AntdForm>
    </div>
  );
});

export { Form };
