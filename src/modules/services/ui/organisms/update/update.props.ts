import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useStore } from '@store';
import { ServiceForm } from '../../../services.types.ts';

/**
 * <UpdateService /> props
 */
const useUpdateServiceProps = () => {
  const params = useParams();
  const navigate = useNavigate();

  const {
    services: {
      currentServiceId,
      initialValues,
      getServiceById,
      updateService,
      deleteService
    }
  } = useStore();

  const [isEditing, setIsEditing] = useState(false);

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const onDelete = () => {
    deleteService(currentServiceId, navigate);
  };

  useEffect(() => {
    if (!params?.id) return;

    getServiceById(+params.id);
  }, [params]);

  return {
    isEditing,
    initialValues,
    onSubmit: (values: ServiceForm) => updateService(values, toggleEditing),
    onDelete,
    toggleEditing
  };
};

export { useUpdateServiceProps };
