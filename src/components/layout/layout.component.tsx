import { hoc } from '@utils';
import { GlobalStore, useStore } from '@store';
import { PropsWithChildren } from 'react';
import styles from './layout.module.scss';

/**
 * <Layout />
 */
const Layout = hoc.observer<PropsWithChildren, GlobalStore>(
  useStore,
  ({ children }) => <div className={styles.container}>{children}</div>,
);

export { Layout };
