import { useEffect, useMemo, useState } from 'react';
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
    schedule: { schedules, clearSchedules, getSchedules }
  } = useStore();

  const navigate = useNavigate();

  const { t } = useLocales();

  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [dateType, setDateType] = useState(DateType.DAY);

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

  useEffect(
    () => () => {
      clearSchedules();
    },
    []
  );

  useEffect(() => {
    getSchedules({ t, date: selectedDate.format(format) });
  }, [selectedDate]);

  return {
    t,
    schedules,
    headerText,
    selectedDate,
    dateType,
    onCalendarChange: setSelectedDate,
    onDateTypeChange,
    onAddAppointmentClick,
    onTodayClick
  };
};

export { useScheduleProps };
