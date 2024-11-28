import { Dayjs } from 'dayjs';
import { DateType } from '@api';
import { TranslationFunctionType } from '@locales';

/**
 * <ScheduleParams /> props
 */
type ScheduleParamsProps = {
  t: TranslationFunctionType;
  selectedDate: Dayjs;
  dateType: DateType;
  onDateTypeChange: (value: string) => void;
  onCalendarChange: (date: Dayjs) => void;
  onTodayClick: () => void;
};

export type { ScheduleParamsProps };
