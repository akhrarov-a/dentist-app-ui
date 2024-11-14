import { useEffect, useMemo, useState } from 'react';
import { SelectInfo } from 'antd/es/calendar/generateCalendar';
import moment from 'moment';
import { useStore } from '@store';
import { months, weekdays } from './schedules-header.constants';

const format = 'YYYY-MM-DD';

/**
 * <SchedulesHeader /> props
 */
const useSchedulesHeaderProps = () => {
  const {
    schedule: { getSchedules }
  } = useStore();

  const [selectedDate, setSelectedDate] = useState(moment());
  const [showCalendar, setShowCalendar] = useState(false);

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

  const toggleShowCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const onCalendarChange = (date: any, selectInfo: SelectInfo) => {
    if (selectInfo.source !== 'date') return;

    toggleShowCalendar();
    setSelectedDate(moment(date.format(format)));
  };

  useEffect(() => {
    getSchedules(selectedDate.format(format));
  }, [selectedDate]);

  return {
    showCalendar,
    headerText,
    toggleShowCalendar,
    onPreviousDayClick,
    onNextDayClick,
    onCalendarChange
  };
};

export { useSchedulesHeaderProps };
