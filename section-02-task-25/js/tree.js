/**
 * Created by dongqh on 4/20/2016.
 */
/* jshint strict: false */

var Tree = function (dom) {
    this.tree = dom || document.querySelector('tree');
    this.root = null;
};

Tree.prototype.createNode = function (data) {
    var $li = document.createElement('li'),
        $data = document.createElement('div'),
        $children = document.createElement('ul');

    $data.innerHTML = `<span class="data">${data}</span>
<div class="controlBtn"><i class="fa fa-plus add">增加</i><i class="fa fa-minus delete">删除</i><i class="fa fa-pencil-square-o rename">重命名</i>
</div>`;
    $children.classList.add('children');
    $li.classList.add('node');
    $li.appendChild($data);
    $li.appendChild($children);

    return $li;
};

Tree.prototype.addNode = function (parentNode, data) {
    if (!data) {
        throw new Error('Can not add empty node');
    }
    var node = this.createNode(data);
    if (!this.root) {
        this.root = node;
    }
    if (parentNode.tagName !== 'UL') {
        parentNode.querySelector('ul').appendChild(node);
        parentNode.classList.add('parent');
    } else {
        parentNode.appendChild(node);
    }
    return node;
};

Tree.prototype.deleteNode = function (node) {
    var parentNode = node.parentNode;
    if (parentNode === this.tree) {
        throw new Error('Can not delete root node');
    } else {
        if (parentNode.tagName !== 'UL') {
            throw new Error('Incorrrect node.');
        } else {
            parentNode.removeChild(node);
        }
    }
    return node;
};

Tree.prototype.traverseBF = function (callback) {
    var queue = [],
        currentNode = this.root,
        childNodes;

    while (currentNode) {
        childNodes = currentNode.querySelector('ul').childNodes;
        Array.prototype.forEach.call(childNodes, function (node) {
            queue.push(node);
        });
        callback(currentNode);
        currentNode = queue.shift();
    }
};

Tree.prototype.traverseDF = function (callback, order) {
    function preOrder(currentNode) {
        if (currentNode) {
            callback(currentNode);
            var childNodes = currentNode.querySelector('ul').childNodes;
            Array.prototype.forEach.call(childNodes, function (node) {
                preOrder(node);
            });
        }
    }

    function postOrder(currentNode) {
        if (currentNode) {
            var childNodes = currentNode.querySelector('ul').childNodes;
            Array.prototype.forEach.call(childNodes, function (node) {
                postOrder(node);
            });
            callback(currentNode);
        }
    }

    switch (order) {
        case 'pre': preOrder(this.root); break;
        case 'post': postOrder(this.root); break;
        default: preOrder(this.root); break;
    }
};

Tree.prototype.search = function (data) {
    var result = [],
        re = new RegExp(data);
    this.traverseBF(function (node) {
        if (re.test(node.querySelector('.data').textContent)) {
            result.push(node);
        }
    });
    return result;
};
