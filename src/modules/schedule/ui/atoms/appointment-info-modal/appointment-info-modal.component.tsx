import { useMemo } from 'react';
import dayjs from 'dayjs';
import classNames from 'classnames';
import { DateType, ScheduleContract } from '@api';
import { getMonth, getWeekday } from '@utils';
import styles from './appointment-info-modal.module.scss';

enum AppointmentDataClickAction {
  EDIT = 'appointment-edit',
  DELETE = 'appointment-delete',
  CLONE = 'appointment-clone',
  CLOSE = 'appointment-close',
  MODAL = 'appointment-modal'
}

/**
 * <AppointmentInfoModal />
 */
const AppointmentInfoModal = ({
  language,
  dateType,
  appointment
}: {
  language: string;
  dateType: DateType;
  appointment: ScheduleContract;
}) => {
  const appointmentDate = useMemo(() => {
    const selectedDate = dayjs(appointment.startTime);
    const weekday = getWeekday(selectedDate, language);
    const month = getMonth(selectedDate, language);

    return `${weekday}, ${selectedDate.date()} ${month} ${selectedDate.year()}`;
  }, [appointment, language]);

  const style = useMemo(() => {
    if (dateType === DateType.DAY) {
      return { left: '52%' };
    }

    const weekday = dayjs(appointment.startTime).day();

    if (weekday === 0 || weekday > 3) {
      return { right: '102%' };
    }

    return { left: '102%' };
  }, [appointment]);

  return (
    <div
      className={classNames(
        'animate__animated animate__fadeInRight animate__fast',
        styles.container
      )}
      data-click-action={AppointmentDataClickAction.MODAL}
      style={{ ...style }}
    >
      <div
        className={styles.content}
        data-click-action={AppointmentDataClickAction.MODAL}
      >
        <div
          className={styles.content_header}
          data-click-action={AppointmentDataClickAction.MODAL}
        >
          <img
            src="/img/edit.svg"
            alt="Edit"
            data-click-action={AppointmentDataClickAction.EDIT}
          />
          <img
            src="/img/delete.svg"
            alt="Delete"
            data-click-action={AppointmentDataClickAction.DELETE}
          />
          <img
            src="/img/clone.svg"
            alt="Clone"
            data-click-action={AppointmentDataClickAction.CLONE}
          />
          <img
            src="/img/close.svg"
            alt="Close"
            data-click-action={AppointmentDataClickAction.CLOSE}
          />
        </div>
        <div data-click-action={AppointmentDataClickAction.MODAL}>
          <p
            className={styles.content_title}
            data-click-action={AppointmentDataClickAction.MODAL}
          >
            {appointment.patient?.firstname || ''}{' '}
            {appointment.patient?.lastname || ''}
          </p>
          <p
            className={styles.content_date}
            data-click-action={AppointmentDataClickAction.MODAL}
          >
            {appointmentDate}
            <br />
            {dayjs(appointment.startTime).format('HH:mm')} -{' '}
            {dayjs(appointment.endTime).format('HH:mm')}
          </p>
          <div
            className={styles.content_services}
            data-click-action={AppointmentDataClickAction.MODAL}
          >
            {appointment.appointmentServices.map(appointmentService => (
              <p
                key={appointmentService.id}
                data-click-action={AppointmentDataClickAction.MODAL}
              >
                {appointmentService.service.name}
                {appointmentService.description
                  ? ` - ${appointmentService.description}`
                  : ''}
              </p>
            ))}
          </div>
          {appointment.description && (
            <p
              className={styles.content_description}
              data-click-action={AppointmentDataClickAction.MODAL}
            >
              {appointment.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export { AppointmentDataClickAction, AppointmentInfoModal };
