import { useStore } from '@store';

/**
 * <Schedule /> props
 */
const useScheduleProps = () => {
  const {
    schedule: { schedules }
  } = useStore();

  return {
    schedules
  };
};

export { useScheduleProps };
