import { useStore } from '@store';
import { useLocales } from '@locales';

/**
 * <Schedule /> props
 */
const useScheduleProps = () => {
  const {
    schedule: { schedules }
  } = useStore();

  const { t } = useLocales();

  return {
    t,
    schedules
  };
};

export { useScheduleProps };
