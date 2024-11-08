import { observer } from 'mobx-react-lite';
import { Button } from 'antd';
import { useLocales } from '@locales';
import { ScheduleForm } from '../../../schedule.types.ts';
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
    initialValues: ScheduleForm;
    onDelete: () => void;
    toggleEditing?: () => void;
  }) => {
    const { t } = useLocales();

    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <p>
            {t('patients.form.patient')}: {initialValues.startTime || ''}{' '}
            {initialValues.endTime || ''}
          </p>
          <div className={styles.header_buttons}>
            <Button onClick={onDelete}>{t('table.delete')}</Button>
            <Button type="primary" onClick={toggleEditing}>
              {t('form.actions.edit')}
            </Button>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.content_field}>
            <p>{t('form.fields.firstname.label')}</p>
            <p>{initialValues.patientId}</p>
          </div>
          <div className={styles.content_field}>
            <p>{t('form.fields.phone.label')}</p>
            <p>{initialValues.startTime}</p>
          </div>
          <div className={styles.content_field}>
            <p>{t('form.fields.lastname.label')}</p>
            <p>{initialValues.endTime}</p>
          </div>
          <div className={styles.content_field}>
            <p>{t('form.fields.email.label')}</p>
            <p>{initialValues.description}</p>
          </div>
        </div>
        <div className={styles.content_field}>
          <p>{t('form.fields.description.label')}</p>
          <p>{initialValues.description}</p>
        </div>
      </div>
    );
  }
);

export { View };
