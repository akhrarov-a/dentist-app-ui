import { slots } from './slots.constants';
import styles from './slots.module.scss';

/**
 * <Slots />
 */
const Slots = () => {
  return (
    <div className={styles.container}>
      {slots.map(slot => (
        <div key={slot} className={styles.slot}>
          <p>{slot}</p>
          <div className={styles.slot_appointment}>
            <div className={styles.slot_line} />
          </div>
        </div>
      ))}
    </div>
  );
};

export { Slots };
