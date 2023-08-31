import { Fragment, useEffect } from "react";
import { styled } from "styled-components";

import Skeleton from "../components/common/Skeleton";
import AdItem from "../components/issue/AdItem";
import IssueItem from "../components/issue/IssueItem";
import { CONTENT_COUNT } from "../constants/issue";
import useIntersectionObserver from "../hooks/useIntersectionObsever";
import usePaginationFetch from "../hooks/usePaginationFetch";
import useToast from "../hooks/useToast";
import Header from "../layouts/Header";
import { getIssueList } from "../services/issue";

const IssuePage = () => {
  const { setTarget, entry } = useIntersectionObserver({ rootMargin: "100px" });
  const {
    data: issueList,
    fetch,
    fetchNextPage,
    isLoading,
  } = usePaginationFetch({ initialData: [], fetchFn: getIssueList });
  const { show } = useToast();

  useEffect(() => {
    fetch().catch(() => {
      show({ message: "이슈 조회에 실패했습니다." });
    });
  }, [fetch, show]);

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage()?.catch(() => {
        show({ message: "이슈 조회에 실패했습니다." });
      });
    }
  }, [entry, fetchNextPage, show]);

  return (
    <Wrapper>
      <Header />
      <Content>
        <ul>
          {issueList.map((issue, index) => (
            <Fragment key={issue.id}>
              <IssueItem issue={issue} ref={issueList.length - 1 === index ? setTarget : null} />
              {!((index + 1) % CONTENT_COUNT) && <AdItem />}
            </Fragment>
          ))}
        </ul>
        {isLoading && (
          <>
            <Skeleton width="100%" height="67px" margin="8px 0" />
            <Skeleton width="100%" height="67px" margin="8px 0" />
            <Skeleton width="100%" height="67px" margin="8px 0" />
          </>
        )}
      </Content>
    </Wrapper>
  );
};

export default IssuePage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Content = styled.div`
  width: 960px;
  padding-bottom: 16px;
`;
