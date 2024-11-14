import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Form as AntdForm, Input, Select, TimePicker } from 'antd';
import { rules } from '@utils';
import { useStore } from '@store';
import { useLocales } from '@locales';
import { PatientsAdapter } from '@patients/lib';
import { ScheduleForm } from '../../../schedule.types';
import { FormProps } from './form.props';
import styles from './form.module.scss';

/**
 * <Form />
 */
const Form = observer<FormProps>(
  ({ isEdit, initialValues, onSubmit, onDelete }) => {
    const {
      patients: { loading, patients, debounceFindPatients }
    } = useStore();

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
          scrollToFirstError
        >
          <div className={styles.header}>
            <p>
              {isEdit ? (
                <>
                  {t('schedule.form.editLabel')}:<br />
                  {initialValues.startTime?.format('HH:mm') || ''} -{' '}
                  {initialValues.endTime?.format('HH:mm') || ''}
                </>
              ) : (
                t('schedule.form.createLabel')
              )}
            </p>

            <div className={styles.header_buttons}>
              {isEdit && (
                <Button htmlType="button" onClick={onDelete}>
                  {t('table.delete')}
                </Button>
              )}

              <Button type="primary" htmlType="submit">
                {isEdit ? t('form.actions.save') : t('form.actions.create')}
              </Button>
            </div>
          </div>

          <AntdForm.Item
            label={t('form.fields.patient.label')}
            name="patientId"
            rules={[rules.required(t('form.validations.required'))]}
            validateTrigger="onBlur"
          >
            <Select
              loading={loading.patients}
              placeholder={t('form.fields.patient.placeholder')}
              options={PatientsAdapter.patientContractToOptionsList(patients)}
              onSearch={debounceFindPatients}
              filterOption={false}
              showSearch
            />
          </AntdForm.Item>

          <div className={styles.content}>
            <AntdForm.Item
              label={t('form.fields.timeStartFrom.label')}
              name="startTime"
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
              name="endTime"
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
