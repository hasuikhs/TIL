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
  - 중요한 점은 대부분의 NodeList는 **Live Collection** 으로 DOM의 변경 사항을 실시간으로 반영
  - 하지만 `document.querySelectorAll()`는 **Static Collection**으로 DOM의 변경 사항이 실시간으로 반영되지 않음

- **HTMLCollection**
  - HTMLCollection은 요소의 문서 내 순서대로 정렬된 일반 Collection
  - NodeList와 같은 **유사 배열**
  - 현대적인 DOM 이전 세대부터 사용하던 구성요소
  - `document.getElementsByClassName()`, `document.getElementsByTag`Name() 과 같은 메소드에 의해 반환
  - HTMLCollection은 모두 문서가 바뀔 때 실시간으로 반영되는 **Live Collection**
  
- **Node Collection이 Live인지 Static이지 생각하지 않고 DOM 조작시 , 생각한 대로 동작하는 경우가 존재하므로 주의 필요**