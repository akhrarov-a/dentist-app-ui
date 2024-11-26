import { useCallback, useState } from 'react';

/**
 * Use pagination
 */
const usePagination = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(20);

  const handleTableChange = useCallback(
    (pagination: any) => {
      setPage(pagination.current);
      setPerPage(pagination.pageSize);
    },
    [setPage, setPerPage]
  );

  return {
    page,
    perPage,
    handleTableChange
  };
};

export { usePagination };
