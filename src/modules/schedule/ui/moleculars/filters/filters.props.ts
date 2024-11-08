import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useStore } from '@store';
import { useLocales } from '@locales';

/**
 * <ScheduleTableFilters /> props
 */
const useScheduleTableFiltersProps = () => {
  const [search] = useSearchParams();
  const navigate = useNavigate();

  const { t } = useLocales();

  const {
    schedule: { getSchedules }
  } = useStore();

  const [selectedDate, setSelectedDate] = useState<MomentDateTimeString>();

  const onSelectedDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    navigate(`/schedules?date=${value}`);
  };

  useEffect(() => {
    const date = search.get('date');

    if (!date) return;

    setSelectedDate(date);
    getSchedules(selectedDate);
  }, [search]);

  return {
    t,
    selectedDate,
    onSelectedDateChange
  };
};

export { useScheduleTableFiltersProps };
