import { Navigate, Outlet } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useStore } from '@store';
import { UserRole } from '@api';

/**
 * <RoleGuard />
 */
const RoleGuard = observer<{ roles: UserRole[] }>(({ roles }) => {
  const {
    profile: { user }
  } = useStore();

  if (roles.includes(user?.role)) {
    return <Outlet />;
  }

  if (user.role === UserRole.ADMIN) {
    return <Navigate to="/users" />;
  }

  return <Navigate to="/schedule" />;
});

export { RoleGuard };
