// Object -> String
const jsonData = JSON.stringify({   // JSON -> String
    도현 : '합기도',
    혁진 : '감자',
})
console.log(jsonData)
console.log(typeof jsonData)

// String -> Object
const parseData = JSON.parse(jsonData)
console.log(parseData)
console.log(typeof parseData)

/*
    [Object vs JSON 간단정리]
    - Object : JavaScript의 Key-Value 페어의 자료구조
    - JSON : 데이터를 표현하기 위한 단순 문자열(string)
*/