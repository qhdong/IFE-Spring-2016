/**
 * Created by dongqh on 4/25/2016.
 */
/* global FormFieldFactory */

(function () {
    "use strict";

    var form = document.getElementById('form'),
        nameField = FormFieldFactory.makeField({
            type: 'name',
            label: '姓名',
            rules: '必填， 长度为4~16个字符',
            success: '格式正确',
            fail: '长度为4~16个字符'
        }),
        passwdField = FormFieldFactory.makeField({
            type: 'password',
            label: '密码',
            rules: '长度不能少于8个字符',
            success: '格式正确',
            fail: '密码必须由数字、字符、特殊字符三种中的两种组成'
        }),
        passwordConfirmFieldStrategy = {
            isValid: function () {
                var re = /(?!^\d+$)(?!^[a-zA-Z]+$)(?!^[_#@]+$).{8,}/,
                    pwd = passwdField.querySelector('input').value;
                return (this.getValue() === pwd && re.test(this.getValue()));
            }
        },
        passwdField2 = FormFieldFactory.makeField({
            type: 'password',
            label: '确认密码',
            rules: '再次输入相同的密码',
            success: '格式正确',
            fail: '两次输入密码必须相同',
            strategy: passwordConfirmFieldStrategy
        }),
        emailField = FormFieldFactory.makeField({
            type: 'email',
            label: '邮箱',
            rules: '必填，请输入合法邮箱地址',
            success: '格式正确',
            fail: '请输入合法邮箱地址'
        }),
        phoneField = FormFieldFactory.makeField({
            type: 'phone',
            label: '手机',
            rules: '请输入手机号码',
            success: '格式正确',
            fail: '手机号码格式错误，请输入合法的手机号码'
        }),
        submitField = FormFieldFactory.makeField({
            type: 'submit',
            label: '确认'
        });

    form.appendChild(nameField);
    form.appendChild(passwdField);
    form.appendChild(passwdField2);
    form.appendChild(emailField);
    form.appendChild(phoneField);
    form.appendChild(submitField);
}());