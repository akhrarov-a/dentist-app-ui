import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Form as AntdForm, Input, Select, TimePicker } from 'antd';
import { rules } from '@utils';
import { useLocales } from '@locales';
import { ScheduleForm } from '../../../schedule.types';
import { FormProps } from './form.props';
import styles from './form.module.scss';

/**
 * <Form />
 */
const Form = observer<FormProps>(
  ({ isEdit, initialValues, onSubmit, onDelete }) => {
    const [form] = AntdForm.useForm();

    const { t } = useLocales();

    useEffect(() => {
      if (!Object.keys(initialValues || {}).length) return;

      form.setFieldsValue(initialValues);
    }, [initialValues]);

    return (
      <div className={styles.container}>
        <AntdForm<ScheduleForm>
          form={form}
          layout="vertical"
          initialValues={initialValues}
          onFinish={onSubmit}
          onValuesChange={(changedValues, allValues) => {
            console.log(allValues);
          }}
          scrollToFirstError
        >
          <div className={styles.header}>
            <p>
              {isEdit
                ? `${t('schedule.form.editLabel')}: ${initialValues.startTime || ''} ${initialValues.endTime || ''}`
                : t('schedule.form.createLabel')}
            </p>

            <div className={styles.header_buttons}>
              {isEdit && (
                <Button htmlType="button" onClick={onDelete}>
                  {t('form.actions.delete')}
                </Button>
              )}

              <Button type="primary" htmlType="submit">
                {isEdit ? t('form.actions.save') : t('form.actions.create')}
              </Button>
            </div>
          </div>

          <AntdForm.Item
            label={t('form.fields.patient.label')}
            name="patient"
            rules={[rules.required(t('form.validations.required'))]}
            validateTrigger="onBlur"
          >
            <Select
              loading={false}
              placeholder={t('form.fields.patient.placeholder')}
              options={[]}
              optionFilterProp="label"
            />
          </AntdForm.Item>

          <div className={styles.content}>
            <AntdForm.Item
              label={t('form.fields.timeStartFrom.label')}
              name="timeStartFrom"
              rules={[rules.required(t('form.validations.required'))]}
              validateTrigger="onBlur"
            >
              <TimePicker
                placeholder={t('form.fields.timeStartFrom.placeholder')}
                style={{ width: '100%' }}
                showSecond={false}
              />
            </AntdForm.Item>

            <AntdForm.Item
              label={t('form.fields.timeEndTo.label')}
              name="timeEndTo"
              rules={[rules.required(t('form.validations.required'))]}
              validateTrigger="onBlur"
            >
              <TimePicker
                placeholder={t('form.fields.timeEndTo.placeholder')}
                style={{ width: '100%' }}
                showSecond={false}
              />
            </AntdForm.Item>
          </div>

          <AntdForm.Item
            label={t('form.fields.description.label')}
            name="description"
            rules={[
              rules.whitespace(
                t('form.validations.shouldNotStartOrEndWithWhitespace')
              ),
              rules.required(t('form.validations.required'))
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
