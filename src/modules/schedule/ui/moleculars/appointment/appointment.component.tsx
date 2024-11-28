import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import moment from 'moment';
import { DateType, ScheduleContract } from '@api';
import { slots } from '../slots/slots.constants';
import styles from './appointment.module.scss';

const format = 'HH:mm';

/**
 * <Appointment />
 */
const Appointment = ({
  dateType,
  appointment
}: {
  dateType: DateType;
  appointment: ScheduleContract;
}) => {
  const navigate = useNavigate();

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
    <div
      className={styles.container}
      style={{ top, height }}
      onClick={() => navigate(`/schedule/${appointment.id}`)}
    >
      <div
        className={classNames(styles.content, {
          [styles.content_day]: dateType === DateType.DAY
        })}
      >
        <div className={styles.content_first}>
          <p>
            {appointment.patient.firstname} {appointment.patient.lastname}
          </p>
          <p>
            {moment(appointment.startTime).format(format)} -{' '}
            {moment(appointment.endTime).format(format)}
          </p>
        </div>
        <div>
          {appointment.appointmentServices.map(appointmentService => (
            <p>
              {appointmentService.service.name} -{' '}
              {appointmentService.description}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export { Appointment };
