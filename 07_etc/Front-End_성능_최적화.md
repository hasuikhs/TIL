# Front-End 성능 최적화

## 1. 크롬 개발자 도구

### 1.2 Lighthouse

- Lighthouse는 구글에서 개발한, 웹 페이지의 품질 개선을 위한 오픈 소스 형태의 자동화 도구

- 원래는 따로 설치해서 사용해야 했지만, 크롬 웹 브라우저 개발자 도구에서 사용 가능하게 됨

  ![image-20211221222054641](Front-End 성능 최적화.assets/image-20211221222054641.png)

  - **Performacne**
    - 웹 페이지의 로딩 속도 등 실제 성능을 측정

  - **Progressive Web App**
    - PWA로 부르며, 웹과 네이티브 앱의 기능 모두의 이점을 가지도록 만들어진 서비스인지 체크

  - **Best practices**
    - Best practices를 따라 개발되었는지 체크

  - **Accessibility**
    - Document가 title element를 가지고 있는지, html이 lang 속성이 있는지, 태그에 알맞은 속성 부여댔는지 **접근성 체크**

  - **SEO**
    - Search Engine OPtimization의 약자로 검색 엔진 수집 최적화에 관련된 부분

- ***Generate report* 버튼을 눌러 확인 하면**

  ![image-20211221225131820](Front-End_성능_최적화.assets/image-20211221225131820.png)

  - **First Contentful Paint**
    - 첫 번째 텍스트 또는 이미지가 랜더링 되는데 걸린 시간
  - **Time to Interactive**
    - 페이지가 완전히 상호 작용 가능한 상태가 되는데 걸린 시간
  - **Speed Index**
    - 페이지 내용이 채워지는데 걸린 시간
  - **Total Blocking Time**
    - 페이지가 사용자 입력에 응답하지 못하도록 차단된 총 시간
  - **Largest Contentful Paint**
    - 가장 큰 콘텐츠 요소가 화면에 렌더링 될 때까지 걸리는 시간
  - **Cumulative Layout Shift**
    - 이미지/광고의 느린 로딩, 비동기 동작, 동적 DOM 변경 등으로 레이아웃이 얼마나 변하는지 측정한 값
    - 사용자가 잘못된 클릭을 유발하는 시각적 불안정성을 체크하는 지표

### 1.3 Performance

