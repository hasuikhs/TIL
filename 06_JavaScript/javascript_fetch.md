# Fetch

## 1. GET

- parameter를 전송할 경우

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

