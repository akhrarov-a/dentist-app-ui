import { useEffect, useMemo } from 'react';
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
    patients: { currentPatientId, initialValues }
  } = useStore();

  const pagination = usePagination();

  const currentPatientName = useMemo(
    () => `${initialValues?.firstname || ''} ${initialValues?.lastname || ''}`,
    [initialValues]
  );

  useEffect(
    () => () => {
      clearSchedules();
    },
    []
  );

  useEffect(() => {
    if (!currentPatientId) return;

    getSchedules({
      t,
      page: pagination.page,
      perPage: pagination.perPage,
      patient: currentPatientId
    });
  }, [pagination.page, pagination.perPage, currentPatientId]);

  return {
    t,
    currentPatientName,
    loading,
    pagination,
    schedules,
    schedulesTotalAmount
  };
};

export { useAppointmentsHistoryTableProps };
