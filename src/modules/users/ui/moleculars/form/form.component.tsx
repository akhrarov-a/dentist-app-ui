import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Form as AntdForm, Input, Select } from 'antd';
import { rules } from '@utils';
import { Status, UserRole } from '@api';
import { NotFound } from '@components';
import { useLocales } from '@locales';
import { UserForm } from '../../../users.types';
import { FormProps } from './form.props';
import styles from './form.module.scss';

/**
 * <Form />
 */
const Form = observer<FormProps>(
  ({ isEdit, isFetchedUser, initialValues, onSubmit, toggleEditing }) => {
    const [form] = AntdForm.useForm();

    const { t } = useLocales();

    useEffect(() => {
      if (!Object.keys(initialValues || {}).length) return;

      form.setFieldsValue(initialValues);
    }, [initialValues]);

    if (!Object.keys(initialValues || {}).length && isFetchedUser)
      return <NotFound />;

    return (
      <div className={styles.container}>
        <AntdForm<UserForm>
          form={form}
          layout="vertical"
          initialValues={initialValues}
          onFinish={onSubmit}
          scrollToFirstError
        >
          <div className={styles.header}>
            <p
              dangerouslySetInnerHTML={{
                __html: isEdit
                  ? `${t('users.form.editLabel')}:<br />${initialValues.firstname || ''} ${initialValues.firstname || ''}`
                  : t('users.form.createLabel')
              }}
            />

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
                type="email"
                placeholder={t('form.fields.email.placeholder')}
              />
            </AntdForm.Item>
          </div>

          <AntdForm.Item
            label={t('form.fields.password.label')}
            name="password"
            rules={
              !isEdit
                ? [
                    rules.password(t('form.validations.password')),
                    rules.whitespace(
                      t('form.validations.shouldNotStartOrEndWithWhitespace')
                    ),
                    rules.required(t('form.validations.required'))
                  ]
                : [
                    rules.password(t('form.validations.password')),
                    rules.whitespace(
                      t('form.validations.shouldNotStartOrEndWithWhitespace')
                    )
                  ]
            }
            validateTrigger="onBlur"
          >
            <Input placeholder={t('form.fields.password.placeholder')} />
          </AntdForm.Item>

          <AntdForm.Item
            label={t('form.fields.role.label')}
            name="role"
            rules={[rules.required(t('form.validations.required'))]}
            validateTrigger="onBlur"
          >
            <Select
              placeholder={t('form.fields.role.placeholder')}
              options={[
                {
                  label: UserRole.ADMIN,
                  value: UserRole.ADMIN
                },
                {
                  label: UserRole.DENTIST,
                  value: UserRole.DENTIST
                }
              ]}
            />
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
                  label: Status.ACTIVE,
                  value: Status.ACTIVE
                },
                {
                  label: Status.DELETED,
                  value: Status.DELETED
                }
              ]}
            />
          </AntdForm.Item>

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
