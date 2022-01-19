# Event

## 1. event.target vs event.currentTarget

- javascript의 이벤트 중 클릭한 요소를 가졍는 방법으로 event 객체의 target 또는 currentTarget 프로퍼티를 사용
- event.target은 이벤트 버블링의 가장 마지막에 위치한 최하의 요소 반환
- event.currentTarget의 경우 이벤트가 바인딩된 요소, 해당하는 요소 반환

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

- event.target은 클릭된 span 태그 반환
- event.currentTarget은 이벤트가 바인딩된 div 요소 반환
- 하위 구조가 복잡해 지는 경우 event.target 만으로는 어떤 요소가 클릭되어 반환되어야 하는지 결과가 달라질 가능성 존재하므로 이런 경우에는 event.currentTarget을 활용


## 2. event.target을 이용한 event delegation과 이벤트 버블링

> - 한번에 여러개에 이벤트를 걸려면 지금 아는 방법은 document.querySelectorAll을 사용 각 요소들을 for문을 돌려 이벤트 설정
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

- event.target을 이용하여 해당 클릭 이벤트가 발생한 element를 잡음

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

