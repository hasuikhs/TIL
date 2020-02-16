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

  ```
  ${"p"}.hide();
  ```

- .class 선택자

  ```html
  <body>
      <p class="menu">1. 구입</p>
  </body>
  ```

  ```
  $(".menu").slideup();
  ```

- #id 선택자

  ```html
  <body>
      <p id="check">문단입니다.</p>
  </body>
  ```

  ```
  $("#check").show();
  ```

- 그 외 선택자

  ```
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

  ```
  $.get(URL, callback);	// 서버로부터 로드를 원하는 URL, get()이 완료뒨 후 호출되는 함수
  ```

- 예

  ```html
  $("button").click(function(){
    	$.get("test.jsp", function(data, status){
    		alert("데이터: " + data + "상태: " + status);
    	});
  });
  ```


#### 2.1.2 post()

- 기본 형식

  ```
  $.post(URL, data, callback);
  // get 형태와 비슷하지만 request 요청과 함께 보내지는 key/value 형태로 data를 보낸다.
  ```

- 예

  ```
  $("button").click(function(){
  	$.post("test.jsp", { name:"hong", age:"21" }, function(data, status){
  		alert("데이터: " + data + "상태: " + stauts);
  	})
  });
  ```

#### 2.1.3 ajax()

- 형식

  ```
  $.ajax({
      url: "",			// 요청 url을 의미한다.
      type: "",			// 데이터 전송방식. GET 또는 POST
      cache: ,			// 요청 페이지의 캐시 여부. false 또는 true
      dataType: "",		// 받아올 데이터를 어떤 형태로 해석할 것인지. 
      					// xml, json, html, script를 선택할 수 있다.
  
      data: "",			// 서버로 데이터를 전송할 때 사용한다. "name="+name 이런 형태로
      success: function(data){	// ajax 성공 시 실행되는 이벤트
    		// 성공시
      },
      error: function (request, status, error){	// 실패 시 실행되는 이벤트       
  		// 에러시
      }
  });
  ```

  

## 3. JSON(JavaScript Object Notation)

### 3.1 JSON ?

- JSON은 경량의 data-교환 형식
- JavaScript에서 객체를 만들 때 사용하는 표현식을 의미
- 특정 언어에 종속되지 않음

### 3.2 형식

#### 3.2.1 name-value 형식의 쌍(pair)

```
{
	"name" : "kim",
	"phone" : "01012345678"
}
```

#### 3.2.2 값들의 순서화된 리스트 형식

```
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