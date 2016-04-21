/* globals $, Tree */

(function () {
    "use strict";

    function renderTree(dom, tree) {
        var dfID = 0,
            bfID = 0,
            queue = [];

        (function render(dom, treeNode) {
            if (treeNode) {
                var $root = document.createElement('div');
                $root.appendChild(document.createTextNode(treeNode.data));
                $root.className = 'df-' + dfID;
                dom.appendChild($root);

                treeNode.children.forEach(function (node) {
                    dfID++;
                    render($root, node);
                });
            }
        }(dom, tree.root));

        console.log(dom);
        var current = dom.childNodes[0];
        console.log(current);
        while (current) {
            Array.prototype.forEach.call(current.childNodes, function (node) {
                if (node.tagName === 'DIV') {
                    queue.push(node);
                }
            });

            current.className += ' bf-' + bfID;
            bfID++;
            current = queue.shift();
        }

    }

    var interval = 200;

    var scheduler = $.delay(function() {}, 0);
    function animate($node, className) {
        className = className || 'highlight';

        interval = $('#speed').value || 200;

        scheduler.delay(function () {
            $node.classList.toggle(className);
        }, interval);
    }

    function changeBtnState(state) {
        var $buttons = document.querySelectorAll('button');
        Array.prototype.forEach.call($buttons, function (btn) {
            btn.disabled = !state;
        });
    }

    function travelAnimate(tree, type) {
        $('.tree').innerHTML = '';
        renderTree($('.tree'), tree);

        type = type || 'preOrder';

        var traversal;

        function bf(tree) {
            var arr = [];
            tree.traverseBF(function (node) {
                arr.push(node.data);
            });
            console.log(arr);
            return arr;
        }

        switch (type) {
            case 'preOrder':
                traversal = tree.preOrder();
                break;
            case 'postOrder':
                traversal = tree.postOrder();
                break;
            case 'bf':
                traversal = bf(tree);
                break;
            default:
                traversal = tree.preOrder();
                break;
        }

        scheduler.delay(function () {
            changeBtnState(false);
        }, 0);

        traversal.forEach(function (value, idx) {
            var $node;
            if (type === 'bf') {
                $node = $('.bf-' + idx);
            } else {
                $node = $('.df-' + idx);
            }
            animate($node);
            animate($node);
        });

        scheduler.delay(function () {
            changeBtnState(true);
        }, 0);
    }

    function query() {
        var keyword = $('#queryText').value.trim(),
            found = 0,
            bfID = 0,
            callback = function (treeNode) {
                var $node = $('.bf-' + bfID);
                bfID++;
                animate($node, 'highlight');

                if (treeNode.data === keyword) {
                    animate($node, 'found');
                    found++;
                } else {
                    animate($node, 'highlight');
                }
            };

        scheduler.delay(function () {
            changeBtnState(false);
        }, 0);

        tree.contains(callback, tree.traverseBF);

        scheduler.delay(function () {
            if (!found) {
                alert(`没有找到元素: ${keyword}`);
            }
        }, 0);

        scheduler.delay(function () {
            changeBtnState(tree);
        }, 0);
    }

    function initBtns() {
        $.addEvent($('#preOrderBtn'), 'click', function () {
            travelAnimate(tree, 'preOrder');
        });
        $.addEvent($('#postOrderBtn'), 'click', function () {
            travelAnimate(tree, 'postOrder');
        });
        $.addEvent($('#bfBtn'), 'click', function () {
            travelAnimate(tree, 'bf');
        });

        $.addEvent($('#randomBtn'), 'click', function () {
            // TODO 生成随机树
            $('.tree').innerHTML = '';
            renderTree($('.tree'), tree);
        });

        $.addEvent($('#queryBtn'), 'click', function () {
            $('.tree').innerHTML = '';
            renderTree($('.tree'), tree);
            query();
        });
    }

    var tree = getTree();

    function getTree() {
        var tree = new Tree('CEO');

        tree.add('Happiness', 'CEO', tree.traverseBF);
        tree.add('Finance', 'CEO', tree.traverseBF);
        tree.add('张艺谋', 'Finance', tree.traverseBF);
        tree.add('Sadness', 'CEO', tree.traverseBF);
        tree.add('郑多燕', 'Sadness', tree.traverseBF);
        tree.add('director', 'Finance', tree.traverseBF);
        tree.add('郑多燕', 'director', tree.traverseBF);
        tree.add('张艺谋', 'director', tree.traverseBF);

        return tree;
    }

    function init() {
        renderTree($('.tree'), tree);
        initBtns();
    }

    init();

}());