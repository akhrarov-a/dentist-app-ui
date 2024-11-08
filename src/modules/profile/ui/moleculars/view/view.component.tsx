import { hoc } from '@utils';
import { useStore } from '@store';
import styles from './view.module.scss';

/**
 * <View />
 */
const View = hoc.observer(useStore, () => {
  return <div className={styles.container}></div>;
});

export { View };
