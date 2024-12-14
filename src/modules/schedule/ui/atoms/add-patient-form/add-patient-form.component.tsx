import { FC } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { rules } from '@utils';
import { useLocales } from '@locales';
import { useStore } from '@store';
import { PatientForm } from '@patients/patients.types.ts';
import { AddPatientFormProps } from './add-patient-form.props.ts';
import styles from './add-patient-form.module.scss';

/**
 * <AddPatientForm />
 */
const AddPatientForm: FC<AddPatientFormProps> = () => {
  const { t } = useLocales();
  const store = useStore();
  const [form] = Form.useForm();

  const onSubmitForm = async (
    values: Omit<Pick<PatientForm, 'firstname' | 'phone'>, 'id'>
  ) => {
    const created = await store.patients.createPatient(t, values);

    if (!created) return;

    await store.patients.findPatients(t, values.firstname);

    form.resetFields();
  };

  return (
    <Form<Pick<PatientForm, 'firstname' | 'phone'>>
      className={styles.container}
      form={form}
      layout="inline"
      initialValues={{
        firstname: '',
        phone: ''
      }}
      onFinish={onSubmitForm}
      validateMessages={{ required: 'Required' }}
    >
      <Form.Item
        name="firstname"
        rules={[
          rules.whitespace(
            t('form.validations.shouldNotStartOrEndWithWhitespace')
          ),
          rules.required(t('form.validations.required'))
        ]}
      >
        <Input placeholder={t('form.fields.firstname.placeholder')} />
      </Form.Item>

      <Form.Item
        name="phone"
        rules={[
          rules.whitespace(
            t('form.validations.shouldNotStartOrEndWithWhitespace')
          ),
          rules.required(t('form.validations.required'))
        ]}
      >
        <Input placeholder={t('form.fields.phone.placeholder')} />
      </Form.Item>

      <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
        {t('form.actions.create')}
      </Button>
    </Form>
  );
};

export { AddPatientForm };
