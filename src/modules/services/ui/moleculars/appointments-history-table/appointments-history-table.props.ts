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
      schedulesForService,
      schedulesForServiceTotalAmount,
      getScheduleForService
    },
    services: { currentServiceId, initialValues }
  } = useStore();

  const pagination = usePagination();

  useEffect(() => {
    if (!currentServiceId) return;

    getScheduleForService({
      page: pagination.page,
      perPage: pagination.perPage,
      service: currentServiceId
    });
  }, [pagination.page, pagination.perPage, currentServiceId]);

  return {
    t,
    name: initialValues.name,
    loading: loading.schedulesForService,
    pagination,
    schedulesForService,
    schedulesForServiceTotalAmount
  };
};

export { useAppointmentsHistoryTableProps };
