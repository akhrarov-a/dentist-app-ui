import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocales } from '@locales';
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

  const { t } = useLocales();

  const _links = useMemo(
    () => links(t).filter(link => link.role === user.role),
    [t, user]
  );

  const profileText = useMemo(
    () =>
      !!Object.keys(user || {}).length
        ? `${user.firstname?.[0]?.toUpperCase() || ''}${user.lastname?.[0]?.toUpperCase() || ''}`
        : '',
    [user]
  );

  const onProfileClick = () => {
    navigate('/profile');
  };

  const onLogoClick = () => {
    navigate('/schedule');
  };

  return {
    t,
    profileText,
    _links,
    logout: () => logout(t),
    onProfileClick,
    onLogoClick
  };
};

export { useHeaderProps };
