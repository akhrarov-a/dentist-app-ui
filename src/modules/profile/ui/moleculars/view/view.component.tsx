import { observer } from 'mobx-react-lite';
import { Button } from 'antd';
import { useStore } from '@store';
import styles from './view.module.scss';

/**
 * <View />
 */
const View = observer(({ toggleEditing }: { toggleEditing?: () => void }) => {
  const {
    profile: { user }
  } = useStore();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p>Profile</p>
        <div className={styles.header_buttons}>
          {/*TODO: implement reset password logic*/}
          <Button disabled>Reset password</Button>
          <Button type="primary" onClick={toggleEditing}>
            Edit
          </Button>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.content_field}>
          <p>Firstname</p>
          <p>{user.firstname}</p>
        </div>
        <div className={styles.content_field}>
          <p>Phone</p>
          <p>{user.phone}</p>
        </div>
        <div className={styles.content_field}>
          <p>Lastname</p>
          <p>{user.lastname}</p>
        </div>
        <div className={styles.content_field}>
          <p>Email</p>
          <p>{user.email}</p>
        </div>
      </div>
    </div>
  );
});

export { View };
