import { useEffect } from 'react';

/**
 * Hook that alerts clicks outside of the passed ref
 */
const useClickOutside = (
  ref: any,
  handleClickOutside: (event: any) => void
) => {
  useEffect(() => {
    const handleClick = (event: any) => {
      if (!(ref.current && !ref.current.contains(event.target))) return;

      handleClickOutside(event);
    };

    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  });
};

export { useClickOutside };
