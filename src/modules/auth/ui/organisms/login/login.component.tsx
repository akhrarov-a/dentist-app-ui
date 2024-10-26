import React from 'react';
import { hoc } from '@utils';
import { AuthLayout } from '../../moleculars';
import { useLoginProps } from './login.props.ts';
import styles from './login.module.scss';

/**
 * <Login />
 */
const Login = hoc.observer(useLoginProps, () => (
  <AuthLayout>
    <div className={styles.container}>Login page</div>
  </AuthLayout>
));

export { Login };
