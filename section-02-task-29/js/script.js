/**
 * Created by dongqh on 4/25/2016.
 */

(function () {
    "use strict";
    var $validateBtn = document.getElementById('validateBtn');
    $validateBtn.addEventListener('click', validate, false);

    function validate(ev) {
        ev.preventDefault();
        var $name = document.getElementById('name'),
            $tip = document.querySelector('.tip'),
            input = $name.value.trim(),
            re = /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi,
            len = input.replace(re, '##').length;

        function changeFieldState(state) {
            if (state === 'success') {
                $tip.classList.remove('error');
                $tip.classList.add('success');
                $name.classList.remove('error-input');
                $name.classList.add('success-input');
            } else if (state === 'error') {
                $tip.classList.remove('success');
                $tip.classList.add('error');
                $name.classList.remove('success-input');
                $name.classList.add('error-input');
            } else {
                $tip.classList.remove('success');
                $tip.classList.remove('error');
                $name.classList.remove('success-input');
                $name.classList.remove('error-input');
            }
        }

        if (len === 0) {
            $tip.innerHTML = '姓名不能为空';
            changeFieldState('error');
        } else if (len < 4 || len > 16) {
            $tip.innerHTML = '长度为4~16个字符';
            changeFieldState('error');
        } else {
            $tip.innerHTML = '名称格式正确';
            changeFieldState('success');
        }
        console.log(len);
    }
}());