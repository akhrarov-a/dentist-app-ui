import { Fragment, PropsWithChildren, useLayoutEffect } from 'react';
import { GlobalStore, useStore } from '@store';
import { hoc } from '@utils';
import styles from './layout.module.scss';

/**
 * <Layout />
 */
const Layout = hoc.observer<PropsWithChildren, GlobalStore>(
  useStore,
  ({ autoLogin, auth: { isAuthorized }, children }) => {
    useLayoutEffect(() => {
      autoLogin();
    }, []);

    return (
      <div className={styles.container}>
        {isAuthorized && (
          <Fragment>
            <div className={styles.content}>{children}</div>
          </Fragment>
        )}
      </div>
    );
  }
);

export { Layout };
