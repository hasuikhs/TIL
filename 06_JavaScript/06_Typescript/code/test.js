var numbers = [2, 1, 3, 4, 1];

function solution(numbers) {

    var answer = [];

    for (let i = 0, len = numbers.length; i < len; i++) {
        for (let j = 0; i < len; j++) {
            if (i !== j) {
                let sumNumber = numbers[i] + numbers[j];
                if (!answer.includes(sumNumber)) {
                    answer.push(sumNumber);
                }
            }
        }
    }

    return sumArr.sort((a, b) => a - b);
}

var arr = [3, 2, 6];
var divisor = 10;

arr.filter(value => value % divisor === 0).sort((a, b) => a - b).

console.log(solution(numbers))