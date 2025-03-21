import { Button, Checkbox, Modal, Table } from 'antd';
import * as uuid from 'uuid';
import { hoc } from '@utils';
import { useTablesProps } from './tables.props';
import styles from './tables.module.scss';

/**
 * <Tables />
 */
const Tables = hoc.observer(
  useTablesProps,
  ({
    t,
    modal,
    onCreate,
    addText,
    rowSelection,
    dataSource,
    perPage,
    page,
    total,
    allColumns,
    buttonsModel,
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

        <Modal
          okText={t('form.actions.yes')}
          cancelText={t('form.actions.no')}
          visible={modal.isOpen}
          onOk={() => {
            onDelete();
            modal.close();
          }}
          onCancel={modal.close}
          centered
        >
          {t('form.areYouSureToDelete')}
        </Modal>

        <div className={styles.tables_buttonContainer}>
          <Button
            className={styles.tables_buttonContainer_button}
            onClick={modal.open}
            disabled={deleteDisabled}
            type="primary"
          >
            {t('table.delete')}
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
            {t('table.manageColumns')}
          </Button>

          {popoverModel.isOpen && (
            <div
              ref={popoverModel.popoverRef}
              className={styles['more-columns-dropdown']}
            >
              <p className={styles.option}>{t('table.selectColumns')}</p>
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

        <div className={styles.tables_buttonContainer_mob}>
          <img src="/img/more.svg" alt="More" onClick={buttonsModel.open} />

          {buttonsModel.isOpen && (
            <div
              ref={buttonsModel.popoverRef}
              className={styles.tables_buttonContainer_mob_buttons}
            >
              <Button
                className={styles.tables_buttonContainer_button}
                onClick={modal.open}
                disabled={deleteDisabled}
                type="link"
              >
                {t('table.delete')}
              </Button>

              {addText && (
                <Button
                  className={styles.tables_buttonContainer_button}
                  onClick={onCreate}
                  disabled={addDisabled}
                  type="link"
                >
                  {addText}
                </Button>
              )}

              <Button
                className={styles.tables_buttonContainer_button}
                onClick={popoverModel.open}
                type="link"
              >
                {t('table.manageColumns')}
              </Button>

              {popoverModel.isOpen && (
                <div
                  ref={popoverModel.popoverRef}
                  className={styles['more-columns-dropdown']}
                >
                  <p className={styles.option}>{t('table.selectColumns')}</p>
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
                defaultPageSize: 20,
                locale: {
                  items_per_page: `/ ${t('table.page')}`
                }
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
