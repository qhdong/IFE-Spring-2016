(function () {
   "use strict";

    /**
     * 队列
     * @type {Array}
     */
    var queue = [];

    var SIZE_FACTOR = 4;
    var animationQueue = delay(function(){}, 0);
    var renderInterval = 200;
    var inAnimation = false;

    /**
     * 选择函数
     * @param el
     * @returns {Element}
     */
    var $ = function (el) {
        return document.querySelector(el);
    };

    var $$ = function (el) {
        return document.querySelectorAll(el);
    };

    /**
     * 实现setTimeOut的队列
     * @param fn
     * @param t
     * @returns {*}
     */
    function delay(fn, t) {
        var queue = [], self, timer;
        function schedule(fn, t) {
            timer = setTimeout(function() {
                timer = null;
                fn();
                if (queue.length) {
                    var next = queue.shift();
                    schedule(next.fn, next.t);
                }
            }, t);
        }
        self = {
            delay: function(fn, t) {
                if (queue.length || timer) {
                    queue.push({fn: fn, t: t});
                } else {
                    schedule(fn, t);
                }
                return self;
            },
            cancel: function() {
                clearTimeout(timer);
                queue = [];
            }
        };
        return self.delay(fn, t);
    }

    /**
     * 标记已排好序的数据
     * @param start
     * @param end
     * @param color
     */
    function renderSortedRange(start, end, color) {
        animationQueue.delay(function () {
            for (var i = start; i < end; i++) {
                $$('.view div')[i].className = color;
            }
        }, 0);
    }

    /**
     * 标记正在排序的数据
     * @param idx
     * @param value
     */
    function renderSort(idx, value) {
        animationQueue.delay(function () {
            $$('.view div')[idx].className = 'blue';
        }, 0);

        if (value !== null) {
            animationQueue.delay(function () {
                $$('.view div')[idx].style.height = value * SIZE_FACTOR + 'px';
            }, 0);
        }

        animationQueue.delay(function () {
            $$('.view div')[idx].className = 'red';
        }, renderInterval);
    }

    /**
     * 冒泡排序
     */
    function bubbleSort() {
        var i, j, tmp;
        for (i = 0; i < queue.length; i++) {
            renderSortedRange(queue.length-i, queue.length, 'green');
            for (j = 1; j < queue.length - i; j++) {
                renderSort(j);
                if (queue[j-1] > queue[j]) {
                    tmp = queue[j-1];
                    queue[j-1] = queue[j];
                    renderSort(j-1, queue[j-1]);
                    queue[j] = tmp;
                    renderSort(j, queue[j]);
                }
            }
        }
        renderSortedRange(0, queue.length, 'green');
    }

    /**
     * 渲染队列
     */
    function renderQueue() {
        $('.view').innerHTML = queue.map(function (val) {
            return `<div class="red" style="height: ${val*SIZE_FACTOR}px;"></div>`;
        }).join('');
    }

    /**
     * 在通知区域显示消息
     * @param msg
     */
    function displayMessage(msg) {
        msg = msg || '通知区域';
        var $message = document.getElementById('message');
        $message.innerHTML = msg;
    }

    /**
     * 控制左侧出,右侧出这两个按钮的状态,启用or禁用
     * @param state
     */
    function changeBtnState(state) {
        state = state || false;
        var $leftOutBtn = document.getElementById('leftOutBtn');
        var $rightOutBtn = document.getElementById('rightOutBtn');
        $leftOutBtn.disabled = !state;
        $rightOutBtn.disabled = !state;
    }

    /**
     * 获得输入的数字
     */
    function getNumber() {
        var $number = document.getElementById('number');
        if (! /^\d+$/.test($number.value)) {
            displayMessage('请输入合法的正整数');
            return -1;
        }
        var n = parseInt($number.value);
        if (n < 10 || n > 100) {
            displayMessage(`请输入<strong>0~100</strong>范围内的正整数`);
            return -1;
        }
        return n;

    }

    /**
     * 为按键添加事件响应函数
     */
    function initButtons() {
        var $leftInBtn = document.getElementById('leftInBtn');
        var $rightInBtn = document.getElementById('rightInBtn');
        var $leftOutBtn = document.getElementById('leftOutBtn');
        var $rightOutBtn = document.getElementById('rightOutBtn');
        var $randomBtn = document.getElementById('randomBtn');
        var $sortBtn = document.getElementById('sortBtn');

        $leftInBtn.addEventListener('click', function (e) {
            var n = getNumber();
            if (n === -1) {
                return;
            }
            if (queue.length >= 60) {
                displayMessage(`超出容量! 最多支持<strong>60</strong>个元素`);
                return;
            }
            queue.unshift(n);
            changeBtnState(true);
            renderQueue();
        }, false);

        $rightInBtn.addEventListener('click', function (e) {
            var n = getNumber();
            if (n === -1) {
                return;
            }
            if (queue.length >= 60) {
                displayMessage(`超出容量! 最多支持<strong>60</strong>个元素`);
                return;
            }
            queue.push(n);
            changeBtnState(true);
            renderQueue();
        }, false);

        $leftOutBtn.addEventListener('click', function (e) {
            displayMessage(`从队列左侧弹出元素 <strong>${queue.shift()}</strong>`);
            if (queue.length === 0) {
                changeBtnState(false);
            }
            renderQueue();
        }, false);

        $rightOutBtn.addEventListener('click', function (e) {
            displayMessage(`从队列右侧弹出元素 <strong>${queue.pop()}</strong>`);
            if (queue.length === 0) {
                changeBtnState(false);
            }
            renderQueue();
        }, false);

        $randomBtn.addEventListener('click', function (e) {
            queue = [];
            for (var i = 0; i < 50; i++) {
                queue[i] = Math.ceil(10 + 90*Math.random());
            }
            changeBtnState(true);
            renderQueue();
        }, false);

        $sortBtn.addEventListener('click', function (e) {
            if (inAnimation) {
                displayMessage(`正在播放动画,暂时不能操作`);
                return;
            }
            inAnimation = true;
            renderInterval = parseInt($('#interval').value);
            renderInterval = renderInterval || 10;
            bubbleSort();
            animationQueue.delay(function () {
                inAnimation = false;
            }, 0);
        }, false);
    }

    /**
     * 为队列中的元素添加单击响应事件
     */
    function initView() {
        var $view = document.querySelector('.view');
        $view.addEventListener('click', function (e) {
            var event = e || window.event;
            var target = e.target || e.srcElement;
            if (target.tagName !== 'DIV') {
                return;
            }
            var idx = Array.prototype.indexOf.call($view.childNodes, target);
            displayMessage(`从队列中删除第 <strong>${idx+1}</strong> 个值为 <strong>${queue[idx]}</strong> 的元素`);
            queue.splice(idx, 1);
            renderQueue();
        }, false);
    }

    function init() {
        changeBtnState(false);
        initButtons();
        initView();
    }

    init();
    
}());