import classNames from 'classnames';
import { slots } from './slots.constants';
import styles from './slots.module.scss';

/**
 * <Slots />
 */
const Slots = ({ isWeek = false }: { isWeek: boolean }) => (
  <div
    className={classNames(styles.container, {
      [styles.container_week]: isWeek
    })}
  >
    {slots.map(slot => (
      <div key={slot} className={styles.slot}>
        <p>{slot}</p>
        <div className={styles.slot_appointment} />
      </div>
    ))}
  </div>
);

export { Slots };
