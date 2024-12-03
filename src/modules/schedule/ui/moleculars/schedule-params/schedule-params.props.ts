import { Dayjs } from 'dayjs';
import { DateType, ProfileContract } from '@api';
import { TranslationFunctionType } from '@locales';

/**
 * <ScheduleParams /> props
 */
type ScheduleParamsProps = {
  t: TranslationFunctionType;
  user: ProfileContract;
  selectedDate: Dayjs;
  dateType: DateType;
  onDateTypeChange: (value: string) => void;
  onCalendarChange: (date: Dayjs) => void;
  onTodayClick: () => void;
};

export type { ScheduleParamsProps };
