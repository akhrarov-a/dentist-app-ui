import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useStore } from '@store';
import { useLocales } from '@locales';
import { UserForm } from '../../../users.types';

/**
 * <UpdateUser /> props
 */
const useUpdateUserProps = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { t } = useLocales();

  const {
    users: {
      currentUserId,
      initialValues,
      isFetchedUser,
      getUserById,
      updateUser,
      deleteUser,
      clearInitialValues
    }
  } = useStore();

  const [isEditing, setIsEditing] = useState(false);

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const onDelete = () => {
    deleteUser(t, currentUserId, navigate);
  };

  useEffect(
    () => () => {
      clearInitialValues();
    },
    []
  );

  useEffect(() => {
    if (!params?.id) return;

    getUserById(t, +params.id);
  }, [params]);

  return {
    isEditing,
    initialValues,
    isFetchedUser,
    onSubmit: (values: UserForm) => updateUser(t, values, toggleEditing),
    onDelete,
    toggleEditing
  };
};

export { useUpdateUserProps };
