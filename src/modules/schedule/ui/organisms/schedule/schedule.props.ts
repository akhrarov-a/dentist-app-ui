import { MouseEvent, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { useLocales } from '@locales';
import { useStore } from '@store';
import { DateType } from '@api';
import { months, weekdays } from '@utils';

const format = 'YYYY-MM-DD';

/**
 * <Schedule /> props
 */
const useScheduleProps = () => {
  const {
    schedule: { schedulesByDate, clearSchedules, getSchedules }
  } = useStore();

  const navigate = useNavigate();

  const { t } = useLocales();

  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [dateType, setDateType] = useState(DateType.WEEK);
  const [selectedAppointmentToDisplay, setSelectedAppointmentToDisplay] =
    useState(null);

  const headerText = useMemo(() => {
    const weekday = weekdays[selectedDate.day()];
    const month = months[selectedDate.month()];

    return `${weekday}, ${selectedDate.date()} ${month} ${selectedDate.year()}`;
  }, [selectedDate]);

  const onAddAppointmentClick = () => {
    navigate('/schedule/create');
  };

  const onTodayClick = () => {
    setSelectedDate(dayjs());
  };

  const onDateTypeChange = (value: string) => {
    setDateType(value as DateType);
  };

  const onClickAppointment = (event: MouseEvent) => {
    // @ts-ignore
    const dataClickAction = event?.target?.getAttribute('data-click-action');
    const isAppointmentModal = dataClickAction === 'appointment-modal';

    if (isAppointmentModal) return;

    if (dataClickAction) {
      setSelectedAppointmentToDisplay(dataClickAction);
    } else if (selectedAppointmentToDisplay) {
      setSelectedAppointmentToDisplay(null);
    }
  };

  const onDoubleClickAppointment = (event: MouseEvent) => {
    // @ts-ignore
    const dataClickAction = event?.target?.getAttribute('data-click-action');
    const isAppointmentModal = dataClickAction === 'appointment-modal';

    if (!dataClickAction || isAppointmentModal) return;

    navigate(`/schedule/${dataClickAction}`);
  };

  useEffect(
    () => () => {
      clearSchedules();
    },
    []
  );

  useEffect(() => {
    getSchedules({ t, date: selectedDate.format(format), type: dateType });
  }, [selectedDate, dateType]);

  return {
    t,
    schedulesByDate,
    headerText,
    selectedDate,
    dateType,
    selectedAppointmentToDisplay,
    onCalendarChange: setSelectedDate,
    onDateTypeChange,
    onAddAppointmentClick,
    onTodayClick,
    onClickAppointment,
    onDoubleClickAppointment
  };
};

export { useScheduleProps };
