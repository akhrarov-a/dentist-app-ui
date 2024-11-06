import React from 'react';
import { Button, Input } from 'antd';
import { hoc } from '@utils';
import { usePatientTableFiltersProps } from './filters.props';
import styles from './filters.module.scss';

/**
 * <PatientTableFilters />
 */
const PatientTableFilters = hoc.observer(
  usePatientTableFiltersProps,
  ({ patientsFilters, onFilterChange, onSearch }) => (
    <div className={styles.container}>
      <Input
        className={styles.input}
        placeholder="firstname"
        value={patientsFilters.firstname}
        onChange={event => onFilterChange('firstname', event.target.value)}
      />
      <Input
        className={styles.input}
        placeholder="lastname"
        value={patientsFilters.lastname}
        onChange={event => onFilterChange('lastname', event.target.value)}
      />
      <Input
        className={styles.input}
        placeholder="phone"
        value={patientsFilters.phone}
        onChange={event => onFilterChange('phone', event.target.value)}
      />
      <Input
        className={styles.input}
        placeholder="email"
        value={patientsFilters.email}
        onChange={event => onFilterChange('email', event.target.value)}
      />
      <Input
        className={styles.input}
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
        className={styles.button}
        onClick={onSearch}
      >
        Search
      </Button>
    </div>
  )
);

export { PatientTableFilters };
