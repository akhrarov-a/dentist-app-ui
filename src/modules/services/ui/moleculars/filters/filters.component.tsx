import { Button, Input, Select } from 'antd';
import { hoc } from '@utils';
import { Status } from '@api';
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
      <Select
        placeholder={t('form.fields.status.placeholder')}
        options={[
          {
            label: t('form.fields.status.options.active'),
            value: Status.ACTIVE
          },
          {
            label: t('form.fields.status.options.disabled'),
            value: Status.DISABLED
          }
        ]}
        onChange={value => onFilterChange('status', value)}
        allowClear
      />
      <Button
        type="primary"
        disabled={!servicesFilters.name && !servicesFilters.status}
        onClick={onSearch}
      >
        {t('table.search')}
      </Button>
    </div>
  )
);

export { ServicesTableFilters };
