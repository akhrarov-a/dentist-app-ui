import classNames from 'classnames';
import * as uuid from 'uuid';
import { Table } from 'antd';
import dayjs from 'dayjs';
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
    name,
    currentServiceId,
    pagination,
    schedules,
    schedulesTotalAmount,
    onAppointmentClick
  }) => {
    const columns: ColumnsType<ScheduleContract> = [
      {
        title: t('table.dateAndTime'),
        render: (_, record) => {
          const date = dayjs(record.startTime);

          const weekday = weekdays[date.day()];
          const month = months[date.month()];

          return (
            <div className={styles.column}>
              <p>
                {date.date()} {month} {date.year()}
              </p>
              <p>
                {weekday} - {dayjs(record.startTime).format('HH:mm')}-
                {dayjs(record.endTime).format('HH:mm')}
              </p>
            </div>
          );
        }
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
        <p>
          {t('table.appointmentHistoryForService')}: {name}
        </p>
        <Table
          key={uuid.v4()}
          className={styles.tables_table}
          rowClassName={record =>
            dayjs(record.endTime).isBefore(new Date(), 'day')
              ? classNames(styles.row, styles.row_past)
              : styles.row
          }
          onRow={record => ({ onClick: () => onAppointmentClick(record) })}
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
