# CSS-in-CSS vs CSS-in-JS
## 0. CSS
- 프로젝트가 확장될 수록 모든 html 요소에 클래스를 지정해줘야 함
- 컴포넌트 스타일 변경 시에 클래스에 맞는 선택자를 일일이 찾아 변경해야 함
- JS 파일이 분리되어있기에 컴포넌트 상태값 변화 공유 어려움
- 이러한 문제점으로 CSS-in-CSS, CSS-in-JS 등장

## 1. CSS-in-CSS
- 일반 CSS와 마찬가지로 전체 페이지에 필요한 CSS를 처음부터 전부 로딩하여 `style` 태그 생성
### 1.1 CSS Module
- CSS를 모듈화하여 사용하는 방식
- CSS 클래스를 만들면 자동으로 고유한 클래스네임을 만들어 scope를 지역적으로 제한
- 즉, CSS 파일에 선언한 클래스네임들이 모두 고유해지기에 Global namespace 중복 문제 해결 가능
- 단, 한 곳에서 모든 CSS의 모든 것을 작성하지 않기에 별도로 많은 CSS 파일을 생성해야 함
- `Home.module.css`, `import styles from './Home.module.css'`

### 1.2 CSS 전처리기(Preprocessor)
- 자신만의 특별한 구문(Syntax)을 가지고 CSS를 생성하는 프로그램
- CSS의 문제점을 프로그래밍 방식, 즉 변수, 조건문, 반복문 등을 제공하여 CSS 작성을 편리하게 해줌
- 재사용성과 임의 함수 및 내장 함수로 개발 시간과 비용 절감, 중첩과 상속으로 인해 구조화된 코드 유지 및 관리 용이
- 하짐난 전처리기를 위한 도구가 필요하고 재컴파일시 시간이 소요됨
- SCSS는 Sass의 모든 기능을 지원하는 CSS의 상위집합
- `Sass`, `Less`, `Stylus`
## 2. CSS-in-JS
- JS 코드 내에서 CSS를 작성하는 방식
- 컴포넌트의 스타일에 맞게 스타일을 적용하기에, 동적 스타일 적용에 자유로움
- 과정
  - CSS-in-JS에서는 클래스네임을 명명하지 않음
  - 브라우저 랜더링시 브라우저 랜더링 엔진은 CSS 파일과 클래스네임 태그를 기반으로 랜더링 트리를 생성하기 때문에 모든 CSS-in-JS는 CSS 전처리기를 내장
  - 런타임 시 각 컴포넌트를 hashing하여 동적 클래스네임을 생성하고 `head`태그에 `style`태그 추가됨
### 2.1 Styled-Components
- 장점
  - CSS 모델을 문서 레벨이 아닌 컴포넌트 레벨로 추상화하는 모듈성
  - JS 환경을 최대한 활용
  - JS와 CSS 사이의 상수와 함수를 공유
  - 현재 사용 중인 스타일만 DOM에 포함
  - 짧은 길이의 유니크한 클래스네임을 자동으로 생성하는 코드 경량화
- 단점
  - 러닝 커브
  - 새로운 의존성 발생
  - 별도 라이브 설치에 따른 번들 크기 증대와 CSS-in-CSS에 비해 상대적으로 느린 속도
    - CSS 모듈 방식은 JS 해석 과정이 따로 없기에 페이지가 빠르게 전환됨