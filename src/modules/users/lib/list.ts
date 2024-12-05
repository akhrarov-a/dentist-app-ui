import { ColumnsType } from 'antd/es/table';
import { UserContract } from '@api';
import { TranslationFunctionType } from '@locales';

const List = (users: UserContract[]) =>
  users?.map(user => ({
    ...user,
    key: user?.id
  }));

const Columns = (t: TranslationFunctionType): ColumnsType<UserContract> => [
  {
    title: `${t('form.fields.firstname.label')} ${t('form.fields.lastname.label')}`,
    render: (_, record) =>
      `${record?.firstname || ''} ${record?.lastname || ''}`
  },
  {
    title: t('form.fields.phone.label'),
    dataIndex: 'phone'
  },
  {
    title: t('form.fields.email.label'),
    dataIndex: 'email'
  },
  {
    title: t('form.fields.role.label'),
    dataIndex: 'role'
  },
  {
    title: t('form.fields.status.label'),
    dataIndex: 'status'
  }
];

const MoreColumns = (t: TranslationFunctionType): ColumnsType<UserContract> => [
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
