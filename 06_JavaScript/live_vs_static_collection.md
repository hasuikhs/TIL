# Live Collection vs Static Collection

- DOM의 여러 요소들을 가져오는 방법에는 여러가지 존재

  ```html
  <ul class="list">
      <li>1번</li>
      <li>2번</li>
      <li>3번</li>
  </ul>
  ```

  ```javascript
  var li1 = document.querySelectorAll('.list li');
  
  var li2 = document.querySelector('.list');
  ```

  - 첫번째 `li1`을 출력하면 NodeList 객체로 출력되고, 두번쨰 `li2`를 출력하면 HTMLCollection으로 반환됨

- **NodeList**
  - NodeList는 `element.childNodes`나 `document.querySelectorAll()`과 같은 메소드에 의해 반환
  - 마치 Array와 비슷하게 생겼지만 배열과는 다른데 이것을 **유사 배열**이라 함
  - 배열이 아니기 때문에 **배열에 사용 가능한 메소드를 대부분 사용 불가능**
    - 배열 메소드를 사용하기 위해서는 NodeList를 실제 배열로 변환하는 등의 방법을 사용해야 함
    - 최신 브라우저에서는 `forEach()` 같은 메소드를 지원함, `map()`, `reduce()`는 사용 불가능
  - 중요한 점은 대부분의 NodeList는 **Live Collection** 으로 DOM의 변경 사항을 실시간으로 반영
  - 하지만 `document.querySelectorAll()`는 **Static Collection**으로 DOM의 변경 사항이 실시간으로 반영되지 않음
    - Collection 생성된 시점의 DOM 상태를 반영하며, 이후 DOM의 변경 사항이 반영되지 않음
    - 때문에 DOM이 **자주 변경되지 않는 경우 이 메소드를 사용하는 것이 성능상 이점**을 가짐
  
- **HTMLElement**

  - 모든 종류의 HTML 요소
  - `document.getElementById()` 와 같은 메소드에 의해 반환
  - 즉, 실행 결과가 하나인 경우에 HTMLElement

- **HTMLCollection**
  
  - HTMLCollection은 요소의 문서 내 순서대로 정렬된 일반 Collection
  - NodeList와 같은 **유사 배열**
  - 현대적인 DOM 이전 세대부터 사용하던 구성요소
  - `document.getElementsByClassName()`, `document.getElementsByTagName()` 과 같은 메소드에 의해 반환
  - 즉, 실행 결과가 여럿인 경우 HTMLCollection
  - HTMLCollection은 모두 문서가 바뀔 때 **실시간으로 반영되는 Live Collection**
    - Collection 요소를 순회하며 요소를 변경하거나 제거할 때 실시간으로 업데이트되므로 예상치 못한 동작 발생 가능
  
- **Node Collection이 Live인지 Static이지 생각하지 않고 DOM 조작시 , 생각한 대로 동작하지 않는 경우가 존재하므로 주의 필요**