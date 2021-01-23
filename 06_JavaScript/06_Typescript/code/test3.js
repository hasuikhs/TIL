var m = 4;
var v = [3, 2, 2, 2];

let existArr = [m - v[0]];

for (let i = 1; i < v.length; i++) {

    if (existArr[existArr.length - 1] < v[i]) {
        existArr.push(m - v[i]);
    } else {
        for (let j = existArr.length - 1; j >= 0; j--) {
            if (existArr[j - 1] < v[i]) {
                existArr[j - 1] -= v[i];
                break;
            }

            if (j === 0) {
                existArr[0] -= v[i];
            }
        }
    }
}

console.log(existArr)