(function () {
    "use strict";

    function renderTree(node, tree) {

        if (tree) {
            var $root = document.createElement('div');
            // $root.appendChild(document.createTextNode(tree.value));
            $root.id = 'node-' + tree.value;
            node.appendChild($root);

            if (tree.left) {
                renderTree($root, tree.left);
            }

            if (tree.right) {
                renderTree($root, tree.right);
            }
        }
    }

    var interval = 200;

    var scheduler = $.delay(function() {}, 0);
    function animate($node) {
        interval = $('#speed').value || 200;

        scheduler.delay(function () {
            $node.classList.toggle('highlight');
        }, interval);
    }

    function travelAnimate(tree, type) {
        var traversal;
        switch (type) {
            case 'inOrder':
                traversal = tree.inOrder();
                break;
            case 'preOrder':
                traversal = tree.preOrder();
                break;
            case 'postOrder':
                traversal = tree.postOrder();
                break;
            default:
                traversal = tree.inOrder();
                break;
        }

        console.log(traversal);
        traversal.forEach(function (value) {
            var $node = $('#node-' + value);
            animate($node);
            animate($node);
        });
    }

    function initBtns() {
        $.addEvent($('#preOrderBtn'), 'click', function () {
            travelAnimate(bst, 'preOrder');
        });
        $.addEvent($('#postOrderBtn'), 'click', function () {
            travelAnimate(bst, 'postOrder');
        });
        $.addEvent($('#inOrderBtn'), 'click', function () {
            travelAnimate(bst, 'inOrder');
        });
    }

    // var bst = new BinarySearchTree();
    var bst = randomBST();

    function init() {
        // bst.add(5);
        // bst.add(3);
        // bst.add(1);
        // bst.add(7);
        // bst.add(9);
        renderTree($('.tree'), bst.root);
        initBtns();
    }

    init();

}());