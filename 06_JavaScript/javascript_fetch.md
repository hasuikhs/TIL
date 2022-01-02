# Fetch

- fetch 함수는 기본적으로 url을 파라미터로 받고 Promise 형태로 처리
- fetch로부터 반환되는 Promise 객체는 HTTP error 상태를 reject하지 않음
  - 때문에 http 요청 중 에러가 발생해도 Promise의 catch로 떨어지지 않음
  - 요청이 성공했는지 확인하려면 response의 ok를 체크해야함

## 1. GET

- parameter를 전송할 경우

  - 방법 1
  
    ```javascript
    var url = new URL(window.location.origin + API_URL);
    var data = getParameter();
    
    Object.keys(data).forEach(key => 
    	url.searchParams.append(key, data[key])
    );
    
    fetch(url, {
        method: 'GET'	// default 'GET'
        headers: {
        	'header1': 'HEADER_VALUE'
    	}
    }).then(response => {
    	if (!response.ok)    {
        	throw new Error('http error');
    	}
    	return response.json();
    }).then(data => {
    	// data 처리 code
    }).catch(error =>
    	console.error('Error: ', error)
    );
    ```
    
  - 방법 2
  
    ```javascript
    fetch(API_URL? + new URLSearchParams({	// API_URL 후에 쿼리스트링을 넣기 위해서 '?' 추가
        param1: param1,
        param2: parma2,
        // ...
    }), {
        method: 'GET',
        headers: {
            'header1': 'HEADER_VALUE'
        }
    }).then(response => {
    	if (!response.ok)    {
        	throw new Error('http error');
    	}
    	return response.json();
    }).then(data => {
        // data 처리 code
    }).catch(error =>
    	console.log('Error: ', error)
    )
    ```

- async ~ await

  ```javascript
  const request = async () => {
  	try {
      	let res = await fetch(url);
       	
        	if (!res.ok) {
  	    	throw new Error('http error');
  		}
  
          return await res.json();
      } catch(e) {
          throw new Error(`${e}`);
      }    
  }
  ```

## 2. POST

```javascript
fetch(url, {
    method: 'POST',
    headers: {
        'header1': 'HEADER_VALUE'
    },
    body: {
        'param1': 'param_value1',
        'param2': 'param_value2',
		// ...
    }
}).then(response => {
	if (!response.ok)    {
    	throw new Error('http error');
	}
	return response.json();
}).then(data => {
    // data 처리 code
}).catch(error =>
	console.error('Error: ', error)
);
```

