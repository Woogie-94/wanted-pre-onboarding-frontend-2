import githubService from "./githubService";
import { DEFAULT_ISSUE_PAGE, ISSUE_PER_PAGE } from "../constants/issue";
import { IIssue, Issue } from "../models/IIssue";
import { PaginationFetchResult } from "../models/IPagination";

export const getIssueList = async (page: number = DEFAULT_ISSUE_PAGE): Promise<PaginationFetchResult<Issue[]>> => {
  const response = await githubService.get<IIssue[]>("https://api.github.com/repos/facebook/react/issues", {
    params: { state: "open", sort: "comments", per_page: ISSUE_PER_PAGE, page },
  });

  return {
    data: response.data.map(data => new Issue(data)),
    nextPage: response.data.length === ISSUE_PER_PAGE ? response.config.params.page + 1 : null,
  };
};
