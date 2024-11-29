import { observer } from 'mobx-react-lite';
import { Button, Modal } from 'antd';
import { useLocales } from '@locales';
import { useModal } from '@hooks';
import { NotFound } from '@components';
import { PatientForm } from '../../../patients.types';
import { AppointmentsHistoryTable } from '../appointments-history-table';
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

    const modal = useModal();

    if (!Object.keys(initialValues || {}).length) return <NotFound />;

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

        <div className={styles.header}>
          <p>
            {t('patients.form.patient')}: {initialValues.firstname || ''}{' '}
            {initialValues.lastname || ''}
          </p>
          <div className={styles.header_buttons}>
            <Button onClick={modal.open}>{t('table.delete')}</Button>
            <Button type="primary" onClick={toggleEditing}>
              {t('form.actions.edit')}
            </Button>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.content_field}>
            <p>{t('form.fields.firstname.label')}</p>
            <p>{initialValues.firstname}</p>
          </div>
          <div className={styles.content_field}>
            <p>{t('form.fields.phone.label')}</p>
            <p>{initialValues.phone}</p>
          </div>
          <div className={styles.content_field}>
            <p>{t('form.fields.lastname.label')}</p>
            <p>{initialValues.lastname || '-'}</p>
          </div>
          <div className={styles.content_field}>
            <p>{t('form.fields.email.label')}</p>
            <p>{initialValues.email || '-'}</p>
          </div>
        </div>
        <div className={styles.content_field}>
          <p>{t('form.fields.description.label')}</p>
          <p>{initialValues.description || '-'}</p>
        </div>

        <AppointmentsHistoryTable />
      </div>
    );
  }
);

export { View };
