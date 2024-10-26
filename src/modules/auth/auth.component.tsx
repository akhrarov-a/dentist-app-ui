import { hoc } from '@utils';
import { useAuthProps } from './auth.props';
import styles from './auth.module.scss';

/**
 * <Auth />
 */
const Auth = hoc.observer(useAuthProps, ({}) => (
  <div className={styles.container}>Auth page</div>
));

export { Auth };
