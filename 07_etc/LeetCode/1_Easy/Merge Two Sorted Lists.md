# Merge Two Sorted Lists

- 오름차순으로 정렬된 두개의 NodeList를 순서대로 합치기

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
var mergeTwoLists = function(l1, l2) {
    
    var resultNode = new ListNode(0);
    var curNode = resultNode;
    
    // l1, l2 둘다 null이 아닌 경우
    while (l1 && l2) {	
        if (l1.val < l2.val) {
            curNode.next = l1;
            l1 = l1.next;
        } else {
            curNode.next = l2;
            l2 = l2.next;
        }
        curNode = curNode.next;
    }
    
    // while문을 타지 않거나 벗어났을 때 남아있는 l1이나 l2를 다음 노드에 할당
    curNode.next  = l1 || l2; 
    
    return resultNode.next; // 첫 값을 임의로 넣었기 때문에 .next로 반환
};
```

