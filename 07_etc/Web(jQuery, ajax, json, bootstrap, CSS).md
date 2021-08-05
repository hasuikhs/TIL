# Web 기술

## 1. jQuery

### 1.1 jQuery ?

- HTML의 조작을 단순화 하도록 설계된 자바스크립트 라이브러리
- HTML 문서에서 특정 요소를 쉽게 찾기, 변경 가능하다.
- 이벤트를 쉽게 처리할 수 있다.
- 네트워크를 통하여 새로운 콘텐츠를 쉽게 가져올 수 있다.(ajax, JSON)

### 1.2 적용

- HTML의 head 부분에 CDN을 넣어준다.

  ```html
  <head>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
  </head>
  ```

#### 1.2.1 선택자

- 타입 선택자

  ```html
  <body>
      <p>이것은 문단</p>
  </body>
  ```

  ```javascript
  ${"p"}.hide();
  ```

- .class 선택자

  ```html
  <body>
      <p class="menu">1. 구입</p>
  </body>
  ```

  ```javascript
  $(".menu").slideup();
  ```

- #id 선택자

  ```html
  <body>
      <p id="check">문단입니다.</p>
  </body>
  ```

  ```javascript
  $("#check").show();
  ```

- 그 외 선택자

  ```javascript
  $("*") 	// 모든 요소 선택
  $(this)	// 현재 요소 선택
  $("p.myclass")	// <p> 요소 중 class가 "myclass"인 요소
  $("p:first")	// 첫 번째 <p> 요소
  $("div span")	// <div> 안에 포함된 <span> 요소
  $(":button")	// 버튼과 버튼 타입 요소를 모두 선택
  				// 즉, <button></button> 혹은 <input type="button" /> 모두 선택
  ```

## 2. ajax

- 클라이언트가 서버와 적은 양의 데이터를 교환하여 **비동기적**으로 HTML 페이지를 업데이트 가능케 한다.
- 기존의 웹 브라우저는 서버로부터 **페이지 단위**로만 받을 수 있지만 **ajax는 XML 파일 조각 단위**로 받는다.
  - 전체 페이지를 다시 로드하지 않아도 된다.

### 2.1 jQuery를 이용한 ajax

#### 2.1.1 get()

- 기본 형식

  ```javascript
  $.get(URL, data, callback);	// 서버로부터 로드를 원하는 URL, get()이 완료뒨 후 호출되는 함수
  ```

- 예

  ```javascript
  $("button").click(function(){
    	$.get("test.jsp", { name:"hong", age:"21" }, function(data, status){
    		alert("데이터: " + data + "상태: " + status);
    	});
  });
  ```


#### 2.1.2 post()

- 기본 형식

  ```javascript
  $.post(URL, data, callback);
  // get 형태와 비슷하지만 request 요청과 함께 보내지는 key/value 형태로 data를 보낸다.
  ```

- 예

  ```javascript
  $("button").click(function(){
  	$.post("test.jsp", { name:"hong", age:"21" }, function(data, status){
  		alert("데이터: " + data + "상태: " + stauts);
  	})
  });
  ```

#### 2.1.3 ajax()

- 형식

  ```javascript
  $.ajax({
      url: "",			// 요청 url을 의미한다.
      type: "",			// 데이터 전송방식. GET 또는 POST
      cache: ,			// 요청 페이지의 캐시 여부. false 또는 true
      dataType: "",		// 받아올 데이터를 어떤 형태로 해석할 것인지. 
      					// xml, json, html, script를 선택할 수 있다.
  
      data: "",			// 서버로 데이터를 전송할 때 사용한다. "name="+name 이런 형태로
  })
  .done(function(data) {
      // ajax 성공 시 실행되는 이벤트
  })
  .fail(function(requeat, status, error) {
      // ajax 실패시 실행되는 이벤트
      // status 상태, error 에러명
  })
  .always(function(xhr, status) {
      // 성공, 실패 상관없이 항상 실행되는 이벤트
  })
  ```



