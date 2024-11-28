import * as uuid from 'uuid';
import { Table } from 'antd';
import moment from 'moment';
import { ColumnsType } from 'antd/es/table';
import { hoc } from '@utils';
import { ScheduleContract } from '@api';
import { useAppointmentsHistoryTableProps } from './appointments-history-table.props.ts';
import styles from './appointments-history-table.module.scss';

/**
 * <AppointmentsHistoryTable />
 */
const AppointmentsHistoryTable = hoc.observer(
  useAppointmentsHistoryTableProps,
  ({
    t,
    loading,
    name,
    currentServiceId,
    pagination,
    schedules,
    schedulesTotalAmount
  }) => {
    const columns: ColumnsType<ScheduleContract> = [
      {
        title: t('table.dateAndTime'),
        render: (_, record) => (
          <div className={styles.column}>
            <p>{moment(record.startTime).format('DD MMMM YYYY')}</p>
            <p>
              {moment(record.startTime).format('HH:mm')}-
              {moment(record.endTime).format('HH:mm')}
            </p>
          </div>
        )
      },
      {
        title: t('table.patient'),
        render: (_, record) => (
          <div className={styles.column}>
            <p>
              {record.patient.firstname} {record.patient.lastname}
            </p>
          </div>
        )
      },
      {
        title: t('table.servicesDescription'),
        render: (_, record) => (
          <div className={styles.column}>
            <p>
              {
                record.appointmentServices.find(
                  appointmentService =>
                    appointmentService.service.id === currentServiceId
                )?.description
              }
            </p>
          </div>
        )
      }
    ];

    return (
      <div className={styles.container}>
        <p>{name} appointments history:</p>
        <Table
          key={uuid.v4()}
          className={styles.tables_table}
          bordered
          columns={columns}
          dataSource={schedules}
          loading={loading}
          pagination={{
            current: pagination.page,
            pageSize: pagination.perPage,
            total: schedulesTotalAmount,
            position: ['bottomCenter'],
            showSizeChanger: true,
            pageSizeOptions: ['20', '50', '100'],
            defaultPageSize: 20,
            locale: {
              items_per_page: `/ ${t('table.page')}`
            }
          }}
          scroll={{ x: true }}
          onChange={pagination.handleTableChange}
          rowKey={record => record?.id}
        />
      </div>
    );
  }
);

export { AppointmentsHistoryTable };
