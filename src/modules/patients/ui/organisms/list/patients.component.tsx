import { hoc } from '@utils';
import { Tables } from '@components';
import { listLib } from '../../../lib';
import { PatientTableFilters } from '../../moleculars';
import { usePatientsListProps } from './patients.props.ts';

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
      filters={<PatientTableFilters />}
    />
  )
);

export { PatientsList };
