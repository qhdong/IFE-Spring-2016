/**
 * Created by dongqh on 4/27/2016.
 */

var studentData = [
    {
        city: '北京',
        school: ['北京大学', '清华大学', '中国人民大学']
    }, {
        city: '南京',
        school: ['东南大学', '南京大学', '南京农业大学']
    }, {
        city: '西安',
        school: ['西安交通大学', '陕西师范大学']
    }
];

(function () {
    "use strict";
    var $student = document.querySelector('#student'),
        $adult = document.querySelector('#adult'),
        $city = document.querySelector('#city'),
        $school = document.querySelector('#school');

    document.querySelector('.row2').style.display = 'none';
    document.querySelector('.row3').style.display = 'none';

    $student.addEventListener('change', function (ev) {
        document.querySelector('.row2').style.display = 'flex';
        document.querySelector('.row3').style.display = 'none';
    }, false);

    $adult.addEventListener('change', function (ev) {
        document.querySelector('.row3').style.display = 'flex';
        document.querySelector('.row2').style.display = 'none';
    }, false);

    $city.innerHTML = studentData.map(function (obj) {
        return '<option value="' + obj.city + '">' + obj.city + '</option>';
    }).reduce(function (a, b) {
        return a + b;
    });

    $city.addEventListener('change', function (ev) {
        var schoolObj = studentData.filter(function (obj) {
                return obj.city === ev.target.value;
            }),
            schoolList = schoolObj[0].school;

        $school.innerHTML = schoolList.map(function (name) {
            return `<option value=${name}>${name}</option>`;
        }).reduce(function (a, b) {
            return a + b;
        });
    }, false);

}());