(function () {
   "use strict";
    /**
     * aqiData，存储用户输入的空气指数数据
     * 示例格式：
     * aqiData = {
     *    "北京": 90,
     *    "上海": 40
     * };
     */
    var aqiData = {};

    /**
     * 从用户输入中获取数据，向aqiData中增加一条数据
     * 然后渲染aqi-list列表，增加新增的数据
     */
    function addAqiData() {
        var city = document.getElementById('aqi-city-input').value.trim();
        var aqi = document.getElementById('aqi-value-input').value.trim();
        var re = /^[a-zA-Z\u4E00-\u9FA5\uF900-\uFA2D]+$/;
        if (!re.test(city)) {
            alert('城市名称只能是中文或英文字符');
            return;
        }
        if (!/^\d+$/.test(aqi)) {
            alert('空气质量只能是正整数');
            return;
        }
        aqiData[city] = parseInt(aqi);
    }

    /**
     * 渲染aqi-table表格
     */
    function renderAqiList() {
        var $table = document.getElementById('aqi-table');
        var strHTML = `<thead><tr><td>城市</td><td>空气质量</td><td>操作</td></tr></thead><tbody>`;
        for(var city in aqiData) {
            if (aqiData.hasOwnProperty(city)) {
                strHTML += `<tr><td>${city}</td><td>${aqiData[city]}</td><td><button>删除</button></td></tr>`;
            }
        }
        $table.innerHTML = strHTML + `</tbody>`;
    }

    /**
     * 点击add-btn时的处理逻辑
     * 获取用户输入，更新数据，并进行页面呈现的更新
     */
    function addBtnHandle() {
        addAqiData();
        renderAqiList();
    }

    /**
     * 点击各个删除按钮的时候的处理逻辑
     * 获取哪个城市数据被删，删除数据，更新表格显示
     */
    function delBtnHandle(e) {
        var event = e || window.event;
        var target = event.target || event.srcElement;
        if (target.tagName === 'BUTTON') {
            var $tr = target.parentNode.parentNode;
            var city = $tr.firstChild.textContent;
            delete aqiData[city];
        }
        renderAqiList();
    }

    function init() {

        var $addBtn = document.getElementById('add-btn');
        $addBtn.addEventListener('click', addBtnHandle, false);

        var $table = document.getElementById('aqi-table');
        $table.addEventListener('click', delBtnHandle, false);
    }

    init();
}());