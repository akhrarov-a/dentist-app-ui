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
      schedulesForPatient,
      schedulesForPatientTotalAmount,
      getScheduleForPatient,
      clearSchedulesForPatient
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
      clearSchedulesForPatient();
    },
    []
  );

  useEffect(() => {
    if (!currentPatientId) return;

    getScheduleForPatient({
      page: pagination.page,
      perPage: pagination.perPage,
      patient: currentPatientId
    });
  }, [pagination.page, pagination.perPage, currentPatientId]);

  return {
    t,
    currentPatientName,
    loading: loading.schedulesForPatient,
    pagination,
    schedulesForPatient,
    schedulesForPatientTotalAmount
  };
};

export { useAppointmentsHistoryTableProps };
