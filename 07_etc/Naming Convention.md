# Naming Convention

## 0. 필요성

- 유지보수의 비용을 최소화하기 위해 통일된 코드 작성법이 필요
- 최초 개발자가 아닌 사람도 코드를 빠르고 정확하게 이해할 수 있도록 작성

## 1. 종류

### 1.1 lowerCamelCase

- 단봉낙타 표기법이라고도 함
- 보통 카멜 케이스라 하면 lowerCamelCase를 의미
- 각 단어의 첫 문자를 대문자로 표시하되, 전체 이름의 첫 문자는 소문자

### 1.2 UpperCamelCase, PascalCase

- 쌍봉낙타 표기법이라고도 함
- 전체 이름의 첫 문자를 포함한 각 단어의 첫문자를 대문자로 표시

### 1.3 snake_case

각 단어의 사이를 `_`로 구분한다

#### 1.3.1 Train_Case

- 각 단어의 앞글자를 대문자로 표시

#### 1.3.2 spinal_case

- 각 단어의 앞글자를 소문자로 표시

## 2. 적용

### 2.0 공통

- 변수명에 관사와 전치사를 넣지 않는다.

  ```javascript
  var a_cat	// x
  var cat		// O
  ```

- 변수명에 전치사는 최대한 생략한다.

  ```javascript
  var the_number_of_worker	// x
  var worker_num				// O
  ```

- 단수와 복수를 구분한다.

- 사용하는 언어의 암묵적인 규칙을 지킨다. (JAVA: CamelCase, python: snake_case etc..)

- 통상적으로 사용되는 변수명/규칙을 사용한다. (tmp, cnt, idx etc..)

- 상수는 모두 대문자로 표시한다.

  ```javascript
  const HOUR_OF_DAY = 24;
  ```

- 변수가 길면 적당히 잘라준다.

- 로직이 끝나면 한 줄 띄워준다. 

  - 이 부분은 개인적으로 꼭 해줬으면 좋겠다.
  - 다른 사람이 짠 코드를 볼 때 너무 힘들다.

### 2.1 JAVA Naming Convention

#### 2.1.1 패키지(Package)

- [com].[Company].[Project].[TopPackage].[LowerPackage] 와 같이 표기
- 패키지명은 가급적 한 단어의 명사를 사용

#### 2.1.2 클래스(Class)

- 쌍봉낙타 표기법을 사용
- 명사를 사용

#### 2.1.3 인터페이스(Interface)

- 쌍봉낙타 표기법을 사용
- 형용사를 사용

#### 2.1.4 메서드(Method)

- 단봉낙타 표기법을 사용

- 자주사용되는 동사

  |         단 어         |      설 명       |
  | :-------------------: | :--------------: |
  |       get / set       |   얻다 / 넣다    |
  |     add / remove      |   추가 / 제거    |
  |   create / destroy    |   창조 / 파괴    |
  |     start / stop      |   시동 / 정지    |
  | increment / decrement |   증가 / 감소    |
  |       old / new       |   옛 / 새로운    |
  |      begin / end      |    시작 / 끝     |
  |     first / last      | 첫번쨰 / 마지막  |
  |       up / down       |    위 / 아래     |
  |       min / max       |   최소 / 최대    |
  |    next / previous    |   다음 / 이전    |
  |     open / close      |   열다 / 닫다    |
  |      show / hide      | 보이다 / 숨기다  |
  |   suspend / resume    | 일시 정지 / 재개 |
  |    parent / child     |   부모 / 자식    |

#### 2.1.5 변수(Variable)

- 단봉낙타 표기법을 사용
- 변수에 약어를 사용하지 않고 모든 의미를 충분히 담는다.
- 한 글자로 된 이름을 지양한다.
- 변함없는 변수(Constant)는 모두 대문자로 `_`로 구분한다.

#### 2.1.6 요약

|   종 류   |         규 칙         |                예                |
| :-------: | :-------------------: | :------------------------------: |
|  Package  |      소문자 시작      |           com.sun.eng            |
|   Class   |  대문자로 시작, 명사  |            class Name            |
| Interface | 대문자로 시작, 형용사 |            interface             |
|  Method   |  소문자로 시작, 동사  |            runFast()             |
| Variable  |     소문자로 시작     |              int i;              |
| Constant  |        대문자         | static final int MIN_NUMBER = 1; |

