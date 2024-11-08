import { useMemo } from 'react';
import { links } from './header.constants.ts';

/**
 * <Header /> props
 */
const useHeaderProps = () => {

  const _links = useMemo(() => {
    // TODO: check for user is admin
    // if (false) {
    //   return links;
    // }

    return links.filter(link => !link.isAdministrator);
  }, []);

  return {
    _links
  };
};

export { useHeaderProps };
