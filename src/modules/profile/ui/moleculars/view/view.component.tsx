import { useMemo } from 'react';
import dayjs from 'dayjs';
import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import { Button } from 'antd';
import { getMonth, getWeekday, getWeekdays } from '@utils';
import { useStore } from '@store';
import { useLocales } from '@locales';
import styles from './view.module.scss';

/**
 * <View />
 */
const View = observer(({ toggleEditing }: { toggleEditing?: () => void }) => {
  const {
    language,
    profile: { user }
  } = useStore();

  const { t } = useLocales();

  const userWeekends = useMemo(() => {
    const weekends = user?.weekends || [];
    const weekdays = getWeekdays(language);

    return weekends
      .map(weekend => weekdays[weekend === 7 ? 0 : weekend])
      .join(', ');
  }, [language, user]);

  const userHolidays = useMemo(
    () =>
      user?.holidays?.map(holiday => {
        const date = dayjs(holiday);
        const weekday = getWeekday(date, language);
        const month = getMonth(date, language);

        return `${weekday}, ${date.date()} ${month} ${date.year()}`;
      }) || [],
    [user]
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p>{t('profile.title')}</p>
        <div className={styles.header_buttons}>
          {/*TODO: implement change password logic*/}
          <Button disabled>{t('form.actions.changePassword')}</Button>
          <Button type="primary" onClick={toggleEditing}>
            {t('form.actions.edit')}
          </Button>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.content_field}>
          <p>{t('form.fields.firstname.label')}</p>
          <p>{user.firstname}</p>
        </div>
        <div className={styles.content_field}>
          <p>{t('form.fields.phone.label')}</p>
          <p>{user.phone}</p>
        </div>
        <div className={styles.content_field}>
          <p>{t('form.fields.lastname.label')}</p>
          <p>{user.lastname}</p>
        </div>
        <div className={styles.content_field}>
          <p>{t('form.fields.email.label')}</p>
          <p>{user.email}</p>
        </div>
        <div className={styles.content_field}>
          <p>{t('form.fields.weekends.label')}</p>
          <p>{userWeekends}</p>
        </div>
        <div
          className={classNames(
            styles.content_field,
            styles.content_field_holidays
          )}
        >
          <p>{t('form.fields.holidays.label')}</p>
          <div>
            {userHolidays.map(holiday => (
              <p>{holiday}</p>
            ))}
          </div>
        </div>
        <div className={styles.content_field}>
          <p>{t('form.fields.layoutTitle.label')}</p>
          <p>{user.layoutTitle}</p>
        </div>
        <div className={styles.content_field}>
          <p>{t('form.fields.language.label')}</p>
          <p>{user.language}</p>
        </div>
      </div>
    </div>
  );
});

export { View };
