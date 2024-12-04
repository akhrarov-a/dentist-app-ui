import { MouseEvent, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs, { Dayjs } from 'dayjs';
import { useLocales } from '@locales';
import { useStore } from '@store';
import { DateType } from '@api';
import { useModal } from '@hooks';
import { getMonth, getWeekday } from '@utils';
import { AppointmentDataClickAction } from '../../atoms';
import { slots } from './schedule.constants';

const format = 'YYYY-MM-DD';

/**
 * <Schedule /> props
 */
const useScheduleProps = () => {
  const {
    language,
    profile: { user },
    schedule: {
      schedulesByDate,
      clearSchedules,
      getSchedules,
      cloneScheduleById,
      deleteSchedule,
      setInitialValues
    }
  } = useStore();

  const navigate = useNavigate();

  const { t } = useLocales();
  const modal = useModal();

  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [dateType, setDateType] = useState(DateType.WEEK);
  const [selectedAppointmentToDisplay, setSelectedAppointmentToDisplay] =
    useState(null);

  const headerText = useMemo(() => {
    const weekday = getWeekday(selectedDate, language);
    const month = getMonth(selectedDate, language);

    return `${weekday}, ${selectedDate.date()} ${month} ${selectedDate.year()}`;
  }, [selectedDate, language]);

  const _slots = useMemo(() => {
    const _slots = slots;

    const splitUserWorkingHours = user.workingHours?.split('-');
    const start = splitUserWorkingHours?.[0]?.trim();
    const end = splitUserWorkingHours?.[1]?.trim();

    if (start) {
      const startIndex = slots.indexOf(start);

      _slots.splice(0, startIndex);
    }

    if (end) {
      const endIndex = slots.indexOf(end);

      _slots.splice(endIndex + 1);
    }

    return _slots;
  }, [user, slots]);

  const onAddAppointmentClick = () => {
    navigate('/schedule/create');
  };

  const onDeleteAppointmentClick = async () => {
    await deleteSchedule(t, selectedAppointmentToDisplay, navigate);

    getSchedules({ t, date: selectedDate.format(format), type: dateType });
  };

  const onTodayClick = () => {
    setSelectedDate(dayjs());
    setSelectedAppointmentToDisplay(null);
  };

  const onDateTypeChange = (value: string) => {
    setDateType(value as DateType);
    setSelectedAppointmentToDisplay(null);
  };

  const onCalendarChange = (date: Dayjs) => {
    if (dateType === DateType.DAY) {
      if (selectedDate.isSame(date, 'date')) return;

      setSelectedDate(date);
      setSelectedAppointmentToDisplay(null);

      return;
    }

    if (selectedDate.isSame(date, 'weeks')) return;

    setSelectedDate(date);
    setSelectedAppointmentToDisplay(null);
  };

  const onClickAppointment = async (event: MouseEvent) => {
    // @ts-ignore
    const dataClickAction = event?.target?.getAttribute('data-click-action');
    const isAppointmentModal =
      dataClickAction === AppointmentDataClickAction.MODAL;

    if (isAppointmentModal) return;

    switch (dataClickAction) {
      case AppointmentDataClickAction.EDIT: {
        navigate(`/schedule/${selectedAppointmentToDisplay}`);

        break;
      }
      case AppointmentDataClickAction.DELETE: {
        modal.open();

        break;
      }
      case AppointmentDataClickAction.CLONE: {
        await cloneScheduleById(t, selectedAppointmentToDisplay);

        onAddAppointmentClick();

        break;
      }
      case AppointmentDataClickAction.CLOSE: {
        setSelectedAppointmentToDisplay(null);

        break;
      }
      default: {
        if (dataClickAction) {
          setSelectedAppointmentToDisplay(+dataClickAction);
        } else if (selectedAppointmentToDisplay) {
          setSelectedAppointmentToDisplay(null);
        }
      }
    }
  };

  const onDoubleClickAppointment = (event: MouseEvent) => {
    // @ts-ignore
    const dataClickAction = event?.target?.getAttribute('data-click-action');
    const isAppointmentModalOrAction = [
      AppointmentDataClickAction.MODAL,
      AppointmentDataClickAction.EDIT,
      AppointmentDataClickAction.DELETE,
      AppointmentDataClickAction.CLONE,
      AppointmentDataClickAction.CLOSE
    ].includes(dataClickAction);

    const date = (event.target as any).id;
    const appointmentsCalendar = document.getElementById(
      'appointments-calendar'
    );

    const indexOfBlock = Math.floor(
      (event.clientY - appointmentsCalendar.getBoundingClientRect().top - 50) /
        50
    );

    if (date && !isNaN(indexOfBlock) && indexOfBlock !== -1) {
      const splitUserWorkingHours = user.workingHours?.split('-');
      const start = splitUserWorkingHours?.[0]?.trim();

      setInitialValues({
        date: dayjs(date, 'YYYY-MM-DD'),
        startTime: dayjs(start, 'HH:mm').add(indexOfBlock, 'hours'),
        endTime: dayjs(start, 'HH:mm').add(indexOfBlock + 1, 'hours')
      });

      onAddAppointmentClick();

      return;
    }

    if (!!dataClickAction && !isAppointmentModalOrAction) {
      navigate(`/schedule/${dataClickAction}`);

      return;
    }
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
    modal,
    language,
    user,
    schedulesByDate,
    _slots,
    headerText,
    selectedDate,
    dateType,
    selectedAppointmentToDisplay,
    onCalendarChange,
    onDateTypeChange,
    onAddAppointmentClick,
    onDeleteAppointmentClick,
    onTodayClick,
    onClickAppointment,
    onDoubleClickAppointment
  };
};

export { useScheduleProps };
