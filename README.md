## 배포 링크

[배포 사이트](http://wanted-study-2.s3-website-us-east-1.amazonaws.com/)

## 프로젝트 실행 방법

```jsx
$ npm install && npm run dev
```

## 주요 기능

### Infinite Scroll

IntersectionObserver를 사용해 인피니티 스크롤을 구현했으며 재사용성을 고려해 useIntersectionObserver라는 hook을 만들어 관리하고 있습니다. hook의 인자로 IntersectionObserver의 initial option을 넘겨줘 사용하는 쪽에서 option을 커스텀할 수 있도록 했습니다. useIntersectionObserver를 사용하는 여러 상황을 고려해 callback 함수를 넘겨 hook 안에서 실행하기 보단 observe의 값이 담긴 entry를 리턴하여 사용하는 쪽에서 entry를 이용해 자유롭게 사용할 수 있도록 구현했습니다.

### Issue List Pagination

issus 조회 API의 respons config 통해 페이지를 추출하여 다음이 어느 페이지인지, 마지막 페이지인지 알 수 있도록 구현했습니다. 페이지 정보를 API 함수의 리턴 값에 포함하고 이러한 API 함수를 paginationFetch로 구분하여 사용하고 있습니다. paginationFetch은 usePaginationFetch와 상호 작용하도록 구현했습니다.

pagination을 도와주는 usePaginationFetch를 구현해 페이지 관리와 fetch에 관한 로직을 관심사 분리 시켰습니다. hook의 인자로 paginationFetch를 받아 fetch와 fetchNextPage 함수를 만들어 상황에 맞는 함수를 사용할 수 있도록 구현했고 paginationFetch의 리턴값을 받아 데이터와 페이지를 hook 내에서 관리할 수 있도록 구현했습니다.

### Issue Detail Page

이슈를 클릭하여 이슈 상세화면으로 넘어갈 경우 router에 issue의 정보를 state에 담아 보내도록 구현했습니다. 상세화면 페이지에서 만약 state를 찾치 못하는 경우 (주소로 바로 접속할 경우)를 고려하여 넘어온 state가 없을 경우 이슈를 조회하는 API 함수를 실행하도록 구현했습니다. 이렇게 구현하면 이슈를 클릭하여 상세화면에 접근할 경우 API를 조회하지 않기 때문에 불필요한 트래픽을 줄일 수 있는 장점이 있습니다.
