// 숫자가 담긴 배열의 요소에 각각 2를 곱하여 새로운 배열 만들기
// ES5
var numbers = [1, 2, 3]
var doubleNumbers = []

for (var i = 0; i < numbers.length; i++){
    doubleNumbers.push(numbers[i] * 2)
}
console.log(doubleNumbers)
console.log(numbers)

// ES6+
const NUMBERS = [1, 2, 3]
const DOUBLE_NUMBERS = NUMBERS.map(function(number){
    return  number * 2
})
console.log(DOUBLE_NUMBERS)

// 화살표 함수 사용하여 한 줄로 줄이기
console.log(NUMBERS.map(number => number * 2))

// map 헬퍼를 사용해서 images 배열 안의 객체들의 height들만 저장되어 있는 heights 배열을 만들어보자.
const images = [
    { height : '34px', width : '59px'},
    { height : '11px', width : '135px'},
    { height : '381px', width : '592px'},
]

// const heights = images.map(function(image) {
//     return image.height
// })
const heights = images.map(image => image.height)

console.log(heights)
console.log(images)

// map 헬퍼를 사용해서 'distance/time => 속도'를 저장하는 새로운 배열 speeds를 만드시오.

const trips = [
    { dinstance : 34, time : 10 },
    { dinstance : 90, time : 20 },
    { dinstance : 111, time : 28 }
]

const speeds = trips.map(trip => trip.dinstance / trip.time)

console.log(speeds)