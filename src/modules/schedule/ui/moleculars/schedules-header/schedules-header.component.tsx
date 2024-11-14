import { hoc } from '@utils';
import classNames from 'classnames';
import { useSchedulesHeaderProps } from './schedules-header.props';
import styles from './schedules-header.module.scss';

/**
 * <SchedulesHeader />
 */
const SchedulesHeader = hoc.observer(
  useSchedulesHeaderProps,
  ({ headerText, onPreviousDayClick, onNextDayClick }) => (
    <div className={styles.container}>
      <img
        className={classNames(styles.arrow, styles.arrow_right)}
        src="/img/arrow.svg"
        onClick={onPreviousDayClick}
      />
      <p className={styles.day}>{headerText}</p>
      <img
        className={styles.arrow}
        src="/img/arrow.svg"
        onClick={onNextDayClick}
      />
    </div>
  )
);

export { SchedulesHeader };
