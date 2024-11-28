import { hoc } from '@utils';
import { Appointment, ScheduleParams, Slots } from '../../moleculars';
import { useScheduleProps } from './schedule.props';
import styles from './schedule.module.scss';
import { Button } from 'antd';

/**
 * <Schedule />
 */
const Schedule = hoc.observer(
  useScheduleProps,
  ({
    t,
    schedules,
    headerText,
    dateType,
    selectedDate,
    onCalendarChange,
    onDateTypeChange,
    onAddAppointmentClick,
    onTodayClick
  }) => (
    <div className={styles.container}>
      <ScheduleParams
        t={t}
        dateType={dateType}
        selectedDate={selectedDate}
        onCalendarChange={onCalendarChange}
        onDateTypeChange={onDateTypeChange}
        onTodayClick={onTodayClick}
      />
      <div className={styles.appointments}>
        <div className={styles.appointments_header}>
          <p className={styles.appointments_header_title}>{headerText}</p>
          <Button
            type="primary"
            className={styles.appointments_header_button}
            onClick={onAddAppointmentClick}
          >
            {t('schedule.table.addAppointment')}
          </Button>
        </div>
        <div className={styles.appointments_content}>
          <Slots />
          <div
            className={styles.appointments_content_content}
            style={{ gridTemplateColumns: `repeat(7, 1fr)` }}
          >
            {[1, 2, 3, 4, 5, 6, 7].map(day => (
              <div className={styles.appointments_content_content_day}>
                <p className={styles.appointments_content_content_day_title}>
                  {day}
                </p>
                {schedules.map(schedule => (
                  <Appointment key={schedule.id} appointment={schedule} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
);

export { Schedule };
