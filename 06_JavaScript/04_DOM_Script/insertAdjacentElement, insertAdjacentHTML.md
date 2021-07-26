# insertAdjacentElement, insertAdjacentHTML

## 1. insertAdjacentElement

- Element Node 또는 Text Node 안에 원하는 Node를 삽입할 때 사용하는 함수
- jQuery의 `before()`, `after()`와 비슷함
- 문법은 `element.insertAdjacentElement(position, text)`

## 2. insertAdjacentHTML

- `innerHTML`은 Element Node에 위치 시킬 수 있지만

- `insertAdjacentElement`는 text로 만들어진 html 문자열을 바로 요소로 만들어서 삽입할 수 있음

- 문법은 `element.insertAdjacentHTML(position, text)`

  ```javascript
  var table = document.createElement('table');
  
  var str = '<tr><td>test</td></tr>';
  table.insertAdjacentHTML('beforeend', str);
  ```

| position      | 설 명                                     |
| ------------- | ----------------------------------------- |
| `beforebegin` | 타겟 Element Node 바로 앞에               |
| `afterbegin`  | 타겟 Element Node의 첫번째 Text Node 앞에 |
| `beforeend`   | 타겟 Element Node의 마지막 Text Node 뒤에 |
| `afterend`    | 타겟 Element Node 바로 뒤에               |

