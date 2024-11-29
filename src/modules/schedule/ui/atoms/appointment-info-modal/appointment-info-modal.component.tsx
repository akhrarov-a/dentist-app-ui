import classNames from 'classnames';
import styles from './appointment-info-modal.module.scss';
import { DateType, ScheduleContract } from '@api';
import { useMemo } from 'react';
import dayjs from 'dayjs';

/**
 * <AppointmentInfoModal />
 */
const AppointmentInfoModal = ({
  dateType,
  appointment
}: {
  dateType: DateType;
  appointment: ScheduleContract;
}) => {
  const style = useMemo(() => {
    if (dateType === DateType.DAY) {
      return { left: '50%' };
    }

    const weekday = dayjs(appointment.startTime).day();

    if (weekday === 0 || weekday > 3) {
      return { right: '100%' };
    }

    return { left: '100%' };
  }, [appointment]);

  return (
    <div
      className={classNames(
        'animate__animated animate__fadeInRight',
        styles.container
      )}
      data-click-action="appointment-modal"
      style={{ ...style }}
    >
      Modal
    </div>
  );
};

export { AppointmentInfoModal };
