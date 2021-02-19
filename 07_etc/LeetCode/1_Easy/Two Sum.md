# Two Sum

- nums 배열에서 합계가 target인 index를 배열로 반환

```javascript
var twoSum = function(nums, target) {
    for (var i = 0; i < nums.length; i++) {
        for (var j = i + 1; j < nums.length; j++) {
            if (target == nums[i] + nums[j]) {
                return [i, j];
            }
        }
    }
};
```