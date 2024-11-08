import { hoc } from '@utils';
import { AuthLayout } from '../../moleculars';
import { useResetPasswordProps } from './reset-password.props';
import styles from './reset-password.module.scss';

/**
 * <ResetPassword />
 */
const ResetPassword = hoc.observer(useResetPasswordProps, () => (
  <AuthLayout>
    <div className={styles.container}>Reset password page</div>
  </AuthLayout>
));

export { ResetPassword };
