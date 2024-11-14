import { useMemo } from 'react';
import moment from 'moment';
import { ScheduleContract } from '@api';
import { slots } from '../slots/slots.constants';
import styles from './appointment.module.scss';

const format = 'HH:mm';
/**
 * <Appointment />
 */
const Appointment = ({ appointment }: { appointment: ScheduleContract }) => {
  const top = useMemo(() => {
    const startTime = moment(appointment.startTime).format('HH:00');
    const startTimeMinutes = parseInt(
      moment(appointment.startTime).format('mm')
    );
    const percentage = startTimeMinutes / 60;

    return slots.indexOf(startTime) * 50 + 1 + 50 * percentage;
  }, [appointment]);

  const height = useMemo(() => {
    const startTime = moment(appointment.startTime).format('HH:00');
    const endTime = moment(appointment.endTime).format('HH:00');

    const startTimeMinutes = parseInt(
      moment(appointment.startTime).format('mm')
    );
    const endTimeMinutes = parseInt(moment(appointment.endTime).format('mm'));

    const startIndex = slots.indexOf(startTime);
    const endIndex = slots.indexOf(endTime);

    return `${(endIndex - startIndex) * 50 - 1 + ((endTimeMinutes - startTimeMinutes) * 50) / 60}px`;
  }, [appointment]);

  return (
    <div className={styles.container} style={{ top, height }}>
      <div className={styles.content}>
        <div className={styles.content_left}>
          <p>
            {appointment.patient.firstname} {appointment.patient.lastname}
          </p>
          <p>
            {moment(appointment.startTime).format(format)} -{' '}
            {moment(appointment.endTime).format(format)}
          </p>
        </div>
        <p>{appointment.description}</p>
      </div>
    </div>
  );
};

export { Appointment };
