import * as uuid from 'uuid';
import { Button, Checkbox, Table } from 'antd';
import { hoc } from '@utils';
import { useTablesProps } from './tables.props';
import styles from './tables.module.scss';

/**
 * <Tables />
 */
const Tables = hoc.observer(
  useTablesProps,
  ({
    onCreate,
    addText,
    rowSelection,
    dataSource,
    perPage,
    page,
    total,
    allColumns,
    _columns,
    deleteDisabled,
    addDisabled,
    loading,
    expandable,
    filters,
    popoverModel,
    onRow,
    onDelete,
    handleTableChange,
    onSelectedColumnsClick,
    withoutPagination = false
  }) => (
    <div className={styles.tables}>
      <div className={styles.tables_header}>
        {filters ?? <div />}
        <div className={styles.tables_buttonContainer}>
          <Button
            className={styles.tables_buttonContainer_button}
            onClick={onDelete}
            disabled={deleteDisabled}
            type="primary"
          >
            Delete
          </Button>

          {addText && (
            <Button
              className={styles.tables_buttonContainer_button}
              onClick={onCreate}
              disabled={addDisabled}
              type="primary"
            >
              {addText}
            </Button>
          )}

          <Button
            className={styles.tables_buttonContainer_button}
            onClick={popoverModel.open}
            type="primary"
          >
            Manage columns
          </Button>

          {popoverModel.isOpen && (
            <div
              ref={popoverModel.popoverRef}
              className={styles['more-columns-dropdown']}
            >
              <p className={styles.option}>
                Select column, which you want to add
              </p>
              {allColumns.map((column, index) => (
                <Checkbox
                  key={index}
                  checked={column.selected}
                  className={styles.option}
                  value={column.dataIndex}
                  onChange={() => onSelectedColumnsClick(column.dataIndex)}
                >
                  {column.title}
                </Checkbox>
              ))}
            </div>
          )}
        </div>
      </div>

      <Table
        key={uuid.v4()}
        className={styles.tables_table}
        rowSelection={rowSelection}
        bordered
        columns={_columns}
        dataSource={dataSource}
        loading={loading}
        pagination={
          withoutPagination
            ? false
            : {
                current: page,
                pageSize: perPage,
                total: total,
                position: ['bottomCenter'],
                showSizeChanger: true,
                pageSizeOptions: ['20', '50', '100'],
                defaultPageSize: 20
              }
        }
        scroll={{ x: true }}
        onRow={onRow}
        onChange={handleTableChange}
        expandable={expandable}
        rowKey={record => record?.id}
      />
    </div>
  )
);

export { Tables };
