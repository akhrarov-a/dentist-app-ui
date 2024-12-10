import { FC } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import classNames from 'classnames';
import { Button, Calendar, Select } from 'antd';
import { DateType } from '@api';
import { ScheduleParamsProps } from './schedule-params.props';
import styles from './schedule-params.module.scss';

/**
 * <ScheduleParams />
 */
const ScheduleParams: FC<ScheduleParamsProps> = ({
  t,
  user,
  selectedDate,
  dateType,
  filterModal,
  onCalendarChange,
  onDateTypeChange,
  onTodayClick
}) => {
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

    const startOfPeriod = dayjs(selectedDate.format('YYYY-MM-DD'))
      .set('date', selectedDate.date() + diffToMonday)
      .set('hour', 0)
      .set('minute', 0)
      .set('second', 0)
      .set('millisecond', 0);

    const endOfPeriod = dayjs(startOfPeriod)
      .set('date', startOfPeriod.date() + 6)
      .set('hour', 23)
      .set('minute', 59)
      .set('second', 59)
      .set('millisecond', 999);

    if (
      value.month() === startOfPeriod.month() &&
      startOfPeriod.date() <= value.date() &&
      value.date() <= endOfPeriod.date()
    ) {
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
      <div className={styles.close} onClick={filterModal.close}>
        <img src="/img/close.svg" alt="Close" />
      </div>
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
        {filterModal.isOpen && (
          <div
            className={classNames(
              'animate__animated animate__fadeInUp animate__faster',
              styles.mob_content
            )}
          >
            {filters}
          </div>
        )}
      </div>
    </div>
  );
};

export { ScheduleParams };