## 3. JSON(JavaScript Object Notation)

### 3.1 JSON ?

- JSON은 경량의 data-교환 형식
- JavaScript에서 객체를 만들 때 사용하는 표현식을 의미
- 특정 언어에 종속되지 않음

### 3.2 형식

#### 3.2.1 name-value 형식의 쌍(pair)

```json
{
	"name" : "kim",
	"phone" : "01012345678"
}
```

#### 3.2.2 값들의 순서화된 리스트 형식

```json
{
	"name" : "kim",
	"hobby" : ["요리", "수영"]
}
```

### 3.3 GSON

- JSON의 자바 오브젝트의 직렬화, 역직렬화를 해주는 오픈 소스 자바 라이브러리

- 메이븐에 추가하여 사용한다.

  ```xml
  <dependency>
  	<groupId>com.google.code.gson</groupId>
  	 <artifactId>gson</artifactId>
  	 <version>2.8.0</version>
  </dependency>
  ```

#### 3.3.1 객체를 json으로 만들자.

- `Person`이라는 객체가 있다면 이를 json으로 변경해보자.

```
@Data
public class Person {
	private String name;
	private int age;
	private String gender;
}
import com.google.gson.Gson;

@Test
public void 객체를_JSON으로_변경() {
	Person person = new Person();
	person.setName("kim");
	person.setAge(20);
	person.setGender("M");
	Gson gson = new Gson();
	String json = gson.toJson(person);
	System.out.println(json);
}
```

- `Gson gson = new Gson();` 로 인스턴스를 만들고 `String json = gson.toJson(person);` 으로 처리하면 바로 json 이 만들어진다.

#### 3.3.2 json 을 직접 만들어보자

- 이번에는 직접 json을 만들어본다. gson에서 제공하는 `JsonObject`를 이용해야한다.

```
import com.google.gson.Gson;
import com.google.gson.JsonObject;

@Test
public void 단순_JSON_만들기() {
	Gson gson = new Gson();
	JsonObject object = new JsonObject();
	object.addProperty("name", "park");
	object.addProperty("age", 22);
	object.addProperty("success", true);
	String json = gson.toJson(object);
	System.out.println(json);
}
```

- `JsonObject`를 만들고 `addProperty()` 메소드를 이용해서 만들어주고 마지막으로 `gson.toJson()`으로 처리해주면 된다.

#### 3.3.3 json을 파싱해보자

- 이번에는 json을 직접 파싱해보자.

```
import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;

@Test
public void 문자열_JSON을_파싱() {
	String json = "{\"name\":\"kim\",\"age\":20,\"gender\":\"M\"}";
	JsonParser parser = new JsonParser();
	JsonElement element = parser.parse(json);
	String name = element.getAsJsonObject().get("name").getAsString();
	System.out.println("name = "+name);
	int age = element.getAsJsonObject().get("age").getAsInt();
	System.out.println("age = "+age);		
}
```

- gson에서 제공하는 `JsonParser`, `JsonElement`를 이용하면 된다.  `getAsJsonObject`를 이용해서 원하는 타입을 이용해서 값을 받아오면 된다.

#### 3.3.4. json을 객체로 변환하자.

- json형태로 되어 있는 문자열을 바로 객체로 변환해보자.

```
	@Test
	public void JSON문자열을_객체로() {
        String json = "{\"name\":\"kim\",\"age\":20,\"gender\":\"M\"}";
        Gson gson = new Gson();
        Person person = gson.fromJson(json, Person.class);

        System.out.println("name = " + person.getName());
        System.out.println("age = " + person.getAge());
        System.out.println("gender = " + person.getGender());
	}
```

## 4. bootstrap

### 4.1 bootstrap ?

