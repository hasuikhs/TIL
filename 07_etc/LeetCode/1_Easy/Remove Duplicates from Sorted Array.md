# Remove Duplicates from Sorted Array

- 오름차순으로 정렬된 숫자 배열을 제공
- 중복되는 요소를 제거하고,  제거될때마다의 배열의 길이를 반환
- 메모리는 할당되지 않아야하여, 새로 변수를 선언할 수 없음

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    for (var i = 1; i < nums.length; i++) {
        if (nums[i] == nums[i - 1]) {
            nums.splice(i, 1);
            i--;
        }
    }
    return nums.length;
};
```

