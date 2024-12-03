import { useMemo } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import cookie from 'react-cookies';
import { observer } from 'mobx-react-lite';
import { useStore } from '@store';
import { UserRole } from '@api';

/**
 * <RoleGuard />
 */
const RoleGuard = observer<{ roles: UserRole[] }>(({ roles }) => {
  const { profile } = useStore();

  const user = useMemo(
    () =>
      Object.keys(profile.user || {}).length
        ? profile.user
        : cookie.load('user'),
    [profile]
  );

  if (roles.includes(user?.role)) {
    return <Outlet />;
  }

  if (user.role === UserRole.ADMIN) {
    return <Navigate to="/users" />;
  }

  return <Navigate to="/schedule" />;
});

export { RoleGuard };
