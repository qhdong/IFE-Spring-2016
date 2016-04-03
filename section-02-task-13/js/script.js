(function () {
    // 获取button对象,如果需要多次使用可以保存下来,提高性能
    var $button = document.getElementById('button');
    var $input = document.getElementById('aqi-input');
    var $output = document.getElementById('aqi-display');
    // 添加事件绑定函数,使用addEventListener,优于.onclick
    $button.addEventListener('click', function (e) {
        $output.innerHTML = $input.value || '尚未录入';
    });
}());