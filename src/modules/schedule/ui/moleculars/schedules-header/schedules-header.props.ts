import { useEffect, useMemo, useState } from 'react';
import moment from 'moment';
import { useStore } from '@store';
import { months, weekdays } from './schedules-header.constants';

/**
 * <SchedulesHeader /> props
 */
const useSchedulesHeaderProps = () => {
  const {
    schedule: { getSchedules }
  } = useStore();

  const [selectedDate, setSelectedDate] = useState(moment());

  const headerText = useMemo(() => {
    const weekday = weekdays[selectedDate.weekday()];
    const month = months[selectedDate.month()];

    return `${weekday} ${selectedDate.date()} ${month} ${selectedDate.year()}`;
  }, [selectedDate]);

  const onPreviousDayClick = () => {
    setSelectedDate(selectedDate.clone().subtract(1, 'day'));
  };

  const onNextDayClick = () => {
    setSelectedDate(selectedDate.clone().add(1, 'day'));
  };

  useEffect(() => {
    getSchedules(selectedDate.format('YYYY-MM-DD'));
  }, [selectedDate]);

  return {
    headerText,
    onPreviousDayClick,
    onNextDayClick
  };
};

export { useSchedulesHeaderProps };
