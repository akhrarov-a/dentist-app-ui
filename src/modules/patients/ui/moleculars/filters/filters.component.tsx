import { Button, Input } from 'antd';
import { hoc } from '@utils';
import { usePatientsTableFiltersProps } from './filters.props';

/**
 * <PatientsTableFilters />
 */
const PatientsTableFilters = hoc.observer(
  usePatientsTableFiltersProps,
  ({ patientsFilters, onFilterChange, onSearch }) => (
    <div className="filter-container">
      <Input
        placeholder="firstname"
        value={patientsFilters.firstname}
        onChange={event => onFilterChange('firstname', event.target.value)}
      />
      <Input
        placeholder="lastname"
        value={patientsFilters.lastname}
        onChange={event => onFilterChange('lastname', event.target.value)}
      />
      <Input
        placeholder="phone"
        value={patientsFilters.phone}
        onChange={event => onFilterChange('phone', event.target.value)}
      />
      <Input
        placeholder="email"
        value={patientsFilters.email}
        onChange={event => onFilterChange('email', event.target.value)}
      />
      <Input
        placeholder="description"
        value={patientsFilters.description}
        onChange={event => onFilterChange('description', event.target.value)}
      />
      <Button
        type="primary"
        disabled={
          !patientsFilters.firstname &&
          !patientsFilters.lastname &&
          !patientsFilters.phone &&
          !patientsFilters.email &&
          !patientsFilters.description
        }
        onClick={onSearch}
      >
        Search
      </Button>
    </div>
  )
);

export { PatientsTableFilters };
