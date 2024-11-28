import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SelectInfo } from 'antd/es/calendar/generateCalendar';
import moment from 'moment';
import { Dayjs } from 'dayjs';
import { useStore } from '@store';
import { useClickOutside } from '@hooks';
import { useLocales } from '@locales';
import { months, weekdays } from './schedules-header.constants';

const format = 'YYYY-MM-DD';

/**
 * <SchedulesHeader /> props
 */
const useSchedulesHeaderProps = () => {
  const divRef = useRef(null);
  const navigate = useNavigate();

  const { t } = useLocales();

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

  const onAddAppointmentClick = () => {
    navigate('/schedule/create');
  };

  const onPreviousDayClick = () => {
    setSelectedDate(selectedDate.clone().subtract(1, 'day'));
  };

  const onNextDayClick = () => {
    setSelectedDate(selectedDate.clone().add(1, 'day'));
  };

  const toggleShowCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const onCalendarChange = (date: Dayjs, selectInfo: SelectInfo) => {
    if (selectInfo.source !== 'date') return;

    toggleShowCalendar();
    setSelectedDate(moment(date.format(format)));
  };

  useEffect(() => {
    getSchedules({ t, date: selectedDate.format(format) });
  }, [selectedDate]);

  useClickOutside(divRef, event => {
    if (showCalendar && !event?.target?.className?.includes('calendar'))
      setShowCalendar(false);
  });

  return {
    t,
    divRef,
    showCalendar,
    headerText,
    onAddAppointmentClick,
    toggleShowCalendar,
    onPreviousDayClick,
    onNextDayClick,
    onCalendarChange
  };
};

export { useSchedulesHeaderProps };
