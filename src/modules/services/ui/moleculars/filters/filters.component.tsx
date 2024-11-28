import { Button, Input } from 'antd';
import { hoc } from '@utils';
import { useServicesTableFiltersProps } from './filters.props';

/**
 * <ServicesTableFilters />
 */
const ServicesTableFilters = hoc.observer(
  useServicesTableFiltersProps,
  ({ t, servicesFilters, onFilterChange, onSearch }) => (
    <div className="filter-container">
      <Input
        placeholder={t('form.fields.name.placeholder')}
        value={servicesFilters.name}
        onChange={event => onFilterChange('name', event.target.value)}
      />
      <Button
        type="primary"
        disabled={!servicesFilters.name}
        onClick={onSearch}
      >
        {t('table.search')}
      </Button>
    </div>
  )
);

export { ServicesTableFilters };
