# Event

## 1. `event.target` vs `event.currentTarget`

- javascript의 이벤트 중 클릭한 요소를 가졍는 방법으로 `event` 객체의 `target` 또는 `currentTarget` 프로퍼티를 사용
- `event.target`은 이벤트 버블링의 가장 마지막에 위치한 최하의 요소 반환
  - 실제로 이벤트가 발생한 요소를 가리킴
- `event.currentTarget`의 경우 이벤트가 바인딩된 요소, 해당하는 요소 반환

```html
<div onclick="checkTarget();">
  <span>test</span>
</div>
```

```javascript
function checkTarget(event) {
  // code
}
```

- `event.target`은 클릭된 `span` 태그 반환
- `event.currentTarget`은 이벤트가 바인딩된 `div` 요소 반환
- 하위 구조가 복잡해 지는 경우 `event.target` 만으로는 어떤 요소가 클릭되어 반환되어야 하는지 결과가 달라질 가능성 존재하므로 이런 경우에는 `event.currentTarget`을 활용


## 2. event.target을 이용한 event delegation과 이벤트 버블링

> - 한번에 여러개에 이벤트를 걸려면 지금 아는 방법은 `document.querySelectorAll`을 사용 각 요소들을 for문을 돌려 이벤트 설정
> - 하지만 개수가 많아지면 실행 속도도 느려지고 브라우저에 넘길일이 많아지므로
> - **이를 이벤트 위임(Event Delegation)을 사용하여 해결**

```html
<ul>
  <li><img src="src1"></li>
  <li><img src="src2"></li>
  <li><img src="src3"></li>
</ul>
```

- for문을 사용한 이벤트

  ```javascript
  const lists = document.querySelctorAll('li');
  
  lists.forEach(ele => {
    ele.addEventListener('click', event => {
      // event code
    });
  });
  ```
  
- 이벤트 위임

  ```javascript
  const ul = document.querySelector('ul');
  
  ul.addEventListener('click', event => {
    // event code
  });
  ```

- 이벤트 위임은 다수의 child-element에 각각 이벤트 핸들러 바인딩 하지 않고, 하나의 parent-element에 이벤트 핸들러를 바인딩

- `event.target`을 이용하여 해당 클릭 이벤트가 발생한 element를 잡음

- **DOM에 새로운 child-element를 추가해도 event 처리는 parent-element로 이벤트가 위임되었기 때문에 새로운 요소에 이벤트 핸들러를 바인딩 할 필요가 없음**

## 3. Event Propagation

- **Event Bubbling**
  - 특정 요소에서 이벤트가 발생했을 때 해당 **이벤트가 부모의 요소로 전달**되는 현상

- **Event Capturing**
  - 특정 요소에서 이벤트가 발생했을 때 해당 **이벤트가 자식의 요소로 전달**되는 현상

- **이벤트가 부모나 자식에게 전달되는 현상을 이벤트 전파(Event Propagation)라 함**

- 이벤트 전파를 막기위한 방법
  - `event.preventDefault()`
    - 현재 이벤트의 기본 동작을 중단
    - 특히 HTML의 `<form>` 태그는 `<button type="submit">`의 작동을 할때 페이지 이동을 하므로 `<form>`태그의 기본 기능을 사용하고 싶지만,   `addEventListener` 등을 사용해서 이벤트를 발생시킨다면 해당 `event.preventDefault()` 코드를 꼭 써줘야 함
  - `event.stopPropagation()`
    - 현재 이벤트가 상위로 전파되지 않도록 중단
  - `event.stopImmediatePropagation()`
    - 현재 이벤트가 상위뿐 아니라 현재 레벨에 걸린 다른 이벤트도 동작하지 않도록 중단
  - `return false`
    - jQuery를 사용할 때는 위의 두개 모두를 수행한 것과 같음
    - jQuery를 사용하지 않을 때는 `event.preventDefalut()`와 같음

## 4. Event 객체

### 4.1 Event 생성

```javascript
let myEvent = new Event(type[, options]);
```

- `type`
  - 이벤트 타입을 나타내는 문자열로 `click`등 내장 이벤트나 `my-event` 같은 커스텀 이벤트 지정 가능
- `options`
  - `bubbles`: `true/false` -`true`인 경우 이벤트가 버블링 됨 (default: `false`)
  - `cancelable`: `true/false` - `true`인 경우 브라우저 '기본 동작'이 실행되지 않음 (default: `false`)

### 4.2 dispatchEvent

- 이벤트 객체를 생성한 다음엔 `element.dispatchEvent(event)`를 호출해 요소에 있는 이벤트를 반드시 실행 시켜줘야 함

```html
<button id="btn" type="button">선택</button>
<script>
  let btn = document.querySelector('#btn');
  btn.addEventListener('click', (event) => {
    console.log(event.target)
  });
  btn.dispatchEvent(new Event('click'));
</script>
```

## 5. 이벤트 헨들러

- 특정 요소에서 발생하는 이벤트를 처리하기 위해서는 이벤트 핸들러 함수를 작성하여 연결
- 이벤트 핸들러가 연결된 요소에서 지정된 이벤트 발생 시, 브라우저는 연결된 이벤트 핸들러를 실행

