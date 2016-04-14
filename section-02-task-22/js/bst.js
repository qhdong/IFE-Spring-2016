function BinarySearchTree() {
    "use strict";
    this.root = null;
}

BinarySearchTree.prototype = {
    constructor: BinarySearchTree,

    add: function (value) {
        "use strict";

        function Node(value) {
            this.value = value;
            this.left = null;
            this.right = null;
        }

        var node = new Node(value),
            current;

        if (this.root === null) {
            this.root = node;
        } else {
            current = this.root;
            while (true) {
                if (value < current.value) {
                    if (current.left === null) {
                        current.left = node;
                        break;
                    } else {
                        current = current.left;
                    }
                } else if (value > current.value) {
                    if (current.right === null) {
                        current.right = node;
                        break;
                    } else {
                        current = current.right;
                    }
                } else {
                    // already have the value, drop it
                    return false;
                }
            }
        }

        return true;
    },

    traverse: function (process, order) {
        "use strict";

        order = order || 'in';

        function inOrder(node) {
            if (node) {
                inOrder(node.left);
                process.call(this, node);
                inOrder(node.right);
            }
        }

        function preOrder(node) {
            if (node) {
                process.call(this, node);
                preOrder(node.left);
                preOrder(node.right);
            }
        }

        function postOrder(node) {
            if (node) {
                postOrder(node.left);
                postOrder(node.right);
                process.call(this, node);
            }
        }

        switch (order) {
            case 'in': inOrder(this.root); break;
            case 'pre': preOrder(this.root); break;
            case 'post': postOrder(this.root); break;
            default: inOrder(this.root); break;
        }
    },

    inOrder: function () {
        "use strict";

        var arr = [];
        this.traverse(function (node) {
            arr.push(node.value);
        }, 'in');
        return arr;
    },

    preOrder: function () {
        "use strict";

        var arr = [];
        this.traverse(function (node) {
            arr.push(node.value);
        }, 'pre');
        return arr;
    },

    postOrder: function () {
        "use strict";

        var arr = [];
        this.traverse(function (node) {
            arr.push(node.value);
        }, 'post');
        return arr;
    },

    contains: function (value) {
        "use strict";

        var current = this.root;

        while (current) {
            if (value < current.value) {
                current = current.left;
            } else if (value > current.value) {
                current = current.right;
            } else {
                return true;
            }
        }

        return false;
    },

    size: function () {
        "use strict";

        var length = 0;

        this.traverse(function (node) {
            length++;
        });

        return length;
    },

    toArray: function () {
        "use strict";

        var result = [];

        this.traverse(function (node) {
            result.push(node.value);
        });

        return result;
    },

    toString: function () {
        "use strict";
        return this.toArray().toString();
    }
};

function randomBST(length, range) {
    "use strict";

    length = length || 10;
    range = range || {min: 0, max: 100};
    var min = range.min,
        max = range.max;

    var bst = new BinarySearchTree();
    while (bst.size() < length) {
        bst.add(Math.round(min + (max-min)*Math.random()));
    }
    return bst;
}


// var bst = randomBST(3, {min: 1, max: 20});
//
// console.log(bst);
// console.log(bst.preOrder());
// console.log(bst.inOrder());
// console.log(bst.postOrder());
// console.log(bst.toString());
