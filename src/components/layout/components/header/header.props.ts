import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '@store';
import { links } from './header.constants';

/**
 * <Header /> props
 */
const useHeaderProps = () => {
  const navigate = useNavigate();

  const {
    profile: { user },
    auth: { logout }
  } = useStore();

  const _links = useMemo(
    () => links.filter(link => link.role === user.role),
    [user]
  );

  const profileText = useMemo(
    () =>
      Object.keys(user || {})
        ? `${user.firstname?.[0] || ''}${user.lastname?.[0] || ''}`
        : '',
    [user]
  );

  const onProfileClick = () => {
    navigate('/profile');
  };

  return {
    profileText,
    _links,
    logout,
    onProfileClick
  };
};

export { useHeaderProps };
