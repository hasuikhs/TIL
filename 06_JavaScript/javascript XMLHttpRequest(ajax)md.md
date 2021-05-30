# XMLHttpRequest

## 1. XMLHttpRequest 객체 생성

```javascript
var xhr;
if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
} else {
    // IE5, IE6
    xhr = new ActiveXObject('Microsoft.XMLHTTP');
}
```

## 2. aJax 서버 요청

| <center>메소드</center>    | <center>설 명</center>                                       |
| -------------------------- | ------------------------------------------------------------ |
| open(method, url[, axync]) | 요청 타입 <br>method : GET, POST<br>url : 서버 위치<br>async  : true(비동기), false(동기, 기본값) |
| send()                     | 서버로 요청을 보냄(GET 방식)                                 |
| send(string)               | 서버로 요청을 보냄(POST)                                     |

### 2.1 GET 방식과 POST 방식

- GET은 멱등(Idempotent), POST는 비멱등(Non-Idempotent)
  - GET은 서버에게 동일한 요청을 여러 번 전송하더라도 동일한 응답이 돌아와야 함
    - 주로 조회를 할 때 사용
  - POST는 서버에게 동일한 요청을 여러 번 정송해도 응답은 항상 다를 가능성 존재
    - POST는 서버의 상태나 데이터를 변경시킬 때 사용

- GET 방식이 POST 방식보다 속도가 빠름
  - GET 방식의 요청은 캐싱 때문에 속도가 빠름

- GET은 POST 보다 단순하고 빠르며 대부분의 경우에 사용 가능하지만 POST 방식으로 써야하는 경우는 다음과 같음
  - 서버에 있는 **파일이나 DB를 업데이트**하는 경우
  - 서버로 **많은 양의 데이터 전송**이 필요한 경우(데이터 길이의 제한이 없음)
  
  - 사용자 정보를 서버로 전송할 때, ~~즉 보안이 필요한 경우~~
    - POST든 GET이든 보내는 데이터는 전부 클라이언트측에서 볼 수 있음
    - 단지 GET 방식은 URL에 데이터가 표시되어 별다른 노력없이 볼 수 있어서지, **보안을 생각한다면 암호화 해야함**

### 2.2 GET Request

```javascript
xhr.open('GET', 'get.php', true);
xhr.send();

// GET 방식의 요청
xhr.open('GET', 'get.php?name=test1', true);
xhr.send();
```

### 2.3 POST Request

```javascript
xhr.open('POST', 'post.php', true);
xhr.send();

// HTML 형식으로 POST 요청을 하려면, setRequestHeader()를 이용하여 HTTP 헤더 정보 입력
xhr.open('POST', 'post.php', true);
xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
xhr.send('name=test1');
```

## 3. XMLRequest readyState

- 통신 상태 값

```javascript
xhr.onreadystatechange = function(){
    if(xhr.readyState == 4 && xhr.status == 200){
        console.log(xhr.responseText);
    }
};
xhttp.open('GET', 'get.php', true);
xhttp.send();
```

- 상태 코드

  | 코 드 | <center>상 태</center> | <center>설 명</center>                                       |
  | :---: | :--------------------- | :----------------------------------------------------------- |
  |   0   | UNINITIALIZED          | XMLHttpRequest 객체를 생성하였지만, 초기화되지 않음, open() 메서드 실행 전 |
  |   1   | LOADING                | XMLHttpRequest 객체를 생성하였고, open() 메서드 수행하였지만, send() 메서드 실행 전 |
  |   2   | LOADED                 | send() 메서드를 수행하였지만, 서버가 처리를 준비하고 있는 상태 |
  |   3   | INTERACTIVE            | 처리를 완료하지 않았지만, 진행 중인 상태                     |
  |   4   | COMPLETED              | 처리를 완료한 상태                                           |

- XML request Status 값

  | Number | <center>Description</center>  |
  | :----: | :---------------------------- |
  |  100   | Continue                      |
  |  101   | Switching protocols           |
  |  200   | OK                            |
  |  201   | Created                       |
  |  202   | Accepted                      |
  |  203   | Non-Authoritative Information |
  |  204   | No Content                    |
  |  205   | Reset Content                 |
  |  206   | Partial Content               |
  |  300   | Multiple Choices              |
  |  301   | Moved Permanently             |
  |  302   | Found                         |
  |  303   | See Other                     |
  |  304   | Not Modified                  |
  |  305   | Use Proxy                     |
  |  307   | Temporary Redirect            |
  |  400   | Bad Request                   |
  |  401   | Unauthorized                  |
  |  402   | Payment Required              |
  |  403   | Forbidden                     |
  |  404   | Not Found                     |
  |  405   | Method Not Allowed            |
  |  406   | Not Acceptable                |
  |  407   | Proxy Authentication Required |
  |  408   | Request Timeout               |
  |  409   | Conflict                      |
  |  410   | Gone                          |
  |  411   | Length Required               |
  |  412   | Precondition Failed           |
  |  413   | Request Entity Too Large      |
  |  414   | Request-URI Too Long          |
  |  415   | Unsupported Media Type        |
  |  416   | Requested Range Not Suitable  |
  |  417   | Expectation Failed            |
  |  500   | Internal Server Error         |
  |  501   | Not Implemented               |
  |  502   | Bad Gateway                   |
  |  503   | Service Unavailable           |
  |  504   | Gateway Timeout               |
  |  505   | HTTP Version Not Supported    |

## 4. aJax 서버 응답

- 서버로부터 응답을 받기 위해서는 `responseText` 또는 `responseXML` 속성 사용
  - responseText : 응답 데이터를 string으로 받음
  
    ```javascript
    xhr.responseText;
    ```
  
  - responseXML : 응답 데이터를 XML로 받음
  
    ```javascript
    xhr.responseXML;
    ```

## 5. aJax 이벤트

- onreadystatechange

  - XMLHttpRequest 객체는 상태정보르 가지고 있는데, readyState 속성이 그 값을 가짐
  - readyState가 변할 때마다 발생하는 이벤트가 onreadystatechange
  - **onreadystatechange 이벤트는 한번의 요청을 할때마다 총 5번 발생** (3.의 상태 코드 참조)

  ```javascript
  xhr.onreadystatechange = function(){
      if(xhr.readyState == 4 && xhr.status == 200){
          console.log(xhr.responseText);
      }
  };
  ```

  

