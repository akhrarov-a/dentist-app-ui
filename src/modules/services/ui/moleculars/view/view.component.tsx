import { observer } from 'mobx-react-lite';
import { Button, Modal } from 'antd';
import { useLocales } from '@locales';
import { useModal } from '@hooks';
import { ServiceForm } from '../../../services.types.ts';
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
    initialValues: ServiceForm;
    onDelete: () => void;
    toggleEditing?: () => void;
  }) => {
    const { t } = useLocales();

    const modal = useModal();

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
            {t('services.form.service')}: {initialValues.name || ''}
          </p>
          <div className={styles.header_buttons}>
            <Button onClick={modal.open}>{t('table.delete')}</Button>
            <Button type="primary" onClick={toggleEditing}>
              {t('form.actions.edit')}
            </Button>
          </div>
        </div>

        <div className={styles.content_field}>
          <p>{t('form.fields.name.label')}</p>
          <p>{initialValues.name}</p>
        </div>

        <AppointmentsHistoryTable />
      </div>
    );
  }
);

export { View };
