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

    function changeBtnState(state) {
        var $buttons = document.querySelectorAll('button');
        Array.prototype.forEach.call($buttons, function (btn) {
            btn.disabled = !state;
        });
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
            case 'bf':
                traversal = tree.traverseBF();
                break;
            default:
                traversal = tree.inOrder();
                break;
        }

        console.log(traversal);
        scheduler.delay(function () {
            changeBtnState(false);
        }, 0);

        traversal.forEach(function (value) {
            var $node = $('#node-' + value);
            animate($node);
            animate($node);
        });
        
        scheduler.delay(function () {
            changeBtnState(true);
        }, 0);
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
        $.addEvent($('#bfBtn'), 'click', function () {
            travelAnimate(bst, 'bf');
        });

        $.addEvent($('#randomBtn'), 'click', function () {
            bst = randomBST();
            $('.tree').innerHTML = '';
            renderTree($('.tree'), bst.root);
        });
    }

    // var bst = new Tree();
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