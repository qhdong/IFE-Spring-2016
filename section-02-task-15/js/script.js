(function () {
   "use strict";
    /**
     * getData方法
     * 读取id为source的列表，获取其中城市名字及城市对应的空气质量
     * 返回一个数组，格式见函数中示例
     */
    function getData() {
        "use strict";
        var $source = document.querySelectorAll('#source > li');
        var re = /(.*?)空气质量.*?<b>(.*?)<\/b>/;
        var data = [];
        Array.prototype.forEach.call($source, function (li) {
            data.push(li.innerHTML.match(re).slice(1, 3));
        });
        return data;
    }

    /**
     * sortAqiData
     * 按空气质量对data进行从小到大的排序
     * 返回一个排序后的数组
     */
    function sortAqiData(data) {
        return data.sort(function (a, b) {
           return parseInt(a[1]) - parseInt(b[1]);
        });
    }

    /**
     * render
     * 将排好序的城市及空气质量指数，输出显示到id位resort的列表中
     * 格式见ul中的注释的部分
     */
    function render(data) {
        var num2cn = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
        var $resort = document.getElementById('resort');
        var list = []
        data.forEach(function (item, index) {
            // ES6中的字符串literal用法
            list.push(`<li>第${num2cn[index]}名: &nbsp; ${item[0]}空气质量: &nbsp; <b>${item[1]}</b></li>`);
        });
        $resort.innerHTML = list.join('');
    }

    function btnHandle() {
        var aqiData = getData();
        aqiData = sortAqiData(aqiData);
        render(aqiData);
    }

    function init() {
        var $button = document.getElementById('sort-btn');
        $button.addEventListener('click', function (e) {
            btnHandle();
        }, false);
    }

    init();

}());