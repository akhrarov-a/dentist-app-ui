import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Form as AntdForm, Input, Select } from 'antd';
import { Status } from '@api';
import { rules } from '@utils';
import { useLocales } from '@locales';
import { ServiceForm } from '../../../services.types.ts';
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
        <AntdForm<ServiceForm>
          form={form}
          layout="vertical"
          initialValues={initialValues}
          onFinish={onSubmit}
          scrollToFirstError
        >
          <div className={styles.header}>
            <p>
              {isEdit
                ? `${t('services.form.editLabel')}: ${initialValues.name || ''}`
                : t('services.form.createLabel')}
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

          <AntdForm.Item
            label={t('form.fields.name.label')}
            name="name"
            rules={[
              rules.whitespace(
                t('form.validations.shouldNotStartOrEndWithWhitespace')
              ),
              rules.required(t('form.validations.required'))
            ]}
            validateTrigger="onBlur"
          >
            <Input placeholder={t('form.fields.name.placeholder')} />
          </AntdForm.Item>

          <AntdForm.Item
            label={t('form.fields.status.label')}
            name="status"
            rules={[rules.required(t('form.validations.required'))]}
            validateTrigger="onBlur"
          >
            <Select
              placeholder={t('form.fields.status.placeholder')}
              options={[
                {
                  label: t('form.fields.status.options.active'),
                  value: Status.ACTIVE
                },
                {
                  label: t('form.fields.status.options.disabled'),
                  value: Status.DISABLED
                }
              ]}
            />
          </AntdForm.Item>
        </AntdForm>
      </div>
    );
  }
);

export { Form };
