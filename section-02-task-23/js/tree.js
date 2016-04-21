function Node(data) {
    "use strict";
    this.data = data;
    this.parent = null;
    this.children = [];
}

function Tree(data) {
    "use strict";
    this.root = new Node(data);
}

Tree.prototype = {
    constructor: Tree,

    add: function (data, toData, traversal) {
        "use strict";
        var child = new Node(data),
            parent = null,
            callback = function (node) {
                if (node.data === toData) {
                    parent = node;
                }
            };

        this.contains(callback, traversal);

        if (parent) {
            parent.children.push(child);
            child.parent = parent;
        } else {
            throw new Error('Cannot add node to a non-existent parent.');
        }
    },

    remove: function (data, fromData, traversal) {
        "use strict";
        var parent = null,
            childToRemove = null,
            index;

        var callback = function (node) {
            if (node.data === fromData) {
                parent = node;
            }
        };

        this.contains(callback, traversal);

        function findIndex(arr, data) {
            var index;

            arr.forEach(function (node, idx) {
                if (node.data === data) {
                    index = idx;
                }
            });

            return index;
        }

        if (parent) {
            index = findIndex(parent.children, data);
            if (index === undefined) {
                throw new Error('Node to remove does not exist.');
            } else {
                childToRemove = parent.children.splice(index, 1);
            }
        } else {
            throw new Error('Parent does not exist.');
        }

        return childToRemove;

    },

    traverseDF: function (callback, order) {
        "use strict";

        function preOrder(tree) {
            if (tree) {
                callback(tree);
                tree.children.forEach(function (node) {
                    preOrder(node);
                });
            }
        }

        function postOrder(tree) {
            if (tree) {
                tree.children.forEach(function (node) {
                    postOrder(node);
                });
                callback(tree);
            }
        }

        switch (order) {
            case 'pre': preOrder(this.root); break;
            case 'post': postOrder(this.root); break;
            default: preOrder(this.root); break;
        }
    },

    traverseBF: function (callback) {
        "use strict";

        var queue = [],
            current = this.root;
        while (current) {
            current.children.forEach(function (node) {
                queue.push(node);
            });

            callback(current);
            current = queue.shift();
        }
    },

    preOrder: function () {
        "use strict";

        var arr = [];
        this.traverseDF(function (node) {
            arr.push(node.data);
        }, 'pre');
        return arr;
    },

    postOrder: function () {
        "use strict";

        var arr = [];
        this.traverseDF(function (node) {
            arr.push(node.data);
        }, 'post');
        return arr;
    },

    contains: function (callback, traversal) {
        "use strict";

        traversal.call(this, callback);
    },

    size: function () {
        "use strict";

        var length = 0;

        this.traverseBF(function (node) {
            length++;
        });

        return length;
    },

    toArray: function () {
        "use strict";

        var result = [];

        this.traverseBF(function (node) {
            result.push(node.data);
        });

        return result;
    },

    toString: function () {
        "use strict";
        return this.toArray().toString();
    }
};
