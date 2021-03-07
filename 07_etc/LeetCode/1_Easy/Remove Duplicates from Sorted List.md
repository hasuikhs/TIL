# Remove Duplicates from Sorted List

- 오름차순으로 정렬된 node list가 주어짐
- 숫자의 중복을 제거한 node list를 반환

```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function(head) {
    
    var resultNode = new ListNode(-1000);
    var curNode = resultNode;
    var prevVal = curNode.val;
    
    while (head != null) {
        var curVal = head.val;
        
        if (prevVal != curVal) {
            curNode.next  = new ListNode(curVal);
            curNode = curNode.next
        }
        prevVal = curVal
        
        
        head = head.next;
    }
    
    return resultNode.next
};
```

