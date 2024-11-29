import { observer } from 'mobx-react-lite';
import { Button, Checkbox, Form as AntdForm, Input, Select } from 'antd';
import { rules } from '@utils';
import { useStore } from '@store';
import { useLocales } from '@locales';
import { ProfileForm } from '../../../profile.types';
import styles from './form.module.scss';

/**
 * <Form />
 */
const Form = observer(({ toggleEditing }: { toggleEditing?: () => void }) => {
  const {
    profile: { initialValues, updateProfile }
  } = useStore();

  const { t, languages } = useLocales();

  const [form] = AntdForm.useForm();

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
            className={styles.select}
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
