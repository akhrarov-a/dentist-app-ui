import { Button, Input } from 'antd';
import { hoc } from '@utils';
import { usePatientsTableFiltersProps } from './filters.props';

/**
 * <PatientsTableFilters />
 */
const PatientsTableFilters = hoc.observer(
  usePatientsTableFiltersProps,
  ({ t, patientsFilters, onFilterChange, onSearch }) => (
    <div className="filter-container">
      <Input
        placeholder={t('patients.form.firstname.placeholder')}
        value={patientsFilters.firstname}
        onChange={event => onFilterChange('firstname', event.target.value)}
      />
      <Input
        placeholder={t('patients.form.lastname.placeholder')}
        value={patientsFilters.lastname}
        onChange={event => onFilterChange('lastname', event.target.value)}
      />
      <Input
        placeholder={t('patients.form.phone.placeholder')}
        value={patientsFilters.phone}
        onChange={event => onFilterChange('phone', event.target.value)}
      />
      <Input
        placeholder={t('patients.form.email.placeholder')}
        value={patientsFilters.email}
        onChange={event => onFilterChange('email', event.target.value)}
      />
      <Input
        placeholder={t('patients.form.description.placeholder')}
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
        {t('patients.table.search')}
      </Button>
    </div>
  )
);

export { PatientsTableFilters };
