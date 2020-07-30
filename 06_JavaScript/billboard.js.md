# billboard.js

> NAVER에서 d4 기반의 chart 오픈 소스 라이브러리 [링크](https://naver.github.io/billboard.js/)

## 1. 기본 사용

### 1.1 의존성 추가

```html
<!-- Step 1) Load D3.js -->
<script src="https://d3js.org/d3.v5.min.js"></script>

<!-- Step 2) Load billboard.js with style -->
<script src="$YOUR_PATH/billboard.js"></script>

<!-- Load with base style -->
<link rel="stylesheet" href="$YOUR_PATH/billboard.css">

<!-- Or load different theme style -->
<link rel="stylesheet" href="$YOUR_PATH/theme/insight.css">
```

### 1.2 차트 위치 지정

```html
<div id="chart"></div>
```

### 1.3 차트 그리기

```javascript
var chart = bb.generate({
    bindto: "#chart",
    data: {
        type: "bar",
        columns: [
            ["data1", 30, 200, 100, 170, 150, 250],
            ["data2", 130, 100, 140, 35, 110, 50]
        ]
    }
});
```

