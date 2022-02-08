# Find Target Indices After Sorting Array

- 주어진 배열을 오름차순으로 정렬하고
- target인 값의 인덱스를 array에 넣어서 반환

```javascript
// test case 1
nums = [1, 2, 5, 2, 3], target = 2

// test case 2
nums = [1, 2, 5, 2, 3], target = 3

// test case 3
nums = [1, 2, 5, 2, 3], target = 5
```

```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var targetIndices = function(nums, target) {
    nums.sort((a, b) => a - b);
    let ret = [];

  while (nums.findIndex(value => value == target) > -1) {
    let index = nums.findIndex((value, index) => value == target);

    ret.push(index);

    nums[index] = 0;
  }

  return ret;
};
```