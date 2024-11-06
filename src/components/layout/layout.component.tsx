import { PropsWithChildren, useEffect } from 'react';
import { GlobalStore, useStore } from '@store';
import { hoc } from '@utils';
import styles from './layout.module.scss';

/**
 * <Layout />
 */
const Layout = hoc.observer<PropsWithChildren, GlobalStore>(
  useStore,
  ({ autoLogin, auth: { isAuthorized }, children }) => {
    useEffect(() => {
      autoLogin();
    }, []);

    return (
      <div className={styles.container}>
        {isAuthorized && <div className={styles.content}>{children}</div>}
      </div>
    );
  }
);

export { Layout };
