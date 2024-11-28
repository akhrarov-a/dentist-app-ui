import { hoc } from '@utils';
import { Appointment, SchedulesHeader, Slots } from '../../moleculars';
import { useScheduleProps } from './schedule.props';

/**
 * <Schedule />
 */
const Schedule = hoc.observer(useScheduleProps, ({ schedules }) => (
  <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
    <SchedulesHeader />
    <div style={{ margin: '30px 0', position: 'relative' }}>
      <Slots />
      {schedules.map(schedule => (
        <Appointment key={schedule.id} appointment={schedule} />
      ))}
    </div>
  </div>
));

export { Schedule };
