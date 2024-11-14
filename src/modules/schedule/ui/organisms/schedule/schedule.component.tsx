import { hoc } from '@utils';
import { SchedulesHeader } from '../../moleculars';
import { useScheduleProps } from './schedule.props';

/**
 * <Schedule />
 */
const Schedule = hoc.observer(useScheduleProps, ({ t, schedules }) => (
  <div>
    <SchedulesHeader />
  </div>
));

export { Schedule };
