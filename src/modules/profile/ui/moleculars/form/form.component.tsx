import { observer } from 'mobx-react-lite';
import { Button, Form as AntdForm, Input } from 'antd';
import { rules } from '@utils';
import { useStore } from '@store';
import { ProfileForm } from '../../../profile.types';
import styles from './form.module.scss';
import { useLocales } from '@locales';

/**
 * <Form />
 */
const Form = observer(({ toggleEditing }: { toggleEditing?: () => void }) => {
  const {
    profile: { initialValues, updateProfile }
  } = useStore();

  const { t } = useLocales();

  const [form] = AntdForm.useForm();

  const onSubmit = (values: ProfileForm) => {
    updateProfile(values, toggleEditing);
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
      </AntdForm>
    </div>
  );
});

export { Form };
