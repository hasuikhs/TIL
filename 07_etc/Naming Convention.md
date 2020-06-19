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
  
  