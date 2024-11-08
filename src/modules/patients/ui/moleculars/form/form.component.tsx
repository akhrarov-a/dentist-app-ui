import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Form as AntdForm, Input } from 'antd';
import { rules } from '@utils';
import { useLocales } from '@locales';
import { PatientForm } from '../../../patients.types';
import { FormProps } from './form.props';
import styles from './form.module.scss';

/**
 * <Form />
 */
const Form = observer<FormProps>(
  ({ isEdit, initialValues, onSubmit, toggleEditing }) => {
    const [form] = AntdForm.useForm();

    const { t } = useLocales();

    useEffect(() => {
      if (!Object.keys(initialValues || {}).length) return;

      form.setFieldsValue(initialValues);
    }, [initialValues]);

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
                ? `${t('patients.form.editLabel')}: ${initialValues.firstname || ''} ${initialValues.firstname || ''}`
                : t('patients.form.createLabel')}
            </p>

            <div className={styles.header_buttons}>
              {isEdit && (
                <Button htmlType="button" onClick={toggleEditing}>
                  {t('form.cancel')}
                </Button>
              )}

              <Button type="primary" htmlType="submit">
                {isEdit ? t('form.save') : t('form.create')}
              </Button>
            </div>
          </div>

          <div className={styles.content}>
            <AntdForm.Item
              label={t('patients.form.firstname.label')}
              name="firstname"
              rules={[
                rules.whitespace(
                  t('validations.shouldNotStartOrEndWithWhitespace')
                ),
                rules.required(t('validations.required'))
              ]}
              validateTrigger="onBlur"
            >
              <Input placeholder={t('patients.form.firstname.placeholder')} />
            </AntdForm.Item>

            <AntdForm.Item
              label={t('patients.form.phone.label')}
              name="phone"
              rules={[
                rules.whitespace(
                  t('validations.shouldNotStartOrEndWithWhitespace')
                ),
                rules.required(t('validations.required'))
              ]}
              validateTrigger="onBlur"
            >
              <Input placeholder={t('patients.form.phone.placeholder')} />
            </AntdForm.Item>

            <AntdForm.Item
              label={t('patients.form.lastname.label')}
              name="lastname"
              rules={[
                rules.whitespace(
                  t('validations.shouldNotStartOrEndWithWhitespace')
                ),
                rules.required(t('validations.required'))
              ]}
              validateTrigger="onBlur"
            >
              <Input placeholder={t('patients.form.lastname.placeholder')} />
            </AntdForm.Item>

            <AntdForm.Item
              label={t('patients.form.email.label')}
              name="email"
              rules={[
                rules.email(t('validations.email')),
                rules.whitespace(
                  t('validations.shouldNotStartOrEndWithWhitespace')
                ),
                rules.required(t('validations.required'))
              ]}
              validateTrigger="onBlur"
            >
              <Input
                type="email"
                placeholder={t('patients.form.email.placeholder')}
              />
            </AntdForm.Item>
          </div>

          <AntdForm.Item
            label={t('patients.form.description.label')}
            name="description"
            rules={[
              rules.whitespace(
                t('validations.shouldNotStartOrEndWithWhitespace')
              )
            ]}
            validateTrigger="onBlur"
          >
            <Input.TextArea
              placeholder={t('patients.form.description.placeholder')}
            />
          </AntdForm.Item>
        </AntdForm>
      </div>
    );
  }
);

export { Form };
