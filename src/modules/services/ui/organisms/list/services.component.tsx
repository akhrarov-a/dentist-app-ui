import { hoc } from '@utils';
import { Tables } from '@components';
import { listLib } from '../../../lib';
import { ServicesTableFilters } from '../../moleculars';
import { useServicesListProps } from './services.props';

/**
 * <ServicesList />
 */
const ServicesList = hoc.observer(
  useServicesListProps,
  ({ t, items, tableProps }) => (
    <Tables
      {...tableProps}
      addText={t('services.table.addService')}
      dataSource={listLib.List(items)}
      filters={<ServicesTableFilters />}
    />
  )
);

export { ServicesList };
