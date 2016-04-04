(function () {
    "use strict";
    var aqiData = [
        ["北京", 90],
        ["上海", 50],
        ["福州", 10],
        ["广州", 50],
        ["成都", 90],
        ["西安", 100]
    ];

    // 降序排序
    aqiData.sort(function (a, b) {
        return b[1] - a[1];
    });

    // 将小于50的滤去
    aqiData = aqiData.filter(function (data) {
        return data[1] >= 50;
    });

    // 添加节点
    var $ul = document.getElementById('aqi-list');
    aqiData.forEach(function (data, index) {
        var $li = document.createElement('li');
        $li.innerHTML = `第${index+1}名: ${data[0]}, 空气质量: ${data[1]}`;
        $ul.appendChild($li);
    });
}());