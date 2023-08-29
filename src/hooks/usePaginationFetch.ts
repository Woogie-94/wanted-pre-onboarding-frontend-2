import { useCallback, useMemo, useState } from "react";

import { Pagination, PaginationFetchResult } from "../models/IPagination";

interface Params<T> {
  initialData: T[];
  fetchFn: (page?: number) => Promise<PaginationFetchResult<T[]>>;
}

const usePaginationFetch = <T>({ initialData, fetchFn }: Params<T>) => {
  const [data, setData] = useState<T[]>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const pagination = useMemo(() => new Pagination(), []);

  const getPagination = useCallback(
    (result: PaginationFetchResult<T[]>) => {
      pagination.setNextPage = result.nextPage;
      setData(prev => [...prev, ...result.data]);
      setIsLoading(false);
    },
    [pagination],
  );

  const fetch = useCallback(() => {
    setIsLoading(true);
    fetchFn().then(getPagination);
  }, [fetchFn, getPagination]);

  const fetchNextPage = useCallback(() => {
    if (pagination.isLast) {
      return;
    }
    setIsLoading(true);
    fetchFn(pagination.getNextPage).then(getPagination);
  }, [fetchFn, pagination, getPagination]);

  return { data, fetch, fetchNextPage, isLoading };
};

export default usePaginationFetch;
