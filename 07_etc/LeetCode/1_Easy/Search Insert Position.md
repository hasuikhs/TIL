# Search Insert Position

- 숫자 배열과 타겟 숫자가 주어짐
- 숫자 배열안에 타겟의 숫자가 있으면 해당 인덱스를 반환
- 없으면 해당 숫자가 들어갈 위치의 인덱스를 반환

```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function(nums, target) {
    for (var i = 0; i < nums.length; i++) {
        if (nums[i] == target || nums[i] > target) {
            return i;
        }
    }
    
    return nums.length;
};
```