### 5.1 DOM Level-0

- 하나의 콜백만을 지정 가능
- 같은 이벤트 헨들러를 **두 번 이상 사용한다면, 마지막 이벤트 헨들러만이 작동**

```javascript
window.onload = function() {	// window.onload는 HTML 문서가 로드될 때 실행
  let btn = document.getElementById("btn1")
  const idText = document.getElementById("text")

  btn.onclick = function() {
    idText.append("마우스가 버튼을 클릭!")
  }
  btn.onmouseover = function() {
    idText.append("마우스가 버튼 위로 진입!")
  }
  btn.onmouseleave = function() {
    idText.append("마우스가 버튼 위에서 탈출!")
  }
}
```

### 5.2 DOM Level-2 +

- 여러 개의 이벤트 리스너 추가 가능
- 기존 이벤트 핸들러를 덮어 쓰지 않고 핸들러 추가해도 모든 핸들러 정상 작동

- 함수가 버블링 또는 캡처링으로 작동할지 작성시 판단 가능

- IE 6, 7, 8 버전을 지원하지 않아 주의 필요

- 원형

  ```javascript
  대상객체.addEventListener(이벤트명, 실행할 이벤트 리스너[, 이벤트 전파 방식])
  ```

  - **이벤트 명** : 이벤트 리스터를 등록할 이벤트 타입을 문자열로 전달

  - **실행할 이벤트 리스너** : 지정된 이벤트가 발생했을 때 실행할 이벤트 리스너를 전달

  - **이벤트 전파 방식(Optional)** : false면 버블링(Bubbling), true면 캡처링(Capturing) 방식

    - 버블링 : 이벤트가 발생한 요소부터 window까지 이벤트를 전파
    
    - 캡처링 : window로부터 이벤트가 발생한 요소까지 이벤트 전파
    
    - 하지만 options 객체로 여러개를 줄 수도 있음
    
      ```javascript
      대상객체.addEventListener(이벤트명, 실행할 이벤트 리스너, {
        capture: false,
        once: true,
        passive: false,
      });
      ```
    
      - **capture**: 위의 기본적인 이벤트 전파 방식과 같음
      - **once**: true면 이벤트가 딱 한번만 발생됨
      - **passive**: true면 콜백 함수 내부에 preventDefault()가 있다해도 실행되지 않음
    

```javascript
window.onload = function () {
  let btn = document.getElementById("btn")
  const idText = document.getElementById("text")

  btn.addEventListener("click", clickBtn, false)
  btn.addEventListener("mouseover", overBtn, false)
  btn.addEventListener("mouseleave", leaveBtn, false)

  function clickBtn() {
    idText.append("마우스가 버튼을 클릭!")
  }
  function overBtn() {
    idText.append("마우스가 버튼 위로 진입!")
  }
  function leaveBtn() {
    idText.append("마우스가 버튼 위를 탈출!")
  }
}
```

```javascript
// 익명 함수로 처리하는 방법
window.onload = function () {
  let btn = document.getElementById("btn")
  const idText = document.getElementById("text")

  btn.addEventListener("click", () => {
    idText.append("마우스가 버튼을 클릭!")
  }, false)
  btn.addEventListener("mouseover", () => {
    idText.append("마우스가 버튼 위로 진입!")
  }, false)
  btn.addEventListener("mouseleave", () => {
    idText.append("마우스가 버튼 위에서 탈출!")
  }, false)
}
```

### :warning: 주의

- **익명 함수**로 이벤트 헨들러를 추가하면 중복적으로 같은 이벤트를 바인딩하는 경우가 생길 경우 문제가 생김

```html
<button id="btn" type="button">버튼</button>
<script>
  document.querySelector('#btn').addEventListener('click', () => {
    console.log('event 1');
  });
  document.querySelector('#btn').addEventListener('click', () => {
    console.log('event 1');
  });
</script>
```

- 위의 코드는 버튼을 클릭하면 event1이 **두 번** 찍힘

```html
<button id="btn" type="button">버튼</button>
<script>
  document.querySelector('#btn').addEventListener('click', test);
  document.querySelector('#btn').addEventListener('click', test);

  function test() {
    console.log('test')
  }
</script>
```

- 위의 코드는 버튼을 클릭하면 test가 **한 번** 찍힘

#### 이유

- JavaScript는 함수로 레퍼런스를 갖는 객체
- **동일한 레퍼런스를 갖은 이벤트 핸들러가 여러 번 등록된다면 중복 처리되어 하나만 남게 됨**
- 그러므로 첫 번째 코드에서 익명 함수는 모두 새로운 객체가 생성되어 바인딩
  - 각각의 익명 함수는 고유한 레퍼런스를 가지기 때문에 서로 다른 레퍼런스를 가지므로 모두 별개로 취급되어 중복 실행
- 그러나 두 번째 코드에서는 레퍼런스가 같은 함수가 중복 등록되어 하나만 남게 되었음
  - 일반적으로 명명된 함수를 사용하는 것이 관리 측면에서 더 편리함
