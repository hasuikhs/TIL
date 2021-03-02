# Maximum Subarray

- 주어진 숫자배열을 순서에 맞춰 자를때 가장 큰 숫자를 반환

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
    
    if (nums.length == 0) return 0;
    
    var max = nums[0];
    var prev = nums[0];
    
    for (var i = 1; i < nums.length; i++) {
        prev = Math.max(nums[i], prev + nums[i]);	// 현재 숫자와 이전숫자와 현재 숫자를 더했을때 큰 숫자를 반환
        											// 이전에 더한 숫자들의 합보다 현재 숫자가 더 크면 대치
        max = Math.max(max, prev);	// 최대값은 위의 합계와 max와 비교해서 큰값 반환
    }
    
    return max;
};
```

