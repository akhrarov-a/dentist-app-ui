import { useStore } from '@store';
import { useTableActions } from '@utils';
import { useLocales } from '@locales';
import { listLib } from '../../../lib';

/**
 * <Services /> props
 */
const useServicesListProps = () => {
  const { services: store } = useStore();

  const { t } = useLocales();

  const tableProps = useTableActions({
    moduleName: 'services',
    total: store.totalServices,
    columns: listLib.Columns(t),
    moreColumns: listLib.MoreColumns(t),
    getData: store.getServices,
    deleteMany: store.deleteServices
  });

  return {
    t,
    items: store.services,
    tableProps
  };
};

export { useServicesListProps };
