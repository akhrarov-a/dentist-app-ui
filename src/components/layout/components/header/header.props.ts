import { useMemo } from 'react';
import { useStore } from '@store';
import { links } from './header.constants';

/**
 * <Header /> props
 */
const useHeaderProps = () => {
  const {
    auth: { logout },
    profile: { user }
  } = useStore();

  const _links = useMemo(
    () => links.filter(link => link.role === user.role),
    [user]
  );

  return {
    _links,
    logout
  };
};

export { useHeaderProps };
