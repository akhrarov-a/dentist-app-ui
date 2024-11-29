import { Navigate } from 'react-router-dom';
import { UserRole } from '@api';
import { hoc } from '@utils';
import { useStore } from '@store';

/**
 * <Redirect />
 */
const Redirect = hoc.observer(useStore, ({ profile: { user } }) => {
  if (user.role === UserRole.ADMIN) {
    return <Navigate to="/users" />;
  }

  return <Navigate to="/schedule" />;
});

export { Redirect };
