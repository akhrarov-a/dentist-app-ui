import { hoc } from '@utils';
import { useScheduleProps } from './schedule.props.ts';

/**
 * <Schedule />
 */
const Schedule = hoc.observer(useScheduleProps, ({ t, schedules }) => (
  <div>Schedule for today</div>
));

export { Schedule };
