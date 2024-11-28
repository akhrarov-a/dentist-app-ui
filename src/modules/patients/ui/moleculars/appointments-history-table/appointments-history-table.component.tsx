import * as uuid from 'uuid';
import { Table } from 'antd';
import moment from 'moment';
import { ColumnsType } from 'antd/es/table';
import { hoc, months, weekdays } from '@utils';
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
    currentPatientName,
    pagination,
    schedules,
    schedulesTotalAmount
  }) => {
    const columns: ColumnsType<ScheduleContract> = [
      {
        title: t('table.dateAndTime'),
        render: (_, record) => {
          const date = moment(record.startTime);

          const weekday = weekdays[date.weekday()];
          const month = months[date.month()];

          return (
            <div className={styles.column}>
              <p>
                {date.date()} {month} {date.year()}
              </p>
              <p>
                {weekday} - {moment(record.startTime).format('HH:mm')}-
                {moment(record.endTime).format('HH:mm')}
              </p>
            </div>
          );
        }
      },
      {
        title: t('table.services'),
        render: (_, record) => (
          <div className={styles.column}>
            {record.appointmentServices.map(appointmentService => (
              <p>
                {appointmentService.service.name} -{' '}
                {appointmentService.description}
              </p>
            ))}
          </div>
        )
      }
    ];

    return (
      <div className={styles.container}>
        <p>
          {t('table.appointmentHistoryForPatient')} {currentPatientName}:
        </p>
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
