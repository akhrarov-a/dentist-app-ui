import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useStore } from '@store';
import { useLocales } from '@locales';
import { ServiceForm } from '../../../services.types.ts';

/**
 * <UpdateService /> props
 */
const useUpdateServiceProps = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { t } = useLocales();

  const {
    services: {
      currentServiceId,
      initialValues,
      getServiceById,
      updateService,
      deleteService,
      clearInitialValues
    }
  } = useStore();

  const [isEditing, setIsEditing] = useState(false);

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const onDelete = () => {
    deleteService(t, currentServiceId, navigate);
  };

  useEffect(
    () => () => {
      clearInitialValues();
    },
    []
  );

  useEffect(() => {
    if (!params?.id) return;

    getServiceById(t, +params.id);
  }, [params]);

  return {
    isEditing,
    initialValues,
    onSubmit: (values: ServiceForm) => updateService(t, values, toggleEditing),
    onDelete,
    toggleEditing
  };
};

export { useUpdateServiceProps };
