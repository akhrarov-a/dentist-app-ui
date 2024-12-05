import { hoc } from '@utils';
import { Tables } from '@components';
import { listLib } from '../../../lib';
import { UsersTableFilters } from '../../moleculars';
import { useUsersListProps } from './users.props.ts';

/**
 * <UsersList />
 */
const UsersList = hoc.observer(
  useUsersListProps,
  ({ t, items, tableProps }) => (
    <Tables
      {...tableProps}
      addText={t('users.table.addUser')}
      dataSource={listLib.List(items)}
      filters={<UsersTableFilters />}
    />
  )
);

export { UsersList };
