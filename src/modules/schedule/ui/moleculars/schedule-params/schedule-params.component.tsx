import { FC } from 'react';
import { Dayjs } from 'dayjs';
import classNames from 'classnames';
import { Button, Calendar, Select } from 'antd';
import { useModal } from '@hooks';
import { DateType } from '@api';
import { ScheduleParamsProps } from './schedule-params.props.ts';
import styles from './schedule-params.module.scss';

/**
 * <ScheduleParams />
 */
const ScheduleParams: FC<ScheduleParamsProps> = ({
  t,
  user,
  selectedDate,
  dateType,
  onCalendarChange,
  onDateTypeChange,
  onTodayClick
}) => {
  const modal = useModal();

  const fullCellRender = (value: Dayjs) => {
    const isHoliday = user.holidays?.some(holiday =>
      value.isSame(holiday, 'date')
    );
    const isWeekend = user.weekends?.includes(
      value.day() === 0 ? 7 : value.day()
    );

    if (dateType === DateType.DAY) {
      const isActive = selectedDate.isSame(value, 'date');

      return (
        <div
          className={classNames(styles.calendar_day, {
            [styles.calendar_day_active]: isActive,
            [styles.calendar_day_holiday]: isHoliday || isWeekend
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
            styles.calendar_day_active,
            {
              [styles.calendar_day_holiday]: isHoliday || isWeekend
            }
          )}
        >
          {value.date()}
        </div>
      );
    }

    return (
      <div
        className={classNames(styles.calendar_day, {
          [styles.calendar_day_holiday]: isHoliday || isWeekend
        })}
      >
        {value.date()}
      </div>
    );
  };

  const filters = (
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

  return (
    <div style={{ position: 'relative' }}>
      <div className={styles.desktop}>{filters}</div>
      <div className={styles.mob}>
        {modal.isOpen && <div className={styles.mob_content}>{filters}</div>}
      </div>
    </div>
  );
};

export { ScheduleParams };
