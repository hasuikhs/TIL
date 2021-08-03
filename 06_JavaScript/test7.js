class Tree {
    constructor(val) {
        this.val = val;
        this.parentNode = null;
        this.childrenNode = [];
    }

    getVal() {
        return this.val;
    }

    setVal(val) {
        this.val = val;
    }

    getParentNode(node) {
        return this.parentNode;
    }

    setParentNode(node) {
        this.parentNode = node;
    }

    getChildrenNode(node) {
        console.log(node.getVal())
        return this.childrenNode[this.childrenNode.indexOf(node)];
    }

    setChildrenNode(node) {
        this.childrenNode.push(node);
    }

    postOrderTree(node) {
        if (!node) {
            return;
        }

        this.postOrderTree(node.parentNode);
        console.log(node.val);
        console.log(node.childrenNode)
    }
}

var arr = [{
        one: 'one',
        two: 'two',
        three: 'three',
        four: 'four1',
        five: 'five1'
    },
    {
        one: 'one',
        two: 'two',
        three: 'three',
        four: 'four2',
        five: 'five2'
    }
]

let root = new Tree('root');

for (var ele of arr) {
    for (var key in ele) {
        if (key == 'one') {
            let oneNode = new Tree(ele[key]);
            oneNode.setParentNode(root)

            console.log(root.getChildrenNode(oneNode))
            if (root.getChildrenNode(oneNode)) {
                console.log('??')
            }

            root.setChildrenNode(oneNode)

        } else if (key == 'two') {
            let twoNode = new Tree(ele[key]);
            root.getChildrenNode

        } else if (key == 'three') {

        } else if (key == 'four') {

        } else {

        }
    }
}
console.log(root)

// let root = new Tree('root');
// let naver = new Tree('네이버');
// let google = new Tree('구글');

// root.setChildrenNode(naver);
// root.setChildrenNode(google);

// root.postOrderTree(root);