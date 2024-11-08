import { useMemo } from 'react';
import { useStore } from '@store';
import { links } from './header.constants';

/**
 * <Header /> props
 */
const useHeaderProps = () => {
  const {
    auth: { logout }
  } = useStore();

  const _links = useMemo(() => {
    // TODO: check for user is admin
    // if (false) {
    //   return links;
    // }

    return links.filter(link => !link.isAdministrator);
  }, []);

  return {
    _links,
    logout
  };
};

export { useHeaderProps };
