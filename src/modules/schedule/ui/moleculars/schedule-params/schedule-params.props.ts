import { Dayjs } from 'dayjs';
import { DateType, ProfileContract } from '@api';
import { TranslationFunctionType } from '@locales';
import { useModal } from '@hooks';

/**
 * <ScheduleParams /> props
 */
type ScheduleParamsProps = {
  t: TranslationFunctionType;
  user: ProfileContract;
  selectedDate: Dayjs;
  dateType: DateType;
  filterModal: ReturnType<typeof useModal>;
  onDateTypeChange: (value: string) => void;
  onCalendarChange: (date: Dayjs) => void;
  onTodayClick: () => void;
};

export type { ScheduleParamsProps };
