import classNames from 'classnames';
import styles from './slots.module.scss';

/**
 * <Slots />
 */
const Slots = ({
  isWeek = false,
  slots
}: {
  isWeek: boolean;
  slots: string[];
}) => (
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
