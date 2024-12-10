import { MouseEvent, useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
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
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedDate = searchParams.get('date');
  const dateType = searchParams.get('type') as DateType;
  const selectedAppointmentToDisplay = +(searchParams.get('selected') || '0');

  const { t } = useLocales();
  const modal = useModal();
  const filterModal = useModal();

  const headerText = useMemo(() => {
    const _selectedDate = selectedDate ? dayjs(selectedDate, format) : dayjs();
    const weekday = getWeekday(_selectedDate, language);
    const month = getMonth(_selectedDate, language);

    return `${weekday}, ${_selectedDate.date()} ${month} ${_selectedDate.year()}`;
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

      if (endIndex !== -1) {
        _slots.splice(endIndex);
      }
    }

    return _slots;
  }, [user, slots]);

  const clearSelectedAppointmentAndReturn = () => {
    const currentParams = Object.fromEntries(searchParams.entries());

    if (currentParams.selected) {
      delete currentParams.selected;
    }

    return currentParams;
  };

  const onAddAppointmentClick = () => {
    navigate('/schedule/create');
  };

  const onDeleteAppointmentClick = async () => {
    await deleteSchedule(t, selectedAppointmentToDisplay, navigate);

    getSchedules({
      t,
      date: selectedDate,
      type: dateType
    });
  };

  const onTodayClick = () => {
    const currentParams = clearSelectedAppointmentAndReturn();

    setSearchParams({ ...currentParams, date: dayjs().format(format) });
  };

  const onDateTypeChange = (value: string) => {
    const currentParams = clearSelectedAppointmentAndReturn();

    setSearchParams({ ...currentParams, type: value });
  };

  const onCalendarChange = (date: Dayjs) => {
    const _selectedDate = dayjs(selectedDate, format);

    if (dateType === DateType.DAY) {
      if (_selectedDate.isSame(date, 'date')) return;

      const currentParams = clearSelectedAppointmentAndReturn();

      setSearchParams({ ...currentParams, date: date.format(format) });

      return;
    }

    if (_selectedDate.isSame(date, 'weeks')) return;

    const currentParams = clearSelectedAppointmentAndReturn();

    setSearchParams({ ...currentParams, date: date.format(format) });
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
        await cloneScheduleById(t, +selectedAppointmentToDisplay);

        onAddAppointmentClick();

        break;
      }
      case AppointmentDataClickAction.CLOSE: {
        const currentParams = clearSelectedAppointmentAndReturn();

        setSearchParams(currentParams);

        break;
      }
      default: {
        if (dataClickAction) {
          const currentParams = Object.fromEntries(searchParams.entries());

          setSearchParams({ ...currentParams, selected: dataClickAction });
        } else if (selectedAppointmentToDisplay) {
          const currentParams = clearSelectedAppointmentAndReturn();

          setSearchParams(currentParams);
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
    if (!selectedDate) {
      const currentParams = clearSelectedAppointmentAndReturn();

      setSearchParams({ ...currentParams, date: dayjs().format(format) });

      return;
    }

    if (!dateType) {
      const currentParams = clearSelectedAppointmentAndReturn();

      setSearchParams({ ...currentParams, type: DateType.WEEK });

      return;
    }

    getSchedules({ t, date: selectedDate, type: dateType });
  }, [selectedDate, dateType]);

  return {
    t,
    modal,
    filterModal,
    language,
    user,
    schedulesByDate,
    _slots,
    headerText,
    selectedDate: dayjs(selectedDate, format),
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
