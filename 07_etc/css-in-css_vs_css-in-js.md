# CSS-in-CSS vs CSS-in-JS
## 0. CSS
- 프로젝트가 확장될 수록 모든 html 요소에 클래스를 지정해줘야 함
- 컴포넌트 스타일 변경 시에 클래스에 맞는 선택자를 일일이 찾아 변경해야 함
- JS 파일이 분리되어있기에 컴포넌트 상태값 변화 공유 어려움
- 이러한 문제점으로 CSS-in-CSS, CSS-in-JS 등장

## 1. CSS-in-CSS
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