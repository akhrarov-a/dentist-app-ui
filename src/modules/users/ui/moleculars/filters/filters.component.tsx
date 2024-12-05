import classNames from 'classnames';
import { Button, Input, Select } from 'antd';
import { hoc } from '@utils';
import { useUsersTableFiltersProps } from './filters.props';
import styles from './filters.module.scss';
import { Status, UserRole } from '@api';

/**
 * <UsersTableFilters />
 */
const UsersTableFilters = hoc.observer(
  useUsersTableFiltersProps,
  ({ t, filterModal, usersFilters, onFilterChange, onSearch }) => (
    <div className={styles.container}>
      <div className={styles.container_filters}>
        <Input
          placeholder={t('form.fields.firstname.placeholder')}
          value={usersFilters.firstname}
          onChange={event => onFilterChange('firstname', event.target.value)}
        />
        <Input
          placeholder={t('form.fields.lastname.placeholder')}
          value={usersFilters.lastname}
          onChange={event => onFilterChange('lastname', event.target.value)}
        />
        <Input
          placeholder={t('form.fields.phone.placeholder')}
          value={usersFilters.phone}
          onChange={event => onFilterChange('phone', event.target.value)}
        />
        <Input
          placeholder={t('form.fields.email.placeholder')}
          value={usersFilters.email}
          onChange={event => onFilterChange('email', event.target.value)}
        />
        <Input
          placeholder={t('form.fields.description.placeholder')}
          value={usersFilters.description}
          onChange={event => onFilterChange('description', event.target.value)}
        />
        <Select
          className={styles.select}
          placeholder={t('form.fields.role.placeholder')}
          value={usersFilters.role}
          options={[
            {
              label: UserRole.ADMIN,
              value: UserRole.ADMIN
            },
            {
              label: UserRole.DENTIST,
              value: UserRole.DENTIST
            }
          ]}
          onChange={value => onFilterChange('role', value)}
        />
        <Select
          className={styles.select}
          placeholder={t('form.fields.status.placeholder')}
          value={usersFilters.status}
          options={[
            {
              label: Status.ACTIVE,
              value: Status.ACTIVE
            },
            {
              label: Status.DELETED,
              value: Status.DELETED
            }
          ]}
          onChange={value => onFilterChange('status', value)}
        />
        <Button
          type="primary"
          disabled={
            !usersFilters.firstname &&
            !usersFilters.lastname &&
            !usersFilters.phone &&
            !usersFilters.email &&
            !usersFilters.description &&
            !usersFilters.status &&
            !usersFilters.role
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
              value={usersFilters.firstname}
              onChange={event =>
                onFilterChange('firstname', event.target.value)
              }
            />
            <Input
              placeholder={t('form.fields.lastname.placeholder')}
              value={usersFilters.lastname}
              onChange={event => onFilterChange('lastname', event.target.value)}
            />
            <Input
              placeholder={t('form.fields.phone.placeholder')}
              value={usersFilters.phone}
              onChange={event => onFilterChange('phone', event.target.value)}
            />
            <Input
              placeholder={t('form.fields.email.placeholder')}
              value={usersFilters.email}
              onChange={event => onFilterChange('email', event.target.value)}
            />
            <Input
              placeholder={t('form.fields.description.placeholder')}
              value={usersFilters.description}
              onChange={event =>
                onFilterChange('description', event.target.value)
              }
            />
            <Select
              className={styles.select}
              placeholder={t('form.fields.role.placeholder')}
              value={usersFilters.role}
              options={[
                {
                  label: UserRole.ADMIN,
                  value: UserRole.ADMIN
                },
                {
                  label: UserRole.DENTIST,
                  value: UserRole.DENTIST
                }
              ]}
              onChange={value => onFilterChange('role', value)}
            />
            <Select
              className={styles.select}
              placeholder={t('form.fields.status.placeholder')}
              value={usersFilters.status}
              options={[
                {
                  label: Status.ACTIVE,
                  value: Status.ACTIVE
                },
                {
                  label: Status.DELETED,
                  value: Status.DELETED
                }
              ]}
              onChange={value => onFilterChange('status', value)}
            />
            <Button
              type="primary"
              disabled={
                !usersFilters.firstname &&
                !usersFilters.lastname &&
                !usersFilters.phone &&
                !usersFilters.email &&
                !usersFilters.description &&
                !usersFilters.status &&
                !usersFilters.role
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

export { UsersTableFilters };
