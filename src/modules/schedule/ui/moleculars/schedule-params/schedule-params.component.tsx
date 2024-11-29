import { FC } from 'react';
import { Dayjs } from 'dayjs';
import classNames from 'classnames';
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
}) => {
  const fullCellRender = (value: Dayjs) => {
    if (dateType === DateType.DAY) {
      const isActive = selectedDate.isSame(value, 'date');

      return (
        <div
          className={classNames(styles.calendar_day, {
            [styles.calendar_day_active]: isActive
          })}
        >
          {value.date()}
        </div>
      );
    }

    const dayOfWeek = selectedDate.day();
    const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

    const startOfPeriod = new Date(selectedDate.format('YYYY-MM-DD'));
    startOfPeriod.setDate(selectedDate.date() + diffToMonday);
    startOfPeriod.setHours(0, 0, 0, 0);

    const endOfPeriod = new Date(startOfPeriod);
    endOfPeriod.setDate(startOfPeriod.getDate() + 6);
    endOfPeriod.setHours(23, 59, 59, 999);

    if (value.isAfter(startOfPeriod) && value.isBefore(endOfPeriod)) {
      return (
        <div
          key={value.date()}
          className={classNames(
            styles.calendar_day,
            styles.calendar_day_active
          )}
        >
          {value.date()}
        </div>
      );
    }

    return <div className={styles.calendar_day}>{value.date()}</div>;
  };

  return (
    <div id="schedule-params" className={styles.container}>
      <Button type="primary" className={styles.button} onClick={onTodayClick}>
        {t('schedule.table.today')}
      </Button>
      <Select
        className={styles.select}
        value={dateType}
        options={[
          {
            label: t('schedule.table.day'),
            value: DateType.DAY
          },
          {
            label: t('schedule.table.week'),
            value: DateType.WEEK
          }
        ]}
        onChange={onDateTypeChange}
      />
      <Calendar
        className={styles.calendar}
        value={selectedDate}
        fullCellRender={fullCellRender}
        onSelect={onCalendarChange}
        mode="month"
        fullscreen={false}
      />
    </div>
  );
};

export { ScheduleParams };
