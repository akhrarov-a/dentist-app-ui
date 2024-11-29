import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Form as AntdForm, Input } from 'antd';
import { rules } from '@utils';
import { NotFound } from '@components';
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

    if (!Object.keys(initialValues || {}).length) return <NotFound />;

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
                  {t('form.actions.cancel')}
                </Button>
              )}

              <Button type="primary" htmlType="submit">
                {isEdit ? t('form.actions.save') : t('form.actions.create')}
              </Button>
            </div>
          </div>

          <div className={styles.content}>
            <AntdForm.Item
              label={t('form.fields.firstname.label')}
              name="firstname"
              rules={[
                rules.whitespace(
                  t('form.validations.shouldNotStartOrEndWithWhitespace')
                ),
                rules.required(t('form.validations.required'))
              ]}
              validateTrigger="onBlur"
            >
              <Input placeholder={t('form.fields.firstname.placeholder')} />
            </AntdForm.Item>

            <AntdForm.Item
              label={t('form.fields.phone.label')}
              name="phone"
              rules={[
                rules.whitespace(
                  t('form.validations.shouldNotStartOrEndWithWhitespace')
                ),
                rules.required(t('form.validations.required'))
              ]}
              validateTrigger="onBlur"
            >
              <Input placeholder={t('form.fields.phone.placeholder')} />
            </AntdForm.Item>

            <AntdForm.Item
              label={t('form.fields.lastname.label')}
              name="lastname"
              rules={[
                rules.whitespace(
                  t('form.validations.shouldNotStartOrEndWithWhitespace')
                )
              ]}
              validateTrigger="onBlur"
            >
              <Input placeholder={t('form.fields.lastname.placeholder')} />
            </AntdForm.Item>

            <AntdForm.Item
              label={t('form.fields.email.label')}
              name="email"
              rules={[
                rules.email(t('form.validations.email')),
                rules.whitespace(
                  t('form.validations.shouldNotStartOrEndWithWhitespace')
                )
              ]}
              validateTrigger="onBlur"
            >
              <Input
                type="email"
                placeholder={t('form.fields.email.placeholder')}
              />
            </AntdForm.Item>
          </div>

          <AntdForm.Item
            label={t('form.fields.description.label')}
            name="description"
            rules={[
              rules.whitespace(
                t('form.validations.shouldNotStartOrEndWithWhitespace')
              )
            ]}
            validateTrigger="onBlur"
          >
            <Input.TextArea
              placeholder={t('form.fields.description.placeholder')}
            />
          </AntdForm.Item>
        </AntdForm>
      </div>
    );
  }
);

export { Form };
