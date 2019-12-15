# CSS Practice

[CSS Practice Site](https://medium.com/better-programming/7-projects-to-practice-html-css-skills-for-beginners-cba7521a45b)

## 1주차

### 1. div? span?

  - **div?**

    - div 요소는 **블록(block) 레벨 요소**이며 **인라인(inline) 요소와 텍스트를 포함**하고 다시금 블록 레벨 요소를 포함 가능하다.
    - div와 div를 쓰면 **서로 줄바꿈이 발생**한다.
    - div는 **전체적인 레이아웃**을 잡을때 사용한다.

- **span?**
  - span 요소는 **인라인(inline) 요소**이며 인라인 요소와 텍스트를 포함하지만 블록 레벨 요소를 포함하지 않는다.
  - span과 span 사이에는 **줄 바꿈이 생기지 않는다**.
  - span은 텍스트 스타일 등 **특정 부분에 스타일을 지정**할 때 사용한다.

### 2. id? class?

- **id?**
  - id 선택자는 **문서 안에 있는 단 하나의 요소에 스타일을 적용**하는 경우에 사용한다.
  - 선택자에 샾(#)과 id명(임의의 이름)을 붙여 구별한다.

- **class?**
  - class 선택자는 **문서 안의 여러 요소에 스타일을 적용**하는 경우에 사용한다.
  - 선택자에 점(.)과 class명(임의의 이름)을 붙여 구별한다.
- 즉, 하나의 id는 한문서에 한번만 사용 가능하고, 하나의 class는 한 문서에서 여러번 사용 가능하다.
- **id의 속성이 class의 속성보다 우선 순위가 높다**.
- 즉, id의 속성은 해당 요소에 부여된 class 속성에 관계 없이 작동한다.

```html
<div id="div1">
    <p>여기는 div1 공간</p>    
    <span class="span">span 1 공간</span>
    <span class="span">span 2 공간</span>
</div>
<div id="div2">
    <p>여기는 div2 공간</p>
</div>
```

```css
#div1 {}
#div2 {}
.span {}
```

