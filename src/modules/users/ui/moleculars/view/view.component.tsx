import dayjs from 'dayjs';
import { observer } from 'mobx-react-lite';
import { Button, Modal } from 'antd';
import { useLocales } from '@locales';
import { useModal } from '@hooks';
import { useStore } from '@store';
import { NotFound } from '@components';
import { getMonth, getWeekday, getWeekdaysByIndex } from '@utils';
import { UserForm } from '../../../users.types';
import styles from './view.module.scss';

/**
 * <View />
 */
const View = observer(
  ({
    initialValues,
    onDelete,
    toggleEditing,
    isFetchedUser
  }: {
    isFetchedUser: boolean;
    initialValues: UserForm;
    onDelete: () => void;
    toggleEditing?: () => void;
  }) => {
    const { language } = useStore();
    const { t } = useLocales();

    const modal = useModal();

    if (!Object.keys(initialValues || {}).length && isFetchedUser)
      return <NotFound />;

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
            {t('users.form.user')}: {initialValues.firstname || ''}{' '}
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
          <div className={styles.content_field}>
            <p>{t('form.fields.status.label')}</p>
            <p>{initialValues.status || '-'}</p>
          </div>
          <div className={styles.content_field}>
            <p>{t('form.fields.role.label')}</p>
            <p>{initialValues.role || '-'}</p>
          </div>
          <div className={styles.content_field}>
            <p>{t('form.fields.layoutTitle.label')}</p>
            <p>{initialValues.layoutTitle || '-'}</p>
          </div>
          <div className={styles.content_field}>
            <p>{t('form.fields.workingHours.label')}</p>
            <p>{initialValues.workingHours || '-'}</p>
          </div>
          <div className={styles.content_field}>
            <p>{t('form.fields.weekends.label')}</p>
            {initialValues.weekends?.map(weekend => (
              <p>
                {getWeekdaysByIndex(weekend == '7' ? 0 : weekend, language)}
              </p>
            )) || '-'}
          </div>
          <div className={styles.content_field}>
            <p>{t('form.fields.holidays.label')}</p>

            {initialValues.holidays?.map(holiday => {
              const selectedDate = dayjs(holiday);
              const weekday = getWeekday(selectedDate, language);
              const month = getMonth(selectedDate, language);

              return (
                <p>{`${weekday}, ${selectedDate.date()} ${month} ${selectedDate.year()}`}</p>
              );
            }) || '-'}
          </div>
          <div className={styles.content_field}>
            <p>{t('form.fields.language.label')}</p>
            <p>{initialValues.language || '-'}</p>
          </div>
          <div className={styles.content_field}>
            <p>{t('form.fields.description.label')}</p>
            <p>{initialValues.description || '-'}</p>
          </div>
        </div>
      </div>
    );
  }
);

export { View };
