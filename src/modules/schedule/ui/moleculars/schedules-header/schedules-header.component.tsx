import classNames from 'classnames';
import { Button, Calendar } from 'antd';
import { hoc } from '@utils';
import { useSchedulesHeaderProps } from './schedules-header.props';
import styles from './schedules-header.module.scss';

/**
 * <SchedulesHeader />
 */
const SchedulesHeader = hoc.observer(
  useSchedulesHeaderProps,
  ({
    t,
    divRef,
    headerText,
    showCalendar,
    onAddAppointmentClick,
    toggleShowCalendar,
    onPreviousDayClick,
    onNextDayClick,
    onCalendarChange
  }) => (
    <div className={styles.container}>
      <div className={styles.content}>
        <img
          className={classNames(styles.arrow, styles.arrow_right)}
          src="/img/arrow.svg"
          onClick={onPreviousDayClick}
        />
        <p ref={divRef} className={styles.day} onClick={toggleShowCalendar}>
          {headerText}
        </p>
        <img
          className={styles.arrow}
          src="/img/arrow.svg"
          onClick={onNextDayClick}
        />
      </div>

      <Button type="primary" onClick={onAddAppointmentClick}>
        {t('schedule.table.addAppointment')}
      </Button>

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
