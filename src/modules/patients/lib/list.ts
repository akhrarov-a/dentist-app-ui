import { ColumnsType } from 'antd/es/table';
import { PatientContract } from '@api';
import { TranslationFunctionType } from '@locales';

const List = (patients: PatientContract[]) =>
  patients?.map(patient => ({
    ...patient,
    key: patient?.id
  }));

const Columns = (t: TranslationFunctionType): ColumnsType<PatientContract> => [
  {
    title: `${t('form.fields.firstname.label')} ${t('form.fields.lastname.label')}`,
    render: (_, record) => `${record?.firstname} ${record?.lastname}`
  },
  {
    title: t('form.fields.phone.label'),
    dataIndex: 'phone'
  },
  {
    title: t('form.fields.description.label'),
    dataIndex: 'description'
  }
];

const MoreColumns = (
  t: TranslationFunctionType
): ColumnsType<PatientContract> => [
  {
    title: t('form.fields.email.label'),
    dataIndex: 'email'
  },
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
