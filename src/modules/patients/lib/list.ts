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
    title: t('table.ID'),
    dataIndex: 'id'
  },
  {
    title: `${t('patients.form.firstname.label')} ${t('patients.form.lastname.label')}`,
    render: (_, record) => `${record?.firstname} ${record?.lastname}`
  },
  {
    title: t('patients.form.phone.label'),
    dataIndex: 'phone'
  },
  {
    title: t('patients.form.email.label'),
    dataIndex: 'email'
  },
  {
    title: t('patients.form.description.label'),
    dataIndex: 'description'
  }
];

const MoreColumns = (
  t: TranslationFunctionType
): ColumnsType<PatientContract> => [
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
