import { PropsWithChildren } from 'react';
import { GlobalStore, useStore } from '@store';
import { hoc } from '@utils';
import styles from './layout.module.scss';

/**
 * <Layout />
 */
const Layout = hoc.observer<PropsWithChildren, GlobalStore>(
  useStore,
  ({ children }) => <div className={styles.container}>{children}</div>
);

export { Layout };
