import { useState } from 'react';
import { useStore } from '@store';

/**
 * <Profile /> props
 */
const useProfileProps = () => {
  const { profile: store } = useStore();

  const [isEditing, setIsEditing] = useState(false);

  return {
    isEditing
  };
};

export { useProfileProps };
