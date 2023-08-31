import { useCallback, useMemo, useState } from "react";

import { Pagination, PaginationFetchResult } from "../models/IPagination";

interface Params<T> {
  initialData?: T[];
  fetchFn: (page?: number) => Promise<PaginationFetchResult<T[]>>;
}

const usePaginationFetch = <T>({ initialData = [], fetchFn }: Params<T>) => {
  const [data, setData] = useState<T[]>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const pagination = useMemo(() => new Pagination(), []);

  const getFetchResult = useCallback(
    (result: PaginationFetchResult<T[]>) => {
      pagination.setNextPage = result.nextPage;
      setData(prev => [...prev, ...result.data]);
      setIsLoading(false);
    },
    [pagination],
  );

  const fetch = useCallback(() => {
    setIsLoading(true);
    return fetchFn().then(getFetchResult);
  }, [fetchFn, getFetchResult]);

  const fetchNextPage = useCallback(() => {
    if (pagination.isLast) {
      return;
    }
    setIsLoading(true);
    return fetchFn(pagination.getNextPage).then(getFetchResult);
  }, [fetchFn, pagination, getFetchResult]);

  return { data, fetch, fetchNextPage, isLoading };
};

export default usePaginationFetch;
