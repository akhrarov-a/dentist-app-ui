import { Input } from 'antd';
import { hoc } from '@utils';
import { useScheduleTableFiltersProps } from './filters.props';

/**
 * <ScheduleTableFilters />
 */
const ScheduleTableFilters = hoc.observer(
  useScheduleTableFiltersProps,
  ({ t, selectedDate, onSelectedDateChange }) => (
    <div className="filter-container">
      <Input
        type="date"
        placeholder={t('form.fields.date.placeholder')}
        value={selectedDate}
        onChange={onSelectedDateChange}
      />
    </div>
  )
);

export { ScheduleTableFilters };
