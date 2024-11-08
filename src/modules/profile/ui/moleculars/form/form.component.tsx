import { Form as AntdForm, Input } from 'antd';
import { hoc, rules } from '@utils';
import { useStore } from '@store';
import { ProfileForm } from '../../../profile.types';
import styles from './form.module.scss';

/**
 * <Form />
 */
const Form = hoc.observer(useStore, ({ profile: { initialValues } }) => {
  const [form] = AntdForm.useForm();

  const onSubmit = () => {};

  return (
    <div className={styles.container}>
      <AntdForm<ProfileForm>
        form={form}
        layout="vertical"
        initialValues={initialValues}
        onFinish={onSubmit}
        scrollToFirstError
      >
        <AntdForm.Item
          className={styles.row_equal_input}
          name="id"
          rules={[rules.whitespace(), rules.onlyNumbers(), rules.required()]}
          validateTrigger="onBlur"
        >
          <Input />
        </AntdForm.Item>
      </AntdForm>
    </div>
  );
});

export { Form };
