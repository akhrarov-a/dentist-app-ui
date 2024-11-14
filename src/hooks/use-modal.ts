import { useState } from 'react';

const useModal = () => {
  const [isOpen, setOpen] = useState(false);

  const close = () => {
    setOpen(false);
  };

  const open = () => {
    setOpen(true);
  };

  const toggle = () => {
    setOpen(prev => !prev);
  };

  return {
    isOpen,
    close,
    open,
    toggle,
    set: setOpen
  };
};

export { useModal };
