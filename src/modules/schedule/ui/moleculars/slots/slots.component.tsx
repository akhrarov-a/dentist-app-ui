import { slots } from './slots.constants';
import styles from './slots.module.scss';

/**
 * <Slots />
 */
const Slots = () => (
  <div className={styles.container}>
    {slots.map(slot => (
      <div key={slot} className={styles.slot}>
        <p>{slot}</p>
        <div className={styles.slot_appointment} />
      </div>
    ))}
  </div>
);

export { Slots };
