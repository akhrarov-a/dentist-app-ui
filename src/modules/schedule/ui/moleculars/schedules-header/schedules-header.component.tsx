import classNames from 'classnames';
import { Calendar } from 'antd';
import { hoc } from '@utils';
import { useSchedulesHeaderProps } from './schedules-header.props';
import styles from './schedules-header.module.scss';

/**
 * <SchedulesHeader />
 */
const SchedulesHeader = hoc.observer(
  useSchedulesHeaderProps,
  ({
    headerText,
    showCalendar,
    toggleShowCalendar,
    onPreviousDayClick,
    onNextDayClick,
    onCalendarChange
  }) => (
    <div className={styles.container}>
      <img
        className={classNames(styles.arrow, styles.arrow_right)}
        src="/img/arrow.svg"
        onClick={onPreviousDayClick}
      />
      <p className={styles.day} onClick={toggleShowCalendar}>
        {headerText}
      </p>
      <img
        className={styles.arrow}
        src="/img/arrow.svg"
        onClick={onNextDayClick}
      />

      {showCalendar && (
        <Calendar
          className={styles.calendar}
          fullscreen={false}
          onSelect={onCalendarChange}
        />
      )}
    </div>
  )
);

export { SchedulesHeader };
