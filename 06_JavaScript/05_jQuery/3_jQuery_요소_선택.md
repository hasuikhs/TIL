# jQuery 요소 선택

## 1. 요소 선택

- jQuery로 id로 html 태그에 접근할 때는 `#`으로 접근

- getElementById()

  ```javascript
  $('#id')
  ```

- class로 html 태그에 접근할 때는 `.`으로 접근

- getElementsByClassName()

  ```javascript
  $('.class')
  ```

- tag 이름을 사용하여 같은 tag 이름을 가지는 HTML 요소를 모두 선택

- getElementsByTagName()

  ```javascript
  $('tag')
  ```

- 속성을 사용하여 속성이 조건에 맞는 특정 HTML 요소도 선택 가능

  ```javascript
  $("img[alt='flower']")	// <img> 요소 중에서 alt 속성값이 'flower'인 요소 모두 선택
  ```

## 2. CSS 선택자

- jQuery에서는 CSS 선택자를 사용하여 HTML 요소를 선택 가능

  ```javascript
  $('요소').css('속성명', '속성값')
  ```

## 3. 선택 요소 필터링

- jQuery에서는 선택한 요소 중에서 더욱 세분화된 선택을 하기 위한 필터링을 진행

  ```html
  <ul>
      <li>첫 번째 아이템이에요!</li>
  	<li><span>두 번째</span> 아이템이에요!</li>
  	<li>세 번째 아이템이에요!</li>
  </ul>
  <button>필터링</button>
  ```

  ```javascript
  $(function() {
  	$("button").on("click", function() {
  		$("li:has(span)").text("<span>요소를 가지고 있는 아이템이에요!");
  	});
  });
  ```

- 필터링 가능 선택자

  |    선택자    |                            설 명                             |
  | :----------: | :----------------------------------------------------------: |
  |    :eq(n)    |          선택한 요소 중에서 인덱스가 n인 요소 선택           |
  |    :gt(n)    |      선택한 요소 중에서 인덱스가 n보다 큰 요소 모두선택      |
  |    :lt(n)    |    선택한 요소 중에서 인덱스가 n보다 작은 요소 모두 선택     |
  |    :even     |      선택한 요소 중에서 인덱스가 짝수인 요소 모두 선택       |
  |     :odd     |      선택한 요소 중에서 인덱스가 홀수인 요소 모두 선택       |
  |    :first    |             선택한 요소 중에서 첫번째 요소 선택              |
  |    :last     |             선택한 요소 중에서 마지막 요소 선택              |
  | :has(선택자) | 선택한 요소 주에서 지정한 선택자와 일치하는 자손 요소를 갖는 요소 모두 선택 |

  





