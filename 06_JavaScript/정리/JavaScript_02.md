# JavaScript_02

## 1. DOM(문서 객체 모델)

### 1.1 DOM?

- **D(Document)**
- DOM은 문서가 없으면 움직이지 않음
	- 웹 문서를 만들어 웹 브라우저에 띄우는 순간 작성한 문서가 객체로 바뀜
	
- **O(Object)**

	- 객체란 자기 자신을 포함하는 데이터 묶음
	- 프로퍼티 : 객체에 포함된 변수
	- 메소드 : 객체에 의해 실행되는 함수

- **M(Model)**
- 웹 브라우저 창 안에서 읽은 웹 문서를 나타내주는 것

### 1.2 DOM 구조

- **DOM은 트리 구조**로 이루어져 있음

  <img src="JavaScript_02.assets/image-20200428154758214.png" alt="image-20200428154758214" style="zoom: 80%;" />

- **요소 노드**
  
- 태그로 구성된 요소
  
- **텍스트 노드**
  - 요소 노드에 들어있는 내용
  - 모든 요소가 텍스트 노드를 포함하지는 않음

- **속성 노드**
  
  - 요소에 대한 좀더 정확한  정보를 표현할 때 사용
  - 모든 요소는 속성을 포함하진 않지만, 모든 속성은 요소 안에 포함

<img src="JavaScript_02.assets/image-20200428161455195.png" alt="image-20200428161455195" style="zoom:50%;" />

### 1.3 DOM 기본 제어  메소드

- **`getElementById(arg)`**

  - 특정 아이디 속성을 가진 요소에 접근 가능한 메소드

  ```html
  <p id="p1">
      이것은 p1
  </p>
  ```

  ```javascript
  document.getElementById("p1")
  ```

- **`getElementsByTagName(arg)`**

  - 특정 태그를 사용하는 요소들을 배열로서 접근 가능한 메소드

  ```html
  <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
  </ul>
  ```

  ```javascript
  document.getElementsByTagName("li")
  ```

- **`getElementsByClassName(arg)`**

  - 특정 클래스 속성을 가진 요소들에 접근 가능한 메소드

  ```html
  <ul>
      <li class="c1">1</li>
      <li class="c1">2</li>
      <li class="c2">3</li>
  </ul>
  ```

  ```javascript
  document.getElementsByClassName("c1")
  ```

- **`getAttribute(arg)`**

  - 요소의 속성의 정보를 가져오는 메소드

  ```html
  <ul>
      <li class="c1">1</li>
      <li class="c1">2</li>
      <li class="c2">3</li>
      <li>사</li>
  </ul>
  ```

  ```javascript
  let arr = document.getElementsByTagName("li")
  
  for (let i = 0; i < arr.length; i++) {
      alert(arr[i].getAttribute("class"))
  }
  ```

- **setAttribute(attribute, value)**

  - 요소의 속성의 정보를 바꿀 수 있는 메소드
  - 첫번째 인자는 바꾸고 싶은 속성, 두 번째 인자는 바꿀 값

  ```html
  <ul>
      <li class="c1">1</li>
      <li class="c1">2</li>
      <li class="c2">3</li>
      <li>사</li>
  </ul>
  ```

  ```javascript
  let arr = document.getElementsByTagName("li")
  
  arr[0].setAttribute("class", "c2")
  ```


## 2. 이벤트

### 2.1 이벤트란?

- 사용자와 웹 페이지 간의 상호작용
- 이벤트가 발생했다는 것은 웹 페이지에서 특정 동작이 발생하여, 브라우저가 그 사실을 알려주는 것을 의미

### 2.2 이벤트 핸들러

- 특정 요소에서 발생하는 이벤트를 처리하기 위해서는 이벤트 핸들러 함수를 작성하여 연결
- 이벤트 핸들러가 연결된 요소에서 지정된 이벤트 발생 시, 브라우저는 연결된 이벤트 핸들러를 실행

```javascript
window.onload = function() {
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

