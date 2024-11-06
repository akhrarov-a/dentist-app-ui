import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { TableColumnsType, TablePaginationConfig } from 'antd';

/**
 * Table actions
 */
type TableActions<T> = {
  moduleName: string;
  total: number;
  deleteMany?: (ids: number[]) => Promise<any>;
  getData: (page: number, perPage: number) => Promise<void>;
  columns?: TableColumnsType<any>;
  moreColumns?: TableColumnsType<any>;
  getCheckboxProps?: (value: T) => any;
};

/**
 * Use table actions
 */
const useTableActions = <T extends { id: number | string }>(
  store: TableActions<T>,
  routeKey: keyof T = 'id'
) => {
  const [search] = useSearchParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState<number[]>([]);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: +search.get('page') || 1,
    pageSize: +search.get('perPage') || 20
  });

  const onCreate = () => {
    navigate(`/${store.moduleName}/create`);
  };

  const onRow = (record: any) => ({
    onClick: (event: any) => {
      if (event.ctrlKey || event.metaKey) {
        if (navigator.userAgent.includes('Mac')) return;

        window.open(`/${store.moduleName}/${record[routeKey]}`, '_blank');
      } else {
        navigate(`/${store.moduleName}/${record[routeKey]}`);
      }
    }
  });

  const loadData = async (
    paginationConfig: TablePaginationConfig = pagination
  ) => {
    setLoading(true);

    await store.getData(paginationConfig.current, paginationConfig.pageSize);

    setLoading(false);
  };

  const onPaginationChange = async (pagination: TablePaginationConfig) => {
    navigate(
      `/${store.moduleName}?page=${pagination.current}&perPage=${
        pagination.pageSize
      }`
    );

    await loadData(pagination);

    setPagination(pagination);
  };

  const onDelete = async () => {
    if (!store.deleteMany) return;

    await store.deleteMany(selectedRowId);
    setSelectedRowId(null);

    await loadData();
  };

  useEffect(() => {
    navigate(
      `/${store.moduleName}?page=${pagination.current}&perPage=${
        pagination.pageSize
      }`
    );

    loadData(pagination);
  }, []);

  useEffect(() => {
    if (
      store.total &&
      store.total < pagination.pageSize * (pagination.current - 1) + 1
    ) {
      let subtract = store.total / pagination.pageSize;

      if (subtract < 1) {
        subtract = 1;
      } else {
        subtract = Math.floor(subtract);
      }

      navigate(
        `/${store.moduleName}?page=${subtract}&perPage=${pagination.pageSize}`
      );

      loadData({ ...pagination, current: subtract });
      setPagination({ ...pagination, current: subtract });
    }
  }, [store.total]);

  return {
    loading,
    page: pagination.current,
    perPage: pagination.pageSize,
    total: store.total,
    columns: store.columns,
    moreColumn: store.moreColumns,
    addDisabled: !!(Array.isArray(selectedRowId) ? selectedRowId : []).length,
    deleteDisabled: !(Array.isArray(selectedRowId) ? selectedRowId : []).length,
    rowSelection: {
      selectedRowKeys: selectedRowId,
      onChange: setSelectedRowId,
      getCheckboxProps: store.getCheckboxProps
    },
    onRow,
    onCreate,
    onDelete,
    handleTableChange: onPaginationChange
  };
};

export { useTableActions };
