import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePagination } from '@hooks';
import { useLocales } from '@locales';
import { useStore } from '@store';
import { ScheduleContract } from '@api';

/**
 * <AppointmentsHistoryTable /> props
 */
const useAppointmentsHistoryTableProps = () => {
  const { t } = useLocales();
  const navigate = useNavigate();

  const {
    language,
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

  const onAppointmentClick = (schedule: ScheduleContract) => {
    navigate(`/schedule/${schedule.id}`);
  };

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
    language,
    name: initialValues.name,
    loading,
    pagination,
    schedules,
    schedulesTotalAmount,
    onAppointmentClick
  };
};

export { useAppointmentsHistoryTableProps };
