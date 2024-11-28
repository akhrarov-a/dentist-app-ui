import { FC } from 'react';
import { Button, Calendar, Select } from 'antd';
import { DateType } from '@api';
import { ScheduleParamsProps } from './schedule-params.props.ts';
import styles from './schedule-params.module.scss';

/**
 * <ScheduleParams />
 */
const ScheduleParams: FC<ScheduleParamsProps> = ({
  t,
  selectedDate,
  dateType,
  onCalendarChange,
  onDateTypeChange,
  onTodayClick
}) => (
  <div id="schedule-params" className={styles.container}>
    <Button type="primary" className={styles.button} onClick={onTodayClick}>
      {t('schedule.table.today')}
    </Button>
    <Select
      className={styles.select}
      value={dateType}
      options={[
        {
          label: 'Day',
          value: DateType.DAY
        },
        {
          label: 'Week',
          value: DateType.WEEK
        }
      ]}
      onChange={onDateTypeChange}
    />
    <Calendar
      className={styles.calendar}
      value={selectedDate}
      onSelect={onCalendarChange}
      mode="month"
      fullscreen={false}
    />
  </div>
);

export { ScheduleParams };
