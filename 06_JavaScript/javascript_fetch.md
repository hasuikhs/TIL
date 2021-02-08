# Fetch

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
    }).then(response =>
    	response.json()
    ).then(data => {
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
    }).then(response =>
    	response.json()     
    ).then(data => {
        // data 처리 code
    }).catch(error =>
    	console.log('Error: ', error)
    )
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
}).then(response =>
	response.json()
).then(data => {
    // data 처리 code
}).catch(error =>
	console.error('Error: ', error)
);
```