### 2.2 HTML Naming Convention

#### 2.2.1 기본

- 이름은 영문 소문자, 숫자, 언더스코어(_)로 작성

#### 2.2.2 id 및 class

- id는 문서 전체의 식별자이므로 한 문서에서 동일한 id를 여러 번 사용하지 않는다.

- class는 문서에서 여러 번 사용 가능하다.

- 레이아웃 약속어

  | 약 속 어  |      범 위       |
  | :-------: | :--------------: |
  |   wrap    | 페이지 전체 범위 |
  |  header   |   머리글 영역    |
  | container |    본문 영역     |
  |  content  |   주요 콘텐츠    |
  |  footer   |   바닥글 영역    |

	- 사용 예

    ```html
    <div id="wrap" >
        <div id="header"></div>
        <div id="container">
            <div id="content"></div>
        </div>
        <div id="footer"></div>
    </div>
    ```

  #### 2.2.3 이미지
  
  - `형태_의미_상태` 순서로 조합
  
  - 예
  
    |     잘못된 예     |     올바른 예      |        설 명         |
    | :---------------: | :----------------: | :------------------: |
    | on_recommend_tab1 |   tab1_recomm_on   |   `형태_의미_상태`   |
    |      bnm.gif      | btn_naver_mail.gif |  임의 축약하지 않음  |
    |  btn_Search.gif   |    btn_srch.gif    |     영문 소문자      |
    |  1btn_search.gif  |    btn_srch.gif    | 숫자로 시작하지 않음 |
### 2.3 JavaScript Naming Convention

#### 2.3.1 변수

- 변수의 이름은 **lowerCamelCase**로 표기

- **변수의 첫 글자는 알파벳**

  ```javascript
  // bad
  let 123Number = 123;
  let HELLO_WORLD = 'Hello World';
  
  // good
  let number = 369;
  let helloWorld = 'Hello World';
  ```

#### 2.3.2 함수

- 함수는 **lowerCamelCase**로 표기

  ```javascript
  // bad
  function GetData() {
      // ...
  }
  
  // good
  function getData() {
      // ...
  }
  ```

- 함수의 이름은 동사 또는 동사 구문으로 표기

  ```javascript
  // bad
  function whatIsThis() {
   	// ...   
  }
  
  // good
  function isThis() {
      // ...
  }
  ```

- 함수를 default export할 때는 lowerCamelCase로 표기

  ```javascript
  function makeStyleGuide() {
      // ...
  }
  
  export default makeStyleGuide;
  ```

- 함수 라이브러리를 export할 때는 **PascalCase**

- 함수의 parameter는 lowerCamelCase로 표기, 한 글자의 parameter는 public method에서는 사용하지 말 것

  ```javascript
  // bad 
  function someFunction(PARAMETERONE, PARAMETERTWO) {
      // ...
  }
  
  // good
  function someFunciton(parameterOne, parameterTwo) {
      // ...
  }
  ```

- **template 함수의 parameter는 모두 간결해야하고 한글자 또는 한단어**여야 한다.

  **또, 모두 대문자로 표기**

### 2.4 Python Naming Convention

#### 2.4.1 변수

- 변수의 이름은 기본적으로 snake_case이지만 _의 위치에 따라 의미가 다름

  - `_this_var` : 맨 앞에 붙일 경우에는 내부적으로 사용
  - `this_var_` : 맨 뒤에 붙일 경우에는 파이썬 기본 키워드와 충돌을 피하기 위함
- 클래스를 사용할때는 **PacalCase**
- 내부적으로 쓰이면 _을 앞에 붙임
  - 예외(Exception)이 실제로 에러인 경우 **Error**를 뒤에 붙임

#### 2.4.2 함수

- 함수명도 snake_case를 따름
- 인스턴스 메소드의 첫번째 인자는 언제나 `self`
- 클래스 메소드의 첫번째 인자는 언제나 `cls`

