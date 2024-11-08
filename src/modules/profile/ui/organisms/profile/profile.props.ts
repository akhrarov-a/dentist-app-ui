import { useState } from 'react';

/**
 * <Profile /> props
 */
const useProfileProps = () => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  return {
    isEditing,
    toggleEditing
  };
};

export { useProfileProps };
