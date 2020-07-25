# jQuery 요소 조작

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

  