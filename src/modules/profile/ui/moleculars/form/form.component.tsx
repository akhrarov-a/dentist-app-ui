import { useMemo } from 'react';
import dayjs from 'dayjs';
import { observer } from 'mobx-react-lite';
import { Button, Checkbox, DatePicker, Form as AntdForm, Input, Select, TimePicker } from 'antd';
import { getWeekdays, rules } from '@utils';
import { useStore } from '@store';
import { useLocales } from '@locales';
import { ProfileForm } from '../../../profile.types';
import styles from './form.module.scss';

/**
 * <Form />
 */
const Form = observer(({ toggleEditing }: { toggleEditing?: () => void }) => {
  const {
    language,
    profile: { initialValues, updateProfile }
  } = useStore();

  const { t, languages } = useLocales();

  const [form] = AntdForm.useForm();

  const weekdaysOptions = useMemo(() => {
    const [sunday, ...weekdaysOptions] = getWeekdays(language);

    return [...weekdaysOptions, sunday];
  }, [language]);

  const onSubmit = (values: ProfileForm) => {
    updateProfile(t, values, toggleEditing);
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
          <p>{t('profile.title')}</p>
          <div className={styles.header_buttons}>
            <Button htmlType="button" onClick={toggleEditing}>
              {t('form.actions.cancel')}
            </Button>
            <Button type="primary" htmlType="submit">
              {t('form.actions.save')}
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
              ),
              rules.required(t('form.validations.required'))
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
              ),
              rules.required(t('form.validations.required'))
            ]}
            validateTrigger="onBlur"
          >
            <Input
              disabled
              type="email"
              placeholder={t('form.fields.email.placeholder')}
            />
          </AntdForm.Item>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            alignItems: 'flex-end',
            gap: '15px'
          }}
        >
          <AntdForm.Item
            label={t('form.fields.workingHours.label')}
            name={['workingHours', 'start']}
            validateTrigger="onBlur"
          >
            <TimePicker
              placeholder={t('form.fields.timeStartFrom.placeholder')}
              style={{ width: '100%' }}
              showSecond={false}
              needConfirm={false}
            />
          </AntdForm.Item>

          <AntdForm.Item
            name={['workingHours', 'end']}
            validateTrigger="onBlur"
          >
            <TimePicker
              placeholder={t('form.fields.timeEndTo.placeholder')}
              style={{ width: '100%' }}
              showSecond={false}
              needConfirm={false}
            />
          </AntdForm.Item>
        </div>

        <AntdForm.Item
          label={t('form.fields.weekends.label')}
          name="weekends"
          validateTrigger="onBlur"
        >
          <Select
            mode="multiple"
            placeholder={t('form.fields.weekends.placeholder')}
            options={weekdaysOptions.map((weekday, index) => ({
              label: weekday,
              value: index + 1
            }))}
          />
        </AntdForm.Item>

        <AntdForm.Item
          label={t('form.fields.holidays.label')}
          name="holidays"
          validateTrigger="onBlur"
        >
          <DatePicker
            disabledDate={date => date.isBefore(dayjs())}
            placeholder={t('form.fields.holidays.placeholder')}
            style={{ width: '100%' }}
            multiple
          />
        </AntdForm.Item>

        <div className={styles.checkbox}>
          <p>{t('form.fields.useMyFirstNameAndLastnameForLayoutTitle')}</p>
          <AntdForm.Item
            className={styles.row_equal_input}
            name="useMyFirstNameAndLastnameForLayoutTitle"
            valuePropName="checked"
            validateTrigger="onBlur"
            noStyle
          >
            <Checkbox
              onChange={event => {
                if (event.target.checked) {
                  form.setFieldsValue({
                    layoutTitle: `${form.getFieldValue('firstname')} ${form.getFieldValue('lastname')}`
                  });

                  return;
                }

                form.setFieldsValue({
                  layoutTitle: ''
                });
              }}
            />
          </AntdForm.Item>
        </div>

        <AntdForm.Item noStyle shouldUpdate>
          {formInstance => {
            const useMyFirstNameAndLastnameForLayoutTitle =
              formInstance.getFieldValue(
                'useMyFirstNameAndLastnameForLayoutTitle'
              );

            return (
              <AntdForm.Item
                label={t('form.fields.layoutTitle.label')}
                name="layoutTitle"
                rules={[
                  rules.whitespace(
                    t('form.validations.shouldNotStartOrEndWithWhitespace')
                  ),
                  rules.required(t('form.validations.required'))
                ]}
                validateTrigger="onBlur"
              >
                <Input
                  disabled={useMyFirstNameAndLastnameForLayoutTitle}
                  placeholder={t('form.fields.layoutTitle.placeholder')}
                />
              </AntdForm.Item>
            );
          }}
        </AntdForm.Item>

        <AntdForm.Item
          label={t('form.fields.language.label')}
          name="language"
          rules={[
            rules.whitespace(
              t('form.validations.shouldNotStartOrEndWithWhitespace')
            ),
            rules.required(t('form.validations.required'))
          ]}
          validateTrigger="onBlur"
        >
          <Select
            placeholder={t('form.fields.language.placeholder')}
            options={languages.map(language => ({
              label: language.name,
              value: language.id
            }))}
          />
        </AntdForm.Item>
      </AntdForm>
    </div>
  );
});

export { Form };
