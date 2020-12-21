# Event Propagation

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