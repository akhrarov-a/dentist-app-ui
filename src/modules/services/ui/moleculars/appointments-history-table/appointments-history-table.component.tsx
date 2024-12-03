import classNames from 'classnames';
import * as uuid from 'uuid';
import { Button, Table } from 'antd';
import dayjs from 'dayjs';
import { ColumnsType } from 'antd/es/table';
import { getMonth, getWeekday, hoc } from '@utils';
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
    language,
    name,
    currentServiceId,
    pagination,
    schedules,
    schedulesTotalAmount,
    onAppointmentClick,
    onAddAppointmentClick
  }) => {
    const columns: ColumnsType<ScheduleContract> = [
      {
        title: t('table.dateAndTime'),
        render: (_, record) => {
          const date = dayjs(record.startTime);

          const weekday = getWeekday(date, language);
          const month = getMonth(date, language);

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
        title: t('table.serviceDescription'),
        render: (_, record) => (
          <div className={styles.column}>
            <p>
              {record.appointmentServices.find(
                appointmentService =>
                  appointmentService.service.id === currentServiceId
              )?.description || '-'}
            </p>
          </div>
        )
      }
    ];

    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <p>
            {t('table.appointmentHistoryForService')}: {name}
          </p>
          <Button onClick={onAddAppointmentClick}>
            {t('schedule.table.addAppointment')}
          </Button>
        </div>
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
