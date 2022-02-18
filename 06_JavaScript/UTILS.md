# UTILS

## 1. URLSearchParams

- URL 쿼리 스트링 파싱할 수 있는 유틸
- URL 전체를 분석하지는 않지만 맨 앞의 `?`는 제거함

```javascript
let params = new URLSearchParams(location.search);

params.has('data'); // true
params.get('data'); // 1

params.append('data', 3);
params.toString(); // 'data=1&name=haha&data=3'

params.set('data', 2);
params.toString(); // 'data=1&name=haha&data=2'

params.delete('data');
params.toString(); // name=haha
```

