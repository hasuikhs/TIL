// var n = 1;
var n = 4;

// var record = ["1 fracta", "1 sina", "1 hana", "1 robel", "1 abc", "1 sina", "1 lynn"]
var record = ["1 a", "1 b", "1 abc", "3 b", "3 a", "1 abcd", "1 abc", "1 aaa", "1 a", "1 z", "1 q", "3 k", "3 q", "3 z", "3 m", "3 b"];

let answer = [];

for (let i = 1; i <= n; i++) {

    let iServer = record.filter(value => value.includes(i));

    console.log(iServer)
    let nickList = [];
    for (let j = 0, len = iServer.length; j < len; j++) {
        if (!nickList.includes(iServer[j]) && nickList.length < 5) {
            nickList.push(iServer[j]);
        } else if (!nickList.includes(iServer[j]) && nickList.length == 5) {
            nickList.shift();
            nickList.push(iServer[j]);
        }
    }
    // console.log(nickList)
    answer = answer.concat(nickList);
}

console.log(answer)