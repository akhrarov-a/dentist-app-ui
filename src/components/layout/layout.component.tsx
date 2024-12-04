import { Fragment, PropsWithChildren, useEffect } from 'react';
import classNames from 'classnames';
import { GlobalStore, useStore } from '@store';
import { hoc } from '@utils';
import { useLocales } from '@locales';
import { Header } from './components';
import styles from './layout.module.scss';

/**
 * <Layout />
 */
const Layout = hoc.observer<PropsWithChildren, GlobalStore>(
  useStore,
  ({ loading, autoLogin, auth: { isAuthorized }, children }) => {
    const { t } = useLocales();

    useEffect(() => {
      autoLogin(t);
    }, []);

    return (
      <div>
        <div
          className={classNames(styles.loader, {
            [styles['loader-loading']]: loading
          })}
        />

        {isAuthorized && (
          <Fragment>
            <Header />

            <div className={styles.content}>{children}</div>
          </Fragment>
        )}
      </div>
    );
  }
);

export { Layout };
