import { useStore } from '@store';
import { useTableActions } from '@utils';
import { listLib } from '../../../lib';

/**
 * <Patients /> props
 */
const usePatientsListProps = () => {
  const { patients: store } = useStore();

  const tableProps = useTableActions({
    moduleName: 'patients',
    total: store.totalPatients,
    columns: listLib.Columns,
    moreColumns: listLib.MoreColumns,
    getData: store.getPatients,
    deleteMany: store.deletePatients
  });

  return {
    items: store.patients,
    tableProps
  };
};

export { usePatientsListProps };
