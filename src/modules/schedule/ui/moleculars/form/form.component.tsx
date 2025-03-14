import { Fragment, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import dayjs, { Dayjs } from 'dayjs';
import classNames from 'classnames';
import { Button, DatePicker, Divider, Form as AntdForm, Input, Modal, Select, TimePicker } from 'antd';
import { rules } from '@utils';
import { useStore } from '@store';
import { useLocales } from '@locales';
import { useModal } from '@hooks';
import { ServicesAdapter } from '@services/lib';
import { PatientsAdapter } from '@patients/lib';
import { AddPatientForm } from '../../atoms/add-patient-form';
import { ScheduleForm } from '../../../schedule.types';
import { FormProps } from './form.props';
import styles from './form.module.scss';

/**
 * <Form />
 */
const Form = observer<FormProps>(
  ({ isEdit, initialValues, onSubmit, onDelete }) => {
    const { schedule: store, patients, services, profile } = useStore();

    const modal = useModal();

    const [form] = AntdForm.useForm();

    const { t } = useLocales();

    const [isPastAppointment, setIsPastAppointment] = useState(false);
    const [servicesDescriptions, setServicesDescriptions] = useState<
      ScheduleForm['services']
    >([]);

    const onServicesDescriptionsChange = (
      serviceId: number,
      description: string
    ) => {
      if (
        servicesDescriptions.some(
          serviceDescription => serviceDescription.id === serviceId
        )
      ) {
        setServicesDescriptions(
          servicesDescriptions.map(serviceDescription =>
            serviceDescription.id === serviceId
              ? {
                  ...serviceDescription,
                  description
                }
              : serviceDescription
          )
        );

        return;
      }

      setServicesDescriptions([
        ...servicesDescriptions,
        {
          id: serviceId,
          description
        }
      ]);
    };

    const checkIsDateUserWeekendOrHoliday = (value: Dayjs) => {
      if (!value) return false;

      const isHoliday = profile.user.holidays?.some(holiday =>
        value.isSame(holiday, 'date')
      );
      const isWeekend = profile.user.weekends?.includes(
        value.day() === 0 ? 7 : value.day()
      );

      return isHoliday || isWeekend;
    };

    const checkForUserWorkingHoursAndGetDisabledHours = () => {
      const splitUserWorkingHours = profile.user.workingHours?.split('-');
      const start = dayjs(splitUserWorkingHours?.[0]?.trim(), 'HH:mm');
      const end = dayjs(splitUserWorkingHours?.[1]?.trim(), 'HH:mm');

      const disabledHours = [];

      if (start) {
        for (let i = 0; i < start.hour(); i++) {
          disabledHours.push(i);
        }
      }

      if (end) {
        for (let i = end.hour(); i < 24; i++) {
          disabledHours.push(i);
        }
      }

      return disabledHours;
    };

    const dateRender = (current: Dayjs | string | number) => {
      const value = current as Dayjs;

      const isSelected = form.getFieldValue('date')?.isSame(value, 'date');
      const isWeekendOrHoliday = checkIsDateUserWeekendOrHoliday(value);

      return (
        <div
          className={classNames(styles.day, {
            [styles.day_holiday]: isWeekendOrHoliday,
            [styles.day_selected]: isSelected
          })}
        >
          {value.date()}
        </div>
      );
    };

    useEffect(() => {
      if (!Object.keys(initialValues || {}).length) return;

      form.setFieldsValue({
        ...initialValues,
        services: initialValues.services?.map(service => service.id) || []
      });

      if (isEdit || store.isCloning) {
        setServicesDescriptions(initialValues.services || []);
      }

      if (isEdit) {
        setIsPastAppointment(initialValues.date?.isBefore(new Date(), 'day'));
      }
    }, [initialValues]);

    return (
      <div className={styles.container}>
        <Modal
          okText={t('form.actions.yes')}
          cancelText={t('form.actions.no')}
          visible={modal.isOpen}
          onOk={() => {
            onDelete();
            modal.close();
          }}
          onCancel={modal.close}
          centered
        >
          {t('form.areYouSureToDelete')}
        </Modal>

        <AntdForm<ScheduleForm>
          form={form}
          layout="vertical"
          initialValues={initialValues}
          onFinish={values =>
            onSubmit({
              ...values,
              services: values.services.map(service => ({
                id: service as any,
                description: servicesDescriptions.find(
                  description => description.id === (service as any)
                )?.description
              }))
            })
          }
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
                <Button htmlType="button" onClick={modal.open}>
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
              loading={patients.loading.patients}
              placeholder={t('form.fields.patient.placeholder')}
              options={PatientsAdapter.patientContractToOptionsList(
                patients.patients
              )}
              onSearch={value => patients.debounceFindPatients(t, value)}
              dropdownRender={menu => (
                <Fragment>
                  {menu}

                  <Divider style={{ margin: '8px 0' }} />

                  <AddPatientForm />
                </Fragment>
              )}
              filterOption={false}
              showSearch
            />
          </AntdForm.Item>

          <AntdForm.Item
            label={t('form.fields.services.label')}
            name="services"
            rules={[rules.required(t('form.validations.required'))]}
            validateTrigger="onBlur"
          >
            <Select
              mode="multiple"
              loading={services.loading.services}
              placeholder={t('form.fields.services.placeholder')}
              options={ServicesAdapter.serviceContractToOptionsList(
                services.services
              )}
            />
          </AntdForm.Item>

          <AntdForm.Item noStyle shouldUpdate>
            {formInstance => {
              const servicesValues: number[] =
                formInstance.getFieldValue('services');
              const dateValue: Dayjs = formInstance.getFieldValue('date');

              return (
                <Fragment>
                  {servicesValues?.map((service, index) => (
                    <div key={index} className={styles.description}>
                      <p>
                        {services.services.find(s => s.id === service)?.name}:
                      </p>
                      <Input.TextArea
                        placeholder={t(
                          'form.fields.services.description.placeholder'
                        )}
                        value={
                          servicesDescriptions.find(
                            serviceDescription =>
                              serviceDescription.id === service
                          )?.description
                        }
                        onChange={event =>
                          onServicesDescriptionsChange(
                            service,
                            event.target.value
                          )
                        }
                      />
                    </div>
                  ))}

                  <AntdForm.Item
                    label={t('form.fields.date.label')}
                    name="date"
                    rules={[rules.required(t('form.validations.required'))]}
                    validateTrigger="onBlur"
                  >
                    <DatePicker
                      className={classNames({
                        [styles.day_holiday]:
                          checkIsDateUserWeekendOrHoliday(dateValue)
                      })}
                      disabled={isPastAppointment}
                      dateRender={dateRender}
                      placeholder={t('form.fields.date.placeholder')}
                      style={{ width: '100%' }}
                    />
                  </AntdForm.Item>
                </Fragment>
              );
            }}
          </AntdForm.Item>

          <div className={styles.content}>
            <AntdForm.Item
              label={t('form.fields.timeStartFrom.label')}
              name="startTime"
              rules={[rules.required(t('form.validations.required'))]}
              validateDebounce={500}
            >
              <TimePicker
                placeholder={t('form.fields.timeStartFrom.placeholder')}
                style={{ width: '100%' }}
                disabledHours={checkForUserWorkingHoursAndGetDisabledHours}
                hideDisabledOptions
                showSecond={false}
                needConfirm={false}
              />
            </AntdForm.Item>

            <AntdForm.Item
              label={t('form.fields.timeEndTo.label')}
              name="endTime"
              rules={[rules.required(t('form.validations.required'))]}
              validateDebounce={500}
            >
              <TimePicker
                placeholder={t('form.fields.timeEndTo.placeholder')}
                style={{ width: '100%' }}
                disabledHours={checkForUserWorkingHoursAndGetDisabledHours}
                hideDisabledOptions
                showSecond={false}
                needConfirm={false}
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
