# Same Tree

- 두 트리가 동일한 트리인지 비교 하는 문제

```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function(p, q) {
    // 두 노드가 모두 null 일때 true 반환
    if (!p && !q) return true; 
    // 하나의 노드가 null 이거나 p.val 과 q.val 이 다를때 false 반환
  	if (!p || !q || p.val !== q.val) return false;
  
    // 재귀
  	return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
};
```

