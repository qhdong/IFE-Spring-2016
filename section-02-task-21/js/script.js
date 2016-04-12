(function () {
   "use strict";

    var tagQueue = [],
        hobbyQueue = [];

    /**
     * 工具函数
     */
    var $ = function (el) {
        return document.querySelector(el);
    };
    var $$ = function (el) {
        return document.querySelectorAll(el);
    };

    /**
     * 向队列中添加值,若超出10,则头部顶出,若有重复则不添加
     * @param queue
     * @param value
     */
    function addQueue(queue, value) {
        if (value === '') {
            return;
        }
        if (queue.indexOf(value) !== -1) {
            console.log(`元素${value}已在队列中`);
            return;
        }
        if (queue.length === 10) {
            queue.shift();
        }
        queue.push(value);
    }

    /**
     * 添加tag
     */
    function addTag(e) {
        var event = e || window.event,
            tag = $('#tagInput').value,
            re = /[\s\n,，;；、。.\u3000]+/;

        if (re.test(tag) || event.keyCode === 13) {
            addQueue(tagQueue, tag.split(re)[0].trim());
            $('#tagInput').value = '';
            render($('.tagView'), tagQueue);
        }
    }

    /**
     * 删除tag
     */
    function deleteTag(e) {
        var event = e || window.event,
            target = e.target || e.srcElement;
        if (target.tagName === 'DIV') {
            tagQueue.splice(Array.prototype.indexOf.call($('.tagView').childNodes, target), 1);
            render($('.tagView'), tagQueue);
        }
    }

    /**
     * 添加兴趣爱好
     */
    function addHobby() {
        var re = /[\s\n,，;；、。.\u3000]+/,
            hobbys = $('#hobbyInput').value.trim().split(re);

        hobbys.forEach(function (hobby) {
            addQueue(hobbyQueue, hobby);
        });

        $('#hobbyInput').value = '';
        render($('.hobbyView'), hobbyQueue);
        console.log(hobbyQueue);
    }

    /**
     * 渲染
     * @param target
     * @param data
     */
    function render(target, data) {
        target.innerHTML = data.map(function (hobby) {
            return `<div>${hobby}</div>`;
        }).join('');
    }

    /**
     * 添加事件响应函数
     */
    function initEvents() {
        $('#tagInput').addEventListener('keyup', addTag, false);
        $('.tagView').addEventListener('click', deleteTag, false);
        $('#hobbyBtn').addEventListener('click', addHobby, false);
    }

    function init() {
        initEvents();
        // initView();
    }

    init();
    
}());