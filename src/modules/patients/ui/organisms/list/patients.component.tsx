import { hoc } from '@utils';
import { Tables } from '@components';
import { listLib } from '../../../lib';
import { PatientsTableFilters } from '../../moleculars';
import { usePatientsListProps } from './patients.props';

/**
 * <PatientsList />
 */
const PatientsList = hoc.observer(
  usePatientsListProps,
  ({ items, tableProps }) => (
    <Tables
      {...tableProps}
      addText="Add patient"
      dataSource={listLib.List(items)}
      filters={<PatientsTableFilters />}
    />
  )
);

export { PatientsList };
