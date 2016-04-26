/**
 * Created by dongqh on 4/26/2016.
 */

var FormFieldFactory = {
    availableTypes: {
        TEXT: 'text',
        NAME: 'name',
        EMAIL: 'email',
        PASSWORD: 'password',
        PHONE: 'phone',
        SUBMIT: 'submit'
    },

    fields: [],

    makeField: function (opt) {
        "use strict";

        var options = opt || {},
            type = options.type || this.availableTypes.TEXT,
            labelText = options.label || 'label',
            rules = options.rules || 'rules',
            success = options.success || 'success',
            fail = options.fail || 'fail',
            $label = document.createElement('label'),
            $tip =document.createElement('p'),
            $element = document.createElement('div'),
            field,
            $field;

        switch (type) {
            case this.availableTypes.TEXT:
                field = new FormField('text', options.strategy || textFieldStrategy);
                break;
            case this.availableTypes.NAME:
                field = new FormField('text', options.strategy || nameFieldStrategy);
                break;
            case this.availableTypes.EMAIL:
                field = new FormField('email', options.strategy || emailFieldStrategy);
                break;
            case this.availableTypes.PASSWORD:
                field = new FormField('password', options.strategy || passwordFieldStrategy);
                break;
            case this.availableTypes.PHONE:
                field = new FormField('text', options.strategy || phoneFieldStrategy);
                break;
            case this.availableTypes.SUBMIT:
                field = new FormField('button');
                break;
            default:
                throw new Error('Invalid field type specified: ' + type);
        }

        $field = field.getElement();

        if (type === this.availableTypes.SUBMIT) {
            $element.setAttribute('class', 'field');
            $field.setAttribute('class', 'btn submit');
            $field.setAttribute('value', labelText);
            $element.appendChild($field);

            var formFields = this.fields;
            console.log(formFields);
            field.strategy = {
                isValid: function () {
                    var success = true;
                    formFields.forEach(function (item) {
                        if (!item.isValid()) {
                            var fieldName = item.getElement().parentNode.querySelector('label').textContent;
                            success = false;
                            alert(fieldName + ' 验证失败!');
                        }
                        return false;
                    });
                    if (success) {
                        alert('验证成功!');
                    }
                    return true;
                }
            };

            $field.addEventListener('click', function (ev) {
                field.isValid();
            }, false);

            return $element;

        } else {
            this.fields.push(field);
            $label.innerHTML = labelText;

            $field.addEventListener('focus', function (ev) {
                $tip.innerHTML = rules;
                $tip.style.color = '#ccc';
                $field.style.borderColor = '';
            }, false);

            $field.addEventListener('blur', function (ev) {
                if (field.isValid()) {
                    $tip.innerHTML = success;
                    $tip.style.color = 'green';
                    $field.style.borderColor = 'green';
                } else {
                    $tip.innerHTML = fail;
                    $tip.style.color = 'red';
                    $field.style.borderColor = 'red';
                }
            }, false);

            $tip.setAttribute('class', 'tip');

            $element.setAttribute('class', 'field');

            $element.appendChild($label);
            $element.appendChild($field);
            $element.appendChild($tip);

            return $element;
        }
    }
};

var textFieldStrategy = {
        isValid: function () {
            "use strict";
            return this.getValue() !== '';
        }
    },
    nameFieldStrategy = {
        isValid: function () {
            "use strict";
            var value = this.getValue(),
                re = /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi,
                len = value.replace(re, '##').length;
            return len >= 4 && len <= 16;
        }
    },

    emailFieldStrategy = {
        isValid: function () {
            "use strict";
            var email = this.getValue();
            return email !== '' && email.indexOf('@') > 0 && email.indexOf('.', email.indexOf('@')) > 0;
        }
    },

    passwordFieldStrategy = {
        isValid: function () {
            "use strict";
            var re = /(?!^\d+$)(?!^[a-zA-Z]+$)(?!^[_#@]+$).{8,}/;
            return re.test(this.getValue());
        }
    },

    phoneFieldStrategy = {
        isValid: function () {
            "use strict";
            var re = /^1[3|4|5|8]\d{9}$/i;
            return re.test(this.getValue());
        }
    };


function FormField(type, strategy) {
    "use strict";
    this.type = type || 'text';

    this.element = document.createElement('input');
    this.element.setAttribute('type', this.type);

    if (strategy && typeof strategy.isValid === 'function') {
        this.strategy = strategy;
    } else {
        this.strategy = {
            isValid: function () {
                return false;
            }
        };
    }
}

FormField.prototype = {
    getElement: function () {
        "use strict";
        return this.element;
    },
    getValue: function () {
        "use strict";
        return this.element.value;
    },
    setValue: function (value) {
        "use strict";
        this.element.value = value;
    },
    isValid: function () {
        "use strict";
        return this.strategy.isValid.call(this);
    }
};