# jQuery 요소 조작

> 브라우저의 개발자 도구의 element에서 원하는 element를 선택후 우클릭후 js selector로 복사하면 바로 jQuery로 접근 가능하다.

## 1. 요소의 추가

### 1.1 기존 요소의 내부에 추가

#### 1.1.1 .append()

- 요소의 마지막에 새로운 요소나 콘텐츠를 추가

  ```javascript
  $('#list').append("<li>새로 추가된 아이템</li>")
  ```

#### 1.1.2 .prepend()

- 요소의 처음에 새로운 요소나 콘텐츠를 추가

  ```javascript
  $('#list').prepend("<li>새로 추가된 아이템</li>")
  ```

#### 1.1.3 .appendTo()

- 선택한 요소를 해당 요소의 마지막에 삽입

- .append() 메소드와 같지만, 소스와 타겟의 위치가 반대

  ```javascript
  $('#firstItem').appendTo('#list')
  ```

#### 1.1.4 .prependTo()

- 선택한 요소를 해당 요소의 처음에 삽입

- .prepend() 메소드와 같지만, 소스와 타겟의 위치가 반대

  ```javascript
  $('<b>새로 추가된 콘텐츠</b>').prependTo('.item')
  ```

### 1.2 기존 요소의 외부에 추가

#### 1.2.1 .before()

- 선택한 요소의 바로 앞에 새로운 요소나 콘텐츠를 추가

  ```javascript
  $('#firstRow').before('<tr><td>새로운 행</td></tr>')
  ```

#### 1.2.2 .after()

- 선택한 요소의 바로 뒤에 새로운 요소나 콘텐츠를 추가

  ```javascript
  $('#firstRow').after('<tr><td>새로운 행</td></tr>')
  ```

#### 1.2.3 .insertBefore()

- 선택한 요소를 해당 요소의 앞에 삽입

  ```javascript
  $('<td>새로운 열</td>').insertBefore('#column')
  ```

#### 1.2.4 .insertAfter()

- 선택한 요소를 해당 요소의 뒤에 삽입

  ```javascript
  $('<td>새로운 열</td>').insertAfter('#column')
  ```

### 1.3 기존 요소를 포함하는 요소 추가

#### 1.3.1 .wrap()

- 선택한 요소를 포함하는 새로운 요소를 추가

  ```javascript
  // class가 'content'인 각 요소를 포함하는 새로운 요소 추가
  $('.content').wrap('<div class="wrapper"></div>')
  ```

#### 1.3.2 .wrapAll()

- 선택한 모든 요소를 포함하는 새로운 요소를 추가

  ```javascript
  // class가 "content"인 모든 요소를 포함하는 새로운 요소를 추가함.
  $('.content').wrapAll('div class="wrapper"></div>')
  ```

#### 1.3.3 .wrapInner()

- 선택한 요소에 포함되는 새로운 요소 추가

  ```javascript
  // class가 "content"인 각 요소에 포함되는 새로운 요소를 추가
  $('.content').wrapInner('<div class="wrapper"></div>')
  ```


## 2. 요소의 복사 및 삭제

### 2.1 요소의 복사

#### 2.1.1 .clone()

- 선택한 요소를 복사하여 새로운 요소를 생성

- 복사하지 않고 사용하면 기존의 HTML 요소에 영향

  ```javascript
  $('#firstItem').clone().appendTo('#list')
  ```

### 2.2 요소의 대체

- 선택한 요소나 콘텐츠를 지정된 요소나 콘텐츠로 대체

#### 2.2.1 .replaceAll()

- 선택한 요소를 지정된 요소로 대체

  ```javascript
  // class가 'item'인 각 요소를 id가 'firstItem'인 요소로 대체
  $('#firstItem').replaceAll('.item')
  ```

#### 2.2.2 .replaceWith()

- 선택한 요소를 지정된 요소로 대체

- .replaceAll()과 비슷하지만, 소스와 타겟의 위치가 반대

  ```javascript
  // class가 'item'인 모든 요소를 id가 'firstItem'인 요소로 대체
  $('.item').replaceWith('#firstItem')
  ```

### 2.3 요소의 삭제

#### 2.3.1 .remove()

- 선택한 요소를 DOM 트리에서 삭제

- 이때 삭제되는 요소와 연관된 jQuery 데이터나 이벤트도 모두 함께 삭제

  ```javascript
  // class가 'content'인 요소 중에서 class가 각각 'first', 'second' 요소 모두 삭제
  $('.content').remove('.first, .second')
  ```

#### 2.3.2 .detach()

- 선택한 요소를 DOM 트리에서삭제

- .remove()와는 달리 연관된 데이터나 이벤트는 삭제되지 않음

  ```javascript
  $('.content').detach()
  ```

#### 2.3.3 .empty()

- 선택한 요소의 자식 요소를 모두 삭제

- .remove()나 .detach()와 달리 선택된 요소 그 자체는 삭제되지 않음

  ```javascript
  $('#container').empty()
  ```

#### 2.3.4 .unwrap()

- 부모의 요소를 삭제

  ```javascript
  $('span').upwrap()
  ```

  