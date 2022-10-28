# Rendering
> - **TTV(Time To View)**: 사용자가 페이지를 볼 수 있는 시점
> - **TTI(Time To Interact)**: 사용자가 인터렉션할 수 있는 시점
## 0. Basic
### 0.1 Browser rendering process
#### 0.1.1 기본 동작 과정
- HTML, CSS 파일을 파싱하여, DOM(Document Object Model), CSSOM(CSS Object Model) Tree 구축 (**Parsing**)
  - HTML 파싱 중 `<link>`, `<style>` 태그를 만나도 일반적인 CSS 자체로는 DOM 구조에 영향이 없어 HTML 파싱은 block 되지 않음
  - DOM Tree 생성 중 CSS 파일이 있으면 다운로드 요청만 해놓고 DOM Tree 구성 진행
  - 하지만, `<script>` JavaScript는 DOM 구조에 영향을 줄 수 있기 때문에 `defer`, `async` 옵션을 쓰지 않았다면 파싱을 멈추고 다운로드 후 실행까지 진행
  - JavaScript에서 특정 DOM 요소의 style 요청 가능한데 CSS가 아직 다운로드되지 않은 경우를 대비해 CSS 파일을 받기 전까지 HTML 파싱이 중단될 수 있음
- 두 Tree를 결합하여 Render Tree 생성(**Style**)
  - 브라우저 화면에 렌더링되는 노드만으로 구성(`display: none` 같은 경우는 제외)
- Render Tree에서 각 노드의 위치와 크기를 계산(**Layout, Reflow**)
  - 뷰포트 내에서 각 노드들의 정확한 위치와 크기를 계산해 배치
  - **Reflow**
    - 대상 속성
      <table>
        <tr>
          <td>position</td><td>width</td><td>height</td><td>left</td><td>top</td><td>right</td><td>bottom</td>
        </tr>
        <tr>
          <td>margin</td><td>padding</td><td>border</td><td>border-width</td><td>clear</td><td>display</td><td>float</td>
        </tr>
        <tr>
          <td>font-family</td><td>font-size</td><td>font-weight</td><td>line-height</td><td>min-height</td><td>overflow</td><td>text-align</td>
        </tr>
        <tr>
          <td>vertical-align</td><td>white-space</td><td>...</td><td></td><td></td><td></td><td></td>
        </tr>
      </table>
    - Reflow는 해당 요소와 자식요소 부모/조상 요소까지 진행하므로 심각한 성능 저하를 유발 가능
    - **최적화 방법**
      - Reflow 속성 사용 줄이기
      - 클래스 변화에 따른 스타일 변경시, 최대한 DOM 구조상 끝단에 위치한 노드에 줌
      - 인라인 스타일을 최대한 배제
      - 가능하다면 Reflow보다 Repaint만 발생하는 속성 사용(transform, opacity 등)
      - 애니메이션이 들어간 코드는 `position`을 `fixed`, `absolute`로 지정하여 전체 노드에서 분리
      - 퀄리티와 퍼포먼스 사이에서 타협
      - 테이블 레이아웃 `<table>`을 피하라
        - 테이블은 점진적 렌더링이 아닌 내부 콘텐츠가 모두 로딩된 후에 그려짐
      - CSS 하위 선택자 줄이기
        - 하위 선택자가 많아지면 CSSOM Tree의 깊이가 깊어지고 Render Tree를 만드는데 시간 증가
- Render Tree의 각 노드를 화면 상의 실제 픽셀로 변환(**Paint, Repaint**)
  - 픽셀로 변환된 결과는 하나의 layer가 아닌 여러 개의 layer로 관리
  - 스타일이 복잡할수록 Paint 시간 증가
  - 대상 속성
    <table>
      <tr>
        <td>backgrond</td><td>background-image</td><td>background-position</td><td>background-repeat</td><td>bachground-size</td><td>border-radius</td><td>border-style</td>
      </tr>
      <tr>
        <td>box-shadow</td><td>color</td><td>line-style</td><td>outline</td><td>outline-style</td><td>outline-width</td><td>text-decoration</td>
      </tr>
      <tr>
        <td>visibility</td><td>...</td><td></td><td></td><td></td><td></td><td></td>
      </tr>
    </table>
- Paint 단계에서 생성된 layer를 합성하여 실제 화면에 나타냄(**Composite**)

