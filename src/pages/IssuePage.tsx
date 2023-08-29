import { Fragment, useEffect } from "react";

import { CONTENT_COUNT } from "../constants/issue";
import useIntersectionObserver from "../hooks/useIntersectionObsever";
import usePaginationFetch from "../hooks/usePaginationFetch";
import { getIssueList } from "../services/issue";

const IssuePage = () => {
  const { setTarget, entry } = useIntersectionObserver({ rootMargin: "100px" });
  const { data: issueList, fetch, fetchNextPage } = usePaginationFetch({ initialData: [], fetchFn: getIssueList });

  useEffect(() => {
    fetch();
  }, [fetch]);

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage();
    }
  }, [entry, fetchNextPage]);

  return (
    <>
      <ul>
        {issueList.map((issue, index) =>
          (index + 1) % CONTENT_COUNT ? (
            <li key={issue.id} ref={issueList.length - 1 === index ? setTarget : null}>
              {issue.title}
            </li>
          ) : (
            <Fragment key={issue.id}>
              <li ref={issueList.length - 1 === index ? setTarget : null}>{issue.title}</li>
              <li>광고</li>
            </Fragment>
          ),
        )}
      </ul>
    </>
  );
};

export default IssuePage;
