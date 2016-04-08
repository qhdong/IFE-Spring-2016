(function () {
   "use strict";

    /**
     * 队列
     * @type {Array}
     */
    var queue = [];

    /**
     * 渲染队列
     */
    function renderQueue() {
        var $view = document.querySelector('.view');
        var viewHTML = '';
        queue.forEach(function (val) {
            viewHTML += `<div class="box">${val}</div>`;
        });
        $view.innerHTML = viewHTML;
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
     * 为按键添加事件响应函数
     */
    function initButtons() {
        var $leftInBtn = document.getElementById('leftInBtn');
        var $rightInBtn = document.getElementById('rightInBtn');
        var $leftOutBtn = document.getElementById('leftOutBtn');
        var $rightOutBtn = document.getElementById('rightOutBtn');
        var $number = document.getElementById('number');

        $leftInBtn.addEventListener('click', function (e) {
            if (! /^\d+$/.test($number.value)) {
                displayMessage('请输入合法的正整数');
                return;
            }
            queue.unshift($number.value);
            changeBtnState(true);
            renderQueue();
        }, false);

        $rightInBtn.addEventListener('click', function (e) {
            if (! /^\d+$/.test($number.value)) {
                displayMessage('请输入合法的正整数');
                return;
            }
            queue.push($number.value);
            changeBtnState(true);
            renderQueue();
        }, false);

        $leftOutBtn.addEventListener('click', function (e) {
            displayMessage(`从队列左侧弹出元素 <span class="red">${queue.shift()}</span>`);
            if (queue.length === 0) {
                changeBtnState(false);
            }
            renderQueue();
        }, false);

        $rightOutBtn.addEventListener('click', function (e) {
            displayMessage(`从队列右侧弹出元素 <span class="red">${queue.pop()}</span>`);
            if (queue.length === 0) {
                changeBtnState(false);
            }
            renderQueue();
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
            displayMessage(`从队列中删除第 <span class="red">${idx+1}</span> 个值为 <span class="red">${queue[idx]}</span> 的元素`);
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