import { Button, Modal } from 'antd';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { DateType } from '@api';
import { getShortWeekday, hoc } from '@utils';
import { Appointment, ScheduleParams, Slots } from '../../moleculars';
import { useScheduleProps } from './schedule.props';
import styles from './schedule.module.scss';

/**
 * <Schedule />
 */
const Schedule = hoc.observer(
  useScheduleProps,
  ({
    t,
    modal,
    language,
    user,
    _slots,
    schedulesByDate,
    headerText,
    dateType,
    selectedDate,
    selectedAppointmentToDisplay,
    onCalendarChange,
    onDateTypeChange,
    onAddAppointmentClick,
    onDeleteAppointmentClick,
    onTodayClick,
    onClickAppointment,
    onDoubleClickAppointment
  }) => (
    <div className={styles.container}>
      <ScheduleParams
        t={t}
        user={user}
        dateType={dateType}
        selectedDate={selectedDate}
        onCalendarChange={onCalendarChange}
        onDateTypeChange={onDateTypeChange}
        onTodayClick={onTodayClick}
      />
      <div className={styles.appointments}>
        <Modal
          okText={t('form.actions.yes')}
          cancelText={t('form.actions.no')}
          visible={modal.isOpen}
          onOk={() => {
            onDeleteAppointmentClick();
            modal.close();
          }}
          onCancel={modal.close}
          centered
        >
          {t('form.areYouSureToDelete')}
        </Modal>

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
        <div
          className={styles.appointments_content}
          style={{ height: `${_slots.length * 50}px` }}
        >
          <Slots isWeek={dateType === DateType.WEEK} slots={_slots} />
          <div
            id="appointments-calendar"
            className={styles.appointments_content_content}
            style={{
              gridTemplateColumns: `repeat(${schedulesByDate.length}, 1fr)`
            }}
          >
            {schedulesByDate.map(schedules => {
              const date = dayjs(schedules.date);
              const weekday = getShortWeekday(date, language);

              const isWeekendOrHolidayForUser =
                user.weekends?.includes(date.day() === 0 ? 7 : date.day()) ||
                user.holidays?.includes(date.format('YYYY-MM-DD'));

              const hasShowInfoModal = schedules.appointments.some(
                schedule => schedule.id == selectedAppointmentToDisplay
              );

              return (
                <div
                  key={schedules.date}
                  id={schedules.date}
                  className={classNames(
                    styles.appointments_content_content_day,
                    {
                      [styles.appointments_content_content_day_weekend]:
                        isWeekendOrHolidayForUser
                    }
                  )}
                  onClick={onClickAppointment}
                  onDoubleClick={onDoubleClickAppointment}
                  style={{ zIndex: hasShowInfoModal ? '122' : '119' }}
                >
                  {dateType === DateType.WEEK && (
                    <p
                      className={classNames(
                        styles.appointments_content_content_day_title,
                        {
                          [styles.appointments_content_content_day_weekend_title]:
                            isWeekendOrHolidayForUser
                        }
                      )}
                    >
                      {weekday}
                      <br />
                      {date.format('D')}
                    </p>
                  )}
                  {schedules.appointments.map(schedule => (
                    <Appointment
                      key={schedule.id}
                      language={language}
                      showInfoModal={
                        schedule.id === selectedAppointmentToDisplay
                      }
                      dateType={dateType}
                      appointment={schedule}
                      slots={_slots}
                    />
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  )
);

export { Schedule };
