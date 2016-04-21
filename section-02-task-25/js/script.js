/* global Tree, $ */
/* jshint strict: false */

var tree = new Tree(document.querySelector('.tree'));
var node = tree.addNode(tree.tree, 'Apple');
var node1 = tree.addNode(node, 'Banana');
var node2 = tree.addNode(node, 'Google');
tree.addNode(node1, 'Google');

$.delegateEvent(tree.tree, 'click', 'span', toggleDisplay);
function toggleDisplay(ev) {
    var parentNode = this.parentNode.parentNode;
    parentNode.querySelector('.children').classList.toggle('hide');
    console.log(parentNode);
}

$.delegateEvent(tree.tree, 'click', 'i', handleNode);
function handleNode(ev) {
    var node = this.parentNode.parentNode.parentNode,
        data;
    if (this.classList.contains('fa-plus')) {
        data = prompt('输入新节点内容');
        if (data.trim() === '') {
            alert('节点内容不能为空');
            return;
        }
        tree.addNode(node, data);
    } else if (this.classList.contains('fa-minus')) {
        tree.deleteNode(node);
    } else {
        data = prompt('输入新节点内容');
        if (data.trim() === '') {
            alert('节点内容不能为空');
            return;
        }
        node.querySelector('.data').textContent = data;
    }
}

function clearSearch() {
    tree.search('').forEach(function (node) {
        node.querySelector('.data').classList.remove('highlight');
    });
}

$.addEvent($('#search'), 'keyup', search);
function search(ev) {
    if (ev.keyCode === 13) {
        var keyword = this.value.trim();
        clearSearch();
        tree.search(keyword).forEach(function (node) {
            var parentNode = node.parentNode;
            while (node !== tree.root && parentNode !== tree.root) {
                if (parentNode.classList.contains('hide')) {
                    parentNode.classList.remove('hide');
                }
                parentNode = parentNode.parentNode;
            }
            node.querySelector('.data').classList.add('highlight');
        });
    } else {
        if (this.value === '') {
            clearSearch();
        }
    }
}

