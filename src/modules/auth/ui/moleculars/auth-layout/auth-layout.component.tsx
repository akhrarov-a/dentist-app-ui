import { FC, PropsWithChildren } from 'react';
import styles from './auth-layout.module.scss';

/**
 * <AuthLayout />
 */
const AuthLayout: FC<PropsWithChildren> = ({ children }) => (
  <div className={styles.container}>
    <div className={styles.content}>{children}</div>
  </div>
);

export { AuthLayout };
