import { AxiosResponse } from "axios";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface PaginationFetchResult<T = any> {
  data: AxiosResponse<T>["data"];
  nextPage: number | null;
}
