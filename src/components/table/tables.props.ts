import { useEffect, useRef, useState } from 'react';
import { TablePaginationConfig, TableProps } from 'antd';
import { useClickOutside, useModal } from '@hooks';
import { useLocales } from '@locales';

/**
 * Tables Props
 */
type TablesProps<
  T = {
    key: number | string;
    id: number | string;
  }
> = Pick<TableProps<T>, 'loading' | 'expandable'> & {
  /**
   * Per page
   */
  perPage?: number;
  /**
   * Data
   */
  dataSource?: T[];
  /**
   * Page
   */
  page?: number;
  /**
   * Total items
   */
  total?: number;
  /**
   * Change Table
   */
  handleTableChange?: (pagination: TablePaginationConfig) => any;
  /**
   * Create
   */
  onCreate?: () => any;
  /**
   * Delete
   */
  onDelete?: () => any;
  /**
   * columns list
   */
  columns?: any[];
  /**
   * Row selection
   */
  rowSelection?: {};
  /**
   * Add Text
   */
  addText?: string;
  /**
   * On row
   */
  onRow?: (a: any, b: any) => any;
  /**
   * More columns list
   */
  moreColumn?: [] | any[];
  /**
   * Delete disabled
   */
  deleteDisabled?: boolean;
  /**
   * Add disabled
   */
  addDisabled?: boolean;
  /**
   * Filters
   */
  filters?: JSX.Element;
  /**
   * Without pagination
   */
  withoutPagination?: boolean;
};

/**
 * _Column
 */
type _Column = {
  title: string;
  dataIndex: string;
  render?: (value: any) => any;
  width?: string | number;
} & { selected: boolean };

/**
 * <Tables /> props
 */
const useTablesProps = ({ columns, moreColumn = [] }: TablesProps) => {
  const popoverModel = usePopover();
  const buttonsModel = usePopover();

  const { t } = useLocales();
  const modal = useModal();

  const [allColumns, setAllColumns] = useState<_Column[]>([]);
  const [_columns, setColumns] = useState<any[]>([]);

  const onSelectedColumnsClick = (id: string) => {
    setAllColumns(
      allColumns?.map(column =>
        column.dataIndex === id
          ? {
              ...column,
              selected: !column.selected
            }
          : column
      )
    );
  };

  useEffect(() => {
    setAllColumns([
      ...columns?.map(column => ({
        ...column,
        selected:
          allColumns.find(_column => _column.dataIndex === column.dataIndex)
            ?.selected ?? true
      })),
      ...moreColumn.map(column => ({
        ...column,
        selected:
          _columns.find(_column => _column.dataIndex === column.dataIndex)
            ?.selected || false
      }))
    ]);
  }, [columns, moreColumn]);

  useEffect(() => {
    const columns = allColumns.filter(column => column.selected);
    const width = (100 / columns.length).toFixed(0);

    setColumns(
      columns.map(column => ({
        ...column,
        width: `${width}%`
      }))
    );
  }, [allColumns]);

  return {
    t,
    modal,
    popoverModel,
    buttonsModel,
    moreColumn,
    allColumns,
    _columns,
    onSelectedColumnsClick
  };
};

/**
 * Use popover
 */
const usePopover = () => {
  const selectedColumnsDropdownRef = useRef<HTMLDivElement>(null);

  const [showSelectColumnsDropdown, setShowSelectColumnsDropdown] =
    useState(false);

  const onMoreColum = () => {
    setShowSelectColumnsDropdown(true);
  };

  useClickOutside(selectedColumnsDropdownRef, () => {
    if (!showSelectColumnsDropdown) return;

    setShowSelectColumnsDropdown(false);
  });

  return {
    isOpen: showSelectColumnsDropdown,
    open: onMoreColum,
    popoverRef: selectedColumnsDropdownRef
  };
};

export { useTablesProps };
