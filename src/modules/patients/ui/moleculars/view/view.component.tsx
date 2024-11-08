import { observer } from 'mobx-react-lite';
import { Button } from 'antd';
import { useLocales } from '@locales';
import { PatientForm } from '../../../patients.types.ts';
import styles from './view.module.scss';

/**
 * <View />
 */
const View = observer(
  ({
    initialValues,
    onDelete,
    toggleEditing
  }: {
    initialValues: PatientForm;
    onDelete: () => void;
    toggleEditing?: () => void;
  }) => {
    const { t } = useLocales();

    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <p>
            {t('patients.form.patient')}: {initialValues.firstname || ''}{' '}
            {initialValues.lastname || ''}
          </p>
          <div className={styles.header_buttons}>
            <Button onClick={onDelete}>{t('table.delete')}</Button>
            <Button type="primary" onClick={toggleEditing}>
              {t('form.edit')}
            </Button>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.content_field}>
            <p>{t('patients.form.firstname.label')}</p>
            <p>{initialValues.firstname}</p>
          </div>
          <div className={styles.content_field}>
            <p>{t('patients.form.phone.label')}</p>
            <p>{initialValues.phone}</p>
          </div>
          <div className={styles.content_field}>
            <p>{t('patients.form.lastname.label')}</p>
            <p>{initialValues.lastname}</p>
          </div>
          <div className={styles.content_field}>
            <p>{t('patients.form.email.label')}</p>
            <p>{initialValues.email}</p>
          </div>
        </div>
        <div className={styles.content_field}>
          <p>{t('patients.form.description.label')}</p>
          <p>{initialValues.description}</p>
        </div>
      </div>
    );
  }
);

export { View };
