import { useEffect } from 'react';

/**
 * Hook that alerts clicks outside of the passed ref
 */
const useClickOutside = (ref: any, handleClickOutside: () => void) => {
  useEffect(() => {
    /**
     * Handle passed click outside
     */
    const handleClick = (event: any) => {
      if (!(ref.current && !ref.current.contains(event.target))) return;

      handleClickOutside();
    };

    // Bind the event listener
    document.addEventListener('mousedown', handleClick);

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClick);
    };
  });
};

export { useClickOutside };
