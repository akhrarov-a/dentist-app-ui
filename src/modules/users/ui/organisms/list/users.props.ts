import { useStore } from '@store';
import { useTableActions } from '@utils';
import { useLocales } from '@locales';
import { listLib } from '../../../lib';

/**
 * <UsersList /> props
 */
const useUsersListProps = () => {
  const { users: store } = useStore();

  const { t } = useLocales();

  const tableProps = useTableActions({
    moduleName: 'users',
    total: store.totalUsers,
    columns: listLib.Columns(t),
    moreColumns: listLib.MoreColumns(t),
    getData: store.getUsers,
    deleteMany: store.deleteUsers
  });

  return {
    t,
    items: store.users,
    tableProps
  };
};

export { useUsersListProps };
