import { useMemo } from 'react';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { DateType, ScheduleContract } from '@api';
import { AppointmentInfoModal } from '../../atoms';
import styles from './appointment.module.scss';

const format = 'HH:mm';

/**
 * <Appointment />
 */
const Appointment = ({
  showInfoModal,
  language,
  dateType,
  appointment,
  slots
}: {
  showInfoModal: boolean;
  language: string;
  dateType: DateType;
  appointment: ScheduleContract;
  slots: string[];
}) => {
  const top = useMemo(() => {
    const startTime = dayjs(appointment.startTime).format('HH:00');
    const startTimeMinutes = parseInt(
      dayjs(appointment.startTime).format('mm')
    );
    const percentage = startTimeMinutes / 60;

    const top = slots.indexOf(startTime) * 50 + 1 + 50 * percentage;

    if (dateType === DateType.DAY) {
      return top;
    }

    return top + 50;
  }, [appointment, dateType]);

  const height = useMemo(() => {
    const startTime = dayjs(appointment.startTime).format('HH:00');
    const endTime = dayjs(appointment.endTime).format('HH:00');

    const startTimeMinutes = parseInt(
      dayjs(appointment.startTime).format('mm')
    );
    const endTimeMinutes = parseInt(dayjs(appointment.endTime).format('mm'));

    const startIndex = slots.indexOf(startTime);
    const endIndex = slots.indexOf(endTime);

    return (
      (endIndex - startIndex) * 50 -
      1 +
      ((endTimeMinutes - startTimeMinutes) * 50) / 60
    );
  }, [appointment]);

  return (
    <div
      className={classNames(styles.container, {
        [styles.container_past]: dayjs(appointment.endTime).isBefore(
          new Date(),
          'day'
        )
      })}
      style={{
        top,
        height: `${height}px`,
        zIndex: showInfoModal ? '122' : '120'
      }}
      data-click-action={appointment.id}
    >
      <div data-click-action={appointment.id} style={{ position: 'relative' }}>
        <div
          className={classNames(styles.content, {
            [styles.content_day]: dateType === DateType.DAY,
            [styles.content_height_is_smaller_than_24]: height < 24
          })}
          data-click-action={appointment.id}
          style={{
            height: `${height < 24 ? height - 2 : height - 14}px`
          }}
        >
          <div
            className={styles.content_first}
            data-click-action={appointment.id}
          >
            <p data-click-action={appointment.id}>
              {appointment.patient.firstname} {appointment.patient.lastname}
            </p>
            <p className={styles.time} data-click-action={appointment.id}>
              {dayjs(appointment.startTime).format(format)} -{' '}
              {dayjs(appointment.endTime).format(format)}
            </p>
          </div>
          <div className={styles.services} data-click-action={appointment.id}>
            {appointment.appointmentServices.map(appointmentService => (
              <p key={appointmentService.id} data-click-action={appointment.id}>
                {appointmentService.service.name} -{' '}
                {appointmentService.description}
              </p>
            ))}
          </div>
        </div>

        {showInfoModal && (
          <AppointmentInfoModal
            language={language}
            dateType={dateType}
            appointment={appointment}
          />
        )}
      </div>
    </div>
  );
};

export { Appointment };
