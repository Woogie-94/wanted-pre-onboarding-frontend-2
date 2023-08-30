import { AxiosResponse } from "axios";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface PaginationFetchResult<T = any> {
  data: AxiosResponse<T>["data"];
  nextPage: number | null;
}

export class Pagination {
  page: number;
  isLast: boolean;

  constructor() {
    this.page = 1;
    this.isLast = false;
  }

  set setNextPage(page: number | null) {
    if (page) {
      this.page = page;
    } else {
      this.isLast = true;
    }
  }

  get getNextPage() {
    return this.page;
  }
}
