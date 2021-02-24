# Add Two Numbers

- 두개의 숫자배열을 더함
- 숫자 배열은 순서대로 더해지며, 10이 넘어갈경우 올림수가 다음 배열에 더해지게 됨
- 반환값은 주어진 `ListNode`로 반환

```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
        
    var resultNode = null;
    var curNode = null;
    var remainder = 0;;
    while (l1 != null || l2 != null || remainder != 0) {
        
        var num1 = 0;
        var num2 = 0;
        var nodeNum = 0;
        if (l1 != null) {
            num1 = l1.val == null ? l1 : l1.val;
            l1 = l1.next;    
        }
        
        if (l2 != null) {
            num2 = l2.val == null ? l2 : l2.val;
            l2 = l2.next;    
        }
        
        nodeNum = num1 + num2 + remainder;
        if (nodeNum > 9) {
            nodeNum = nodeNum % 10;
            remainder = 1;
        } else {
            remainder = 0;
        }

        if (resultNode == null) {
            resultNode = new ListNode(nodeNum);
            curNode = resultNode;
        } else {
            var tmpNode = new ListNode(nodeNum);
            curNode.next = tmpNode;
            curNode = curNode.next;
        }
    }

    return resultNode
    
};
```