### 0.2 MPA vs SPA
- **MPA(Multi Page Application)**
  - 말 그대로 여러 개의 Page로 구성된 application이며 전통적인 개발 방식
  - 기본적으로 SSR을 따르며 새로운 **페이지를 요청할 때마다** 서버에서 정적 리소스(HTML, CSS, JS)가 받아짐
  - PHP, JSP 등
  - **장점**
    - SEO(Search Engine Optimiztion)에 유리
  - **단점**
    - 새로운 페이지 이동시 화면이 깜빡임
    - 프론트엔드(FE)와 백엔드(BE)의 관련이 깊어 개발이 복잡해 질수 있음
- **SPA(Single Page Application)**
  - 과거 웹 사이트는 문서 하나에 전달되는 파일의 용량이 작아서, 사용자의 요청에 따라 완전히 새로운 페이지를 서버에서 제공
  - 하지만 오늘날 웹 사이트가 복잡해짐에 따라 매번 새로운 페이지를 전달하는 것은 리소스를 많이 먹고 비효율적이게 됨
  - 이런 배경에 따라 **페이지 변경 없이 하나의 페이지 안에서 application이 구동되는 SPA가 등장**
  - React, Vue, Angular 등
  - **장점**
    - 페이지 요청시 일부만 업데이트하기에 전체적인 자원 관리에 효율적
    - 일부만 업데이트하기에 새로고침이 없어 화면 깜짝임이 없음
  - **단점**
    - application에 필요한 정적 리소스를 한번에 받기에 초기 구동속도가 느림(splitting을 따로해줘야 개선 가능)
    - HTML 파일의 내용이 아무것도 없기 때문에 SEO가 어려움
## 1. CSR(Client Side Rendering)
- Client에서 알아서 화면을 그리는 방식
- 최초 하나의 html 파일을 하나 받는데, 링크된 js파일을 같이 받아 정해진 로직에 따라 동적으로 html을 생성하여 화면을 보여줌
- 사이트 내에서 url을 이동하더라도 새로운 htmlf을 파일을 받지 않음
- **장점**
  - 화면 깜빡임이 없음
  - 초기 로딩 이후 속도가 빠름
  - 클라이언트의 자원을 사용하기에 서버에 부하가 적음
- **단점**
  - 프로젝트가 커질수록 코드량이 많아지면서 js 파일의 크기가 커지므로, 최초 로딩에 시간이 오래 걸림
  - SEO에 불리함
- **적합한 경우**
  - 검색엔진에 노출되지 않아도 될 때
  - 유저와의 인터렉션이 잦을 때
  - 화면 업데이트가 잦을 떄
  - 초기 로딩이 느려도 사용자 경험이 중요할 때
## 2. SSR(Server Side Rendering)
- Server에서 화면을 그려서 클라이언트에 제공하는 방식
- **장점**
  - 초기 로딩 속도가 CSR보다 상대적으로 빠름
  - SEO에 유리함
- **단점**
  - **매 요청**마다 서버의 자원을 사용하여 사용량이 많을 수록 서버에 부담
- **적합한 경우**
  - 검색엔진 노출이 필요할 때
  - 고정된 데이터가 존재할 때
  - 유저와의 인터렉션보다 화면 요소를 보여주는 것이 중요할 때
  - 인터렉션이 뜸할 때
## 3. SSG(Static Site Generation)
- build시 페이지들의 HTML을 static하게 생성
- 이미 생성이 완료된 HTML을 사용하기에 속도가 매우 빠름
- 컨텐츠의 변경이 자주 일어나지 않는 페이지에 적합
- Next.js에서...
  - 데이터 fetch 없이 단순한 컴포넌트를 만들고 build하면 기본적으로 SSG로 작동
  - CDN으로 제공되므로, SSR보다 빠름
  - 사용하기 좋은 페이지
    - 마케팅 페이지
    - 블로그 포스트
    - 상품 목록
    - 도움말
- **장점**
  - SEO에 유리함
  - 이미 만들어져있기 때문에 로딩 속도가 매우 빠름
- **단점**
  - 이미 만들어진 html이기에 업데이트하고자 한다면 다시 rebuild 필요
- **적합한 경우**
  - 업데이트가 없거나 적을 때
  - 생성되는 정적파일의 개수가 많지 않을 때
## 4. ISR(Incremental Static Regeneration)
- build 시점에 페이지를 렌더링 한 후, 설정한 시간 마다 페이지를 새로 렌더링
- SSG와 비슷하지만 일정 시간마다 페이지를 업데이트한다는데에 차이가 존재
## 5. Isomorphic app, Universal Rendering
- 초기 렌더링은 SSR을 사용하고, 이후 렌더링은 CSR을 사용하는 앱이나 렌더링
- 서버와 클라이언트가 같은 코드를 사용하기에 예상치 못한 에러 발생 가능하지만, 초기 로딩 속도 보완 / SEO 개선 / CSR의 장점을 가짐