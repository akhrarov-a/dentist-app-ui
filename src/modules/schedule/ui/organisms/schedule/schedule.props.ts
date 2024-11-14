import { useStore } from '@store';
import { useEffect } from 'react';

/**
 * <Schedule /> props
 */
const useScheduleProps = () => {
  const {
    schedule: { schedules, clearSchedules }
  } = useStore();

  useEffect(
    () => () => {
      clearSchedules();
    },
    []
  );

  return {
    schedules
  };
};

export { useScheduleProps };
