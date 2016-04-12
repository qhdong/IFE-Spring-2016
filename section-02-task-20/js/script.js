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
    function renderQueue(keyword) {
        var $view = document.querySelector('.view');
        $view.innerHTML = queue.map(function (el) {
            if (keyword && keyword.length > 0) {
                el = el.replace(new RegExp(keyword, 'g'), `<span class="yellow">${keyword}</span>`);
            }
            return `<div>${el}</div>`;
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
     * 获取输入的内容
     */
    function getInput() {
        var $inputElement = document.getElementById('inputElement');
        var input = $inputElement.value.split(/[\s,，、\u3000]+/).filter(function (val) {
            return val !== '';
        });
        return input;
    }

    /**
     * 模糊查询
     */
    function query() {
        var $queryText = document.getElementById('queryText');
        var keyword = $queryText.value;
        if (! keyword) {
            displayMessage(`请输入关键词`);
            return;
        }
        displayMessage(`查询关键词: <strong>${keyword}</strong> 的结果如下`);
        renderQueue(keyword);
    }

    /**
     * 为按键添加事件响应函数
     */
    function initButtons() {
        var $leftInBtn = document.getElementById('leftInBtn');
        var $rightInBtn = document.getElementById('rightInBtn');
        var $leftOutBtn = document.getElementById('leftOutBtn');
        var $rightOutBtn = document.getElementById('rightOutBtn');
        var $queryBtn = document.getElementById('queryBtn');

        $leftInBtn.addEventListener('click', function (e) {
            queue = getInput().concat(queue);
            console.log(queue);
            changeBtnState(true);
            renderQueue();
        }, false);

        $rightInBtn.addEventListener('click', function (e) {
            queue = queue.concat(getInput());
            console.log(queue);
            changeBtnState(true);
            renderQueue();
        }, false);

        $leftOutBtn.addEventListener('click', function (e) {
            displayMessage(`从队列左侧弹出元素 <strong>${queue.shift()}<strong>`);
            if (queue.length === 0) {
                changeBtnState(false);
            }
            renderQueue();
        }, false);

        $rightOutBtn.addEventListener('click', function (e) {
            displayMessage(`从队列右侧弹出元素 <strong>${queue.pop()}<strong>`);
            if (queue.length === 0) {
                changeBtnState(false);
            }
            renderQueue();
        }, false);

        $queryBtn.addEventListener('click', function (e) {
            query();
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