- 프론트엔드 개발을 빠르고 쉽게 할 수 있는 프레임워크
- HTML과 CSS 기반의 템플릿 양식 , 버튼, 네비게이션 및 기타 페이지를 구성하는 요소 포함
- 자바스크립트를 선택적으로 확장 가능
- GitHub의 오픈 소스로 사용 가능, 상업적 이용 가능

### 4.2 시작하기

- [부트스트랩 시작하기](https://getbootstrap.com/docs/4.4/getting-started/introduction/)

- CDN으로 바로 시작하기

  ```html
  <!doctype html>
  <html lang="en">
    <head>
      <!-- Required meta tags -->
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  
      <!-- Bootstrap CSS -->
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
  
      <title>Hello, world!</title>
    </head>
    <body>
      <h1>Hello, world!</h1>
  
      <!-- Optional JavaScript -->
      <!-- jQuery first, then Popper.js, then Bootstrap JS -->
      <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
      <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
      <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
    </body>
  ```

- 부트스트랩 사이트에 가서 왼쪽의 사이드바에서 자신이 필요한 부분을 사용하자.

### 4.3 그리드 시스템

- 부트스트랩은 layout과 content  정렬을 위한 그리드 시스템 제공

- `container`, `row`, `column` 기본 사용법

  ```html
  <div class="container">
      <div class="row">
          <div class="col-4">col1</div>
          <div class="col-4">col2</div>
          <div class="col-4">col3</div>
      </div>
  </div>
  ```

  - `container`
    - ``container`가 감싸고 있는 contents를 가운데 정렬해줌
    - 반응형으로 width를 지정하고 싶을 경우 `.container`
    - width를 화면의 100%로 지정하고 싶을 경우 `.container-fluid`
  - `row`
    - `column`을 감싸는 역할
  - `column`
    - `row`에 들어가는 각각의 content
    - **1개의 `row`를 가로로 12칸으로 나눴을 때 몇 칸을 차지할 것인지를 지정**

- 화면의 크기에 따라 가로 사이즈가 달라지도록 옵션 추가 가능

  |                         | Extra small |  Small   |  Medium  |  Large   | Extra large |
  | :---------------------: | :---------: | :------: | :------: | :------: | :---------: |
  | **Max container width** | None (auto) |  540px   |  720px   |  960px   |   1140px    |
  |    **Class prefix**     |    .col-    | .col-sm- | .col-md- | .col-lg- |   .col-xl   |


## 5. CSS

### 5.1 Media Query

- 기기의 유형과 , 어떤 특성이나 수치(화면 해상도, 뷰포트 너비 등)에 따라 웹 사이트나 앱의 스타일을 수정할 때 유용

- **기본 문법**

  - 프로그래밍 언어의 `if`문과 비슷함

  ```css
  @media all (조건) {
  	/* 스타일 */
  }
  ```

  - 미디어 타입

    - `all`
      - 모든 장치에 적용

    - `print`

      - 페이지가 인쇄된 경우에만 설정하고, 페이지가 브라우저에 로드될 때에는 적용되지 않음

      ```css
      @media print {
         /* 스타일 */
      }
      ```

    - `screen`

      - 화면을 출력하는 디스플레이가 있는 미디어

### 5.2 CSS Query

#### 5.2.1 전체 선택자

```css
* {
    /* 스타일 */
}
```

- 전체 선택자는 HTML 페이지 내부의 모든 요소에 같은 CSS 속성을 적용함
- 그렇기 때문에 기본값을 정해둘 때 사용함
- 문서 안의 모든 요소를 읽어내려야 하기 때문에 페이지 로딩 속도 저하 가능성이 있으므로 자주 사용하지 않는 것이 좋음

#### 5.2.2 태그 선택자

```css
p {
    /* 스타일 */
}
```

- 태그 선택자는 HTML 요소를 직접 지칭하는 가장 간단한 선택자

#### 5.2.3 클래스 선택자

```css
.class {
    /* 스타일 */
}
div.class {
    /* 스타일 */
}
```

- 클래스 선택자는 주어진 값을 class 속성값으로 가진 HTML 요소를 찾아 선택함
- 선택하려는 속성값 앞에 `.`를 추가해 작성
- 두번째 스타일 규칙처럼 `.` 앞에 태그를 붙여주면 범위를 해당 태그에 한함

#### 5.2.4 ID 선택자

```css
#id {
    /* 스타일 */
}
div#id {
    /* 스타일 */
}
```

- ID 선택자는 클래스 선택자와 다르게 `#`을 사용함

