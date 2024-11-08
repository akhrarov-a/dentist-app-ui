import { useStore } from '@store';
import { useTableActions } from '@utils';
import { useLocales } from '@locales';
import { listLib } from '../../../lib';

/**
 * <Patients /> props
 */
const usePatientsListProps = () => {
  const { patients: store } = useStore();

  const { t } = useLocales();

  const tableProps = useTableActions({
    moduleName: 'patients',
    total: store.totalPatients,
    columns: listLib.Columns(t),
    moreColumns: listLib.MoreColumns(t),
    getData: store.getPatients,
    deleteMany: store.deletePatients
  });

  return {
    t,
    items: store.patients,
    tableProps
  };
};

export { usePatientsListProps };
