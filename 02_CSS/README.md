# 191022| CSS 정리

## 1. CSS 기본

> CSS에는 정답이 없다 ! CSS IS AWESOME...

### 1.1 개요

### 1.2 HTML 적용하는 방법 3가지

* `Inline Style`

  * HTML 요소 안에 style 속성을 부여

    ```html
    <body>
        <h1 style="color: blue;">
            나는 h1 태그입니다.
        </h1>
    </body>
    ```

* `Embedding`

  * HTML head 안에 style 태그를 정의

    ```html
    <head>
        <style>
            h1 {color: blue;}
        </style>
    </head>
    ```

* `Link file`

  * 외부 파일로 컴포넌트화

    ```html
    <head>
        <link rel="stylesheet" href="name.css">
        <!-- IE에만 적용하고 싶을시 단, 10버전 미만까지만 지원 -->
        <!--[if IE]>
        <link rel="stylesheet" href="ie-styles.css">
        <![endif]-->
    </head>
    ```

### 1.3 문법

#### 1.3.1 기본 문법

`선택자 { 속성: 값 }`

- **선택자(Selector)** : h1
- **선언 블록** : { ... }
- **선언문** : color: blue;
  - 속성(Property)
    - 사람이 읽을 수 있는 식별자. **어떤** 스타일을 바꿀까?
  - 값(Value)
    - 각 속성에 값을 부여. **어떻게** 스타일을 바꿀까?

```css
/* sample */   
h1 {
    color: blue;
}
```

#### 1.3.2 크기 단위

* `px`
  * 대부분의 브라우저는 1px을 1/96인치의 절대단위로 인식
* `%`
  * 기본글꼴의 크기에 대하여 상대적인 값을 가짐
* `em`
  * 상속(상위 요소)의 영향을 받아 크기가 바뀜
  ```css
    /* html > body > .message 일 경우 */
    html {
      font-size: 10px;
    }
    body {
      font-size: 2em; /* 상위 html의 사이즈의 2배인 20px */
    }
    .message {
      font-size: 2em; /* 상위 body의 사이즈의 2배인 40px */
    }
  ```
* `pt`
  * 일반 문서(워드 등)에서 많이 사용하는 단위
* `rem`
  * 최상위 요소 기준으로 크기가 바뀜
  * HTML 페이지의 기본 폰트 크기는 16px
  ```css
    /* html > body > .message 일 경우 */
    html {
      font-size: 10px;
    }
    body {
      font-size: 2rem; /* 최상위 html의 사이즈의 2배인 20px */
    }
    .message {
      font-size: 2rem; /* 최상위 html의 사이즈의 2배인 20px */
    }
  ```
* `vh`, `vw`
  * 뷰포트의 높이값과 넓이값 현재 뷰포트의 (1/100 단위)

#### 1.3.3 선택자

* **선택자 유형(기본)**
  * 전체 선택자 : `* { margin:0; padding: 0; }`
  * 태그 선택자 : `h1 { color: crimson; }`
  * 클래스 선택자 : `.pink { color: pink; }`
  * 아이디 선택자 : `#blue { color: blue; }`

- **선택자 우선순위**
  1. `!important` : 정말 필요할 때만 쓰자. 남용하면 코드가 파국으로 치닫는다.
  2. Inline style 속성 : 필요할 때만 쓰자. 남용하면 유지보수 매우 힘들다. (css 파일로만 유지보수할 수 없음! HTML 코드를 봐야함)
  3. 아이디 선택자
  4. 클래스 선택자
  5. 태그 선택자
  6. 전체 선택자



## 2. 박스 모델 

> 이제부터 모든 것을 네모네모로 바라봅시다...... :)

### 2.1 기본

```css
// 기본적으로 padding에도 동일하게 적용할 수 있다.

/* 1. 기본 */
.margin {
    margin-top: 15px;
    margin-bottom: 15px;
    margin-right: 15px;
    margin-left: 15px;
}

/* 2. 심화(shorthand) */
.margin-shorthand-1 {
    /* 상하좌우 */
    margin: 15px;
}
.margin-shorthand-2 {
    /* 상하 좌우 */
    margin: 5px 15px;
}
.margin-shorthand-3 {
    /* 상 좌우 하 */
    margin: 5px 15px 10px;
}
.margin-shorthand-4 {
    /* 상 우 하 좌 ('상'부터 시계방향) */
    margin: 5px 10px 15px 20px;
}
```

### 2.2 Display 속성

* block
  * 항상 새로운 라인에서 시작
  * 화면 크기 전체의 가로폭 차지 (width: 100%)
* inline
  * 하위 요소에 맞게 가로폭 차지

### 2.3 Background

* background-image
* background-repeat
* background-attachment

### 2.4 Font / Text

* font-size
* font-style

### 2.5 Position

* Static (기본위치)
* Absolute
* Relative
