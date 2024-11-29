import { Button, Modal } from 'antd';
import dayjs from 'dayjs';
import { DateType } from '@api';
import { hoc, weekdays } from '@utils';
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
        <div className={styles.appointments_content}>
          <Slots isWeek={dateType === DateType.WEEK} />
          <div
            className={styles.appointments_content_content}
            style={{
              gridTemplateColumns: `repeat(${schedulesByDate.length}, 1fr)`
            }}
          >
            {schedulesByDate.map(schedules => {
              const date = dayjs(schedules.date);
              const weekday = weekdays[date.day()];

              const hasShowInfoModal = schedules.appointments.some(
                schedule => schedule.id == selectedAppointmentToDisplay
              );

              return (
                <div
                  key={schedules.date}
                  id={schedules.date}
                  className={styles.appointments_content_content_day}
                  onClick={onClickAppointment}
                  onDoubleClick={onDoubleClickAppointment}
                  style={{ zIndex: hasShowInfoModal ? '122' : '119' }}
                >
                  {dateType === DateType.WEEK && (
                    <p
                      className={styles.appointments_content_content_day_title}
                    >
                      {weekday}
                      <br />
                      {date.format('D')}
                    </p>
                  )}
                  {schedules.appointments.map(schedule => (
                    <Appointment
                      key={schedule.id}
                      showInfoModal={
                        schedule.id === selectedAppointmentToDisplay
                      }
                      dateType={dateType}
                      appointment={schedule}
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
