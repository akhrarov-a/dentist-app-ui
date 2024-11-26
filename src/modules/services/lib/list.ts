import { ColumnsType } from 'antd/es/table';
import { ServiceContract } from '@api';
import { TranslationFunctionType } from '@locales';

const List = (services: ServiceContract[]) =>
  services?.map(service => ({
    ...service,
    key: service?.id
  }));

const Columns = (t: TranslationFunctionType): ColumnsType<ServiceContract> => [
  {
    title: t('form.fields.name.label'),
    dataIndex: 'name'
  },
  {
    title: t('form.fields.status.label'),
    dataIndex: 'status'
  }
];

const MoreColumns = (
  t: TranslationFunctionType
): ColumnsType<ServiceContract> => [
  {
    title: t('table.createdAt'),
    dataIndex: 'createdAt'
  },
  {
    title: t('table.updatedAt'),
    dataIndex: 'updatedAt'
  }
];

export { List, Columns, MoreColumns };
