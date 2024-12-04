import classNames from 'classnames';
import { Button, Input } from 'antd';
import { hoc } from '@utils';
import { usePatientsTableFiltersProps } from './filters.props';
import styles from './filters.module.scss';

/**
 * <PatientsTableFilters />
 */
const PatientsTableFilters = hoc.observer(
  usePatientsTableFiltersProps,
  ({ t, filterModal, patientsFilters, onFilterChange, onSearch }) => (
    <div className={styles.container}>
      <div className={styles.container_filters}>
        <Input
          placeholder={t('form.fields.firstname.placeholder')}
          value={patientsFilters.firstname}
          onChange={event => onFilterChange('firstname', event.target.value)}
        />
        <Input
          placeholder={t('form.fields.lastname.placeholder')}
          value={patientsFilters.lastname}
          onChange={event => onFilterChange('lastname', event.target.value)}
        />
        <Input
          placeholder={t('form.fields.phone.placeholder')}
          value={patientsFilters.phone}
          onChange={event => onFilterChange('phone', event.target.value)}
        />
        <Input
          placeholder={t('form.fields.email.placeholder')}
          value={patientsFilters.email}
          onChange={event => onFilterChange('email', event.target.value)}
        />
        <Input
          placeholder={t('form.fields.description.placeholder')}
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
          {t('table.search')}
        </Button>
      </div>

      <div className={styles.container_mob}>
        <img src="/img/filter.svg" alt="Filter" onClick={filterModal.open} />
        {filterModal.isOpen && (
          <div
            className={classNames(
              'animate__animated animate__fadeInRight animate__faster',
              styles.container_mob_filters
            )}
          >
            <div style={{ textAlign: 'right', marginBottom: '15px' }}>
              <img
                src="/img/close.svg"
                alt="Close"
                style={{ width: '24px', height: '24px' }}
                onClick={filterModal.close}
              />
            </div>
            <Input
              placeholder={t('form.fields.firstname.placeholder')}
              value={patientsFilters.firstname}
              onChange={event =>
                onFilterChange('firstname', event.target.value)
              }
            />
            <Input
              placeholder={t('form.fields.lastname.placeholder')}
              value={patientsFilters.lastname}
              onChange={event => onFilterChange('lastname', event.target.value)}
            />
            <Input
              placeholder={t('form.fields.phone.placeholder')}
              value={patientsFilters.phone}
              onChange={event => onFilterChange('phone', event.target.value)}
            />
            <Input
              placeholder={t('form.fields.email.placeholder')}
              value={patientsFilters.email}
              onChange={event => onFilterChange('email', event.target.value)}
            />
            <Input
              placeholder={t('form.fields.description.placeholder')}
              value={patientsFilters.description}
              onChange={event =>
                onFilterChange('description', event.target.value)
              }
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
              {t('table.search')}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
);

export { PatientsTableFilters };
