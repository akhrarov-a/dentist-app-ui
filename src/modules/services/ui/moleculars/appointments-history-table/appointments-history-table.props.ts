import { useEffect } from 'react';
import { usePagination } from '@hooks';
import { useLocales } from '@locales';
import { useStore } from '@store';

/**
 * <AppointmentsHistoryTable /> props
 */
const useAppointmentsHistoryTableProps = () => {
  const { t } = useLocales();

  const {
    schedule: {
      loading,
      schedules,
      schedulesTotalAmount,
      getSchedules,
      clearSchedules
    },
    services: { currentServiceId, initialValues }
  } = useStore();

  const pagination = usePagination();

  useEffect(
    () => () => {
      clearSchedules();
    },
    []
  );

  useEffect(() => {
    if (!currentServiceId) return;

    getSchedules({
      t,
      page: pagination.page,
      perPage: pagination.perPage,
      service: currentServiceId,
      showLoader: false
    });
  }, [pagination.page, pagination.perPage, currentServiceId]);

  return {
    t,
    currentServiceId,
    name: initialValues.name,
    loading,
    pagination,
    schedules,
    schedulesTotalAmount
  };
};

export { useAppointmentsHistoryTableProps };
