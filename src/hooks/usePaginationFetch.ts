import { useCallback, useMemo, useState } from "react";

import { Pagination, PaginationFetchResult } from "../models/IPagination";

interface Params<T> {
  initialData: T[];
  fetchFn: (page?: number) => Promise<PaginationFetchResult<T[]>>;
}

const usePaginationFetch = <T>({ initialData, fetchFn }: Params<T>) => {
  const [data, setData] = useState<T[]>(initialData);
  const pagination = useMemo(() => new Pagination(), []);

  const getPagination = useCallback(
    (result: PaginationFetchResult<T[]>) => {
      pagination.setNextPage = result.nextPage;
      setData(prev => [...prev, ...result.data]);
    },
    [pagination],
  );

  const fetch = useCallback(() => {
    return fetchFn().then(getPagination);
  }, [fetchFn, getPagination]);

  const fetchNextPage = useCallback(() => {
    if (pagination.isLast) {
      return;
    }

    return fetchFn(pagination.getNextPage).then(getPagination);
  }, [fetchFn, pagination, getPagination]);

  return { data, fetch, fetchNextPage };
};

export default usePaginationFetch;
