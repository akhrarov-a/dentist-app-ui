import { ColumnsType } from 'antd/es/table';
import { PatientContract } from '@api';

const List = (patients: any[]) =>
  patients?.map(patient => ({
    ...patient,
    key: patient?.id
  }));

const Columns: ColumnsType<PatientContract> = [
  {
    title: 'ID',
    dataIndex: 'id'
  },
  {
    title: 'Name',
    render: (_, record) => `${record?.firstname} ${record?.lastname}`
  },
  {
    title: 'Phone',
    dataIndex: 'phone'
  },
  {
    title: 'Email',
    dataIndex: 'email'
  },
  {
    title: 'Description',
    dataIndex: 'description'
  }
];

const MoreColumns: ColumnsType = [
  {
    title: 'Created At',
    dataIndex: 'createdAt'
  },
  {
    title: 'Updated At',
    dataIndex: 'updatedAt'
  }
];

export { List, Columns, MoreColumns };
