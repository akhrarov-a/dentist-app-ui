import { MouseEvent, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs, { Dayjs } from 'dayjs';
import { useLocales } from '@locales';
import { useStore } from '@store';
import { DateType } from '@api';
import { useModal } from '@hooks';
import { months, weekdays } from '@utils';
import { AppointmentDataClickAction } from '../../atoms';

const format = 'YYYY-MM-DD';

/**
 * <Schedule /> props
 */
const useScheduleProps = () => {
  const {
    schedule: {
      schedulesByDate,
      clearSchedules,
      getSchedules,
      cloneScheduleById,
      deleteSchedule
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
    const weekday = weekdays[selectedDate.day()];
    const month = months[selectedDate.month()];

    return `${weekday}, ${selectedDate.date()} ${month} ${selectedDate.year()}`;
  }, [selectedDate]);

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

    if (!dataClickAction || isAppointmentModalOrAction) return;

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
    modal,
    schedulesByDate,
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
