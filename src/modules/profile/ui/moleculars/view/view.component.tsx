import { observer } from 'mobx-react-lite';
import { Button } from 'antd';
import { useStore } from '@store';
import { useLocales } from '@locales';
import styles from './view.module.scss';

/**
 * <View />
 */
const View = observer(({ toggleEditing }: { toggleEditing?: () => void }) => {
  const {
    profile: { user }
  } = useStore();

  const { t } = useLocales();

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
      </div>
    </div>
  );
});

export { View };