#### 5.2.5 복합 선택자

```css
/* 하위 선택자 */
div table {
    /* 스타일 */
}
/* 자식 선택자 */
div > table {
    /* 스타일 */
}
```

- 복합 선택자는 두 개 이상의 선택자 요소가 모인 선택자
- **하위 선택자는 부모 요소에 포함된 모든 하위 요소에 스타일을 적용**
- **자식 선택자는 부모의 바로 아래 자식 요소에만 적용**

```css
/* 인접 형제 선택자 */
div+table {
    /* 스타일 */
}
/* 일반 형제 선택자 */
div~table {
    /* 스타일 */
}
```

- 같은 부모 요소를 가지는 요소들을 형제 관계라고 함
- 먼저 나오는 요소를 **형 요소** 나중에 나오는 요소를 **동생 요소**라고 함 먼저 나온다는 것은 HTML 문서에 먼저 쓰여지는 것을 말함
- 즉, 같은 레벨의 요소에서 조건이 충족됨
  - 인접 형제 선택자는 형 요소 바로 뒤에 나오는 요소
  - 일반 형제 선택자는 형 요소 뒤에 나오는 **요소들**

#### 5.2.6 속성 선택자

- 태그 안의 특정 속성들을 선택

| 패턴            | 의미                                                         |
| --------------- | ------------------------------------------------------------ |
| E[attr]         | attr 속성이 포함된 요소 E를 선택                             |
| E[attr="val"]   | attr 속성의 값이 정확하게 'val'과 일치하는 요소 E를 선택     |
| E[attr~="val"]  | attr 속성의 값에 'val'이 포함되는 요소 선택                  |
| E[attr^="val"]  | attr 속성의 값이 'val'으로 시작하는 요소 선택                |
| E[attr$="val"]  | attr 속성의 값이 'val'으로 끝나는 요소 선택                  |
| E[attr*="val"]  | attr 속성의 값에 'val'이 포함되는 요소 선택                  |
| E[attr\|="val"] | attr 속성의 값이 정확하게 'val' 이거나 'val'으로 시작되는 요소 E를 선택 |

### 5.3 우선 순위 높이기

- CSS를 사용하다 보면 `!important`를 사용 했음에도 우선순위가 밀리는 경우가 있음

  ```html
  <table>
  	<thead>
      	<th>th1</th>
          <th>th2</th>
      </thead>
      <tbody>
      	<tr>
          	<td>td1</td>
              <td>td2</td>
          </tr>
      </tbody>
  </table>
  ```

  ```css
  /* 시도한 css */
  td {
      background-color: #EAEAEA !important;
  }
  ```

  - 당연히 스타일이 먹었을거라 생각했지만 우선순위가 밀려서 적용되지 않는 것을 확인하였음

- 위와 같은 경우에는 css의 우선순위를 높여주는 방법을 사용함

- 우선순위를 높이기 위해서는 부모 태그를 써주고 우선순위를 더 높이려면 부모의 부모를 써주는 식으로 순위를 높일 수 있음

- 즉 부모가 더 많은 쿼리가 우선순위가 높음

  ```css
  tr > td {
      background-color: #EAEAEA !important;
  }
  ```

  - `tr > td` < `tbody > tr > td` < `table > tbody > tr > td` 이런식으로 높일 수 있음
