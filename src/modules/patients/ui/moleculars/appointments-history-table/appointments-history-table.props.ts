import { useEffect, useMemo } from 'react';
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
      clearSchedules,
      setInitialValues
    },
    patients: { currentPatientId, initialValues, findPatients }
  } = useStore();

  const pagination = usePagination();

  const currentPatientName = useMemo(
    () => `${initialValues?.firstname || ''} ${initialValues?.lastname || ''}`,
    [initialValues]
  );

  const onAddAppointmentClick = () => {
    setInitialValues({ patientId: currentPatientId });
    findPatients(t, initialValues.firstname);

    navigate('/schedule/create');
  };

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
    if (!currentPatientId) return;

    getSchedules({
      t,
      page: pagination.page,
      perPage: pagination.perPage,
      patient: currentPatientId,
      showLoader: false
    });
  }, [pagination.page, pagination.perPage, currentPatientId]);

  return {
    t,
    language,
    currentPatientName,
    loading,
    pagination,
    schedules,
    schedulesTotalAmount,
    onAppointmentClick,
    onAddAppointmentClick
  };
};

export { useAppointmentsHistoryTableProps };
