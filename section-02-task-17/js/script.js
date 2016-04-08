(function () {
   "use strict";
    
    /* 数据格式演示
     var aqiSourceData = {
     "北京": {
     "2016-01-01": 10,
     "2016-01-02": 10,
     "2016-01-03": 10,
     "2016-01-04": 10
     }
     };
     */

    function getDateStr(dat) {
        var y = dat.getFullYear();
        var m = dat.getMonth() + 1;
        m = m < 10 ? '0' + m : m;
        var d = dat.getDate();
        d = d < 10 ? '0' + d : d;
        return y + '-' + m + '-' + d;
    }
    
    function randomBuildData(seed) {
        var returnData = {};
        var dat = new Date("2016-01-01");
        var datStr = '';
        for (var i = 1; i < 92; i++) {
            datStr = getDateStr(dat);
            returnData[datStr] = Math.ceil(Math.random() * seed);
            dat.setDate(dat.getDate() + 1);
        }
        return returnData;
    }

    var aqiSourceData = {
        "北京": randomBuildData(500),
        "上海": randomBuildData(300),
        "广州": randomBuildData(200),
        "深圳": randomBuildData(100),
        "成都": randomBuildData(300),
        "西安": randomBuildData(500),
        "福州": randomBuildData(100),
        "厦门": randomBuildData(100),
        "沈阳": randomBuildData(500)
    };

    // 用于渲染图表的数据
    var chartData = {};

    // 记录当前页面的表单选项
    var pageState = {
        nowSelectCity: -1,
        nowCity: undefined,
        nowGraTime: "day"
    };

    // 随机颜色
    function randomColor() {
        var hexColor = Math.floor(Math.random() * 0xffffff).toString(16);
        if (hexColor.length === 6) {
            return '#' + hexColor;
        } else {
            return randomColor();
        }
    }

    /**
     * 渲染图表
     */
    function renderChart(city, view) {
        var $chart = document.querySelector('.aqi-chart-wrap');
        var data = chartData[city][view].data;
        var text = chartData[city][view].text;
        var chartHTML = '';
        for (var i = 0; i < data.length; i++) {
            chartHTML += `<div class="bar ${view}" title="城市: ${city}, 时间: ${text[i]}, 空气质量: ${data[i]}",\
            style="height: ${data[i]}px; background-color: ${randomColor()}"></div>`;
        }
        $chart.innerHTML = chartHTML;
    }

    /**
     * 日、周、月的radio事件点击时的处理函数
     */
    function graTimeChange(e) {
        var event = e || window.event;
        var $radio = event.target || event.srcElement;
        if ($radio.tagName !== 'INPUT') {
            return;
        }

        // 确定是否选项发生了变化
        if ($radio.value === pageState.nowGraTime) {
            return;
        }

        // 设置对应数据
        pageState.nowGraTime = $radio.value;

        // 调用图表渲染函数
        renderChart(pageState.nowCity, pageState.nowGraTime);
    }

    /**
     * select发生变化时的处理函数
     */
    function citySelectChange(e) {
        var event = e || window.event;
        var $selector = event.target || event.srcElement;

        // 确定是否选项发生了变化
        if ($selector.selectedIndex === pageState.nowSelectCity) {
            return;
        }
        
        // 设置对应数据
        pageState.nowSelectCity = $selector.selectedIndex;
        pageState.nowCity = $selector.options[pageState.nowSelectCity].text;

        // 调用图表渲染函数
        renderChart(pageState.nowCity, pageState.nowGraTime);
    }

    /**
     * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
     */
    function initGraTimeForm() {
        var $radios = document.getElementById('form-gra-time');
        $radios.addEventListener('click', graTimeChange, false);
    }

    /**
     * 初始化城市Select下拉选择框中的选项
     */
    function initCitySelector() {
        // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
        var $citySelect = document.getElementById('city-select');
        var options = '';
        for (var city in aqiSourceData) {
            if (aqiSourceData.hasOwnProperty(city)) {
                options += `<option>${city}</option>`;
            }
        }
        $citySelect.innerHTML = options;
        pageState.nowSelectCity = 0;
        pageState.nowCity = $citySelect.options[0].text;

        // 给select设置事件，当选项发生变化时调用函数citySelectChange
        $citySelect.addEventListener('change', citySelectChange, false);
    }

    /**
     * 初始化图表需要的数据格式
     */
    function initAqiChartData() {
        // 将原始的源数据处理成图表需要的数据格式
        // 处理好的数据存到 chartData 中
        for (var city in aqiSourceData) {
            if (aqiSourceData.hasOwnProperty(city)) {
                chartData[city] = {
                    originData: [],
                    day: {
                        data: [],
                        text: []
                    },
                    week: {
                        weekGroup: {

                        },
                        data: [],
                        text: []
                    },
                    month: {
                        monthGroup: {

                        },
                        data: [],
                        text: []
                    }
                };

                var cityData = aqiSourceData[city];
                var weekIndex = 1;
                for (var date in cityData) {
                    if (cityData.hasOwnProperty(date)) {
                        var d = new Date(date);
                        chartData[city].originData.push(d);

                        // day view
                        chartData[city].day.text.push(date);
                        chartData[city].day.data.push(cityData[date]);

                        // week view
                        if (! chartData[city].week.weekGroup.hasOwnProperty(weekIndex)) {
                            chartData[city].week.weekGroup[weekIndex] = [];
                        }
                        chartData[city].week.weekGroup[weekIndex].push(cityData[date]);
                        if (d.getUTCDay() === 0) {
                            weekIndex++;
                        }

                        // month view
                        if (! chartData[city].month.monthGroup.hasOwnProperty(d.getMonth()+1)) {
                            chartData[city].month.monthGroup[d.getMonth()+1] = [];
                        }
                        chartData[city].month.monthGroup[d.getMonth()+1].push(cityData[date]);
                    }
                }

                // week view data process
                var weekData = chartData[city].week.weekGroup;
                for (var week in weekData) {
                    if (weekData.hasOwnProperty(week)) {
                        var weekMean = weekData[week].reduce(function (a, b) {
                            return a + b;
                        }) / weekData[week].length;

                        chartData[city].week.text.push(`第${week}周`);
                        chartData[city].week.data.push(weekMean.toFixed(2));
                    }
                }

                // month view data process
                var monthData = chartData[city].month.monthGroup;
                for (var month in monthData) {
                    if (monthData.hasOwnProperty(month)) {
                        var monthMean = monthData[month].reduce(function (a, b) {
                                return a + b;
                            }) / monthData[month].length;

                        chartData[city].month.text.push(`${month}月`);
                        chartData[city].month.data.push(monthMean.toFixed(2));
                    }
                }
            }
        }
        // console.log(chartData);
    }

    /**
     * 初始化函数
     */
    function init() {
        initGraTimeForm();
        initCitySelector();
        initAqiChartData();
    }

    init();
    
}());