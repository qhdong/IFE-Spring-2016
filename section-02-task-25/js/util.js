var $ = function (el) {
    "use strict";
    return document.querySelector(el);
};

$.delay =

(function () {
    "use strict";

    var root = window;
    var previous$ = root.$;
    
    var $ = function (el) {
        return document.querySelector(el);
    };
    
    root.$ = $;

    $.delay = function (fn, t) {
        var queue = [], self, timer;
        function schedule(fn, t) {
            timer = setTimeout(function() {
                timer = null;
                fn();
                if (queue.length) {
                    var next = queue.shift();
                    schedule(next.fn, next.t);
                }
            }, t);
        }
        self = {
            delay: function(fn, t) {
                if (queue.length || timer) {
                    queue.push({fn: fn, t: t});
                } else {
                    schedule(fn, t);
                }
                return self;
            },
            cancel: function() {
                clearTimeout(timer);
                queue = [];
            }
        };
        return self.delay(fn, t);
    };

    $.addEvent = function (element, event, handler) {
        if (element.addEventListener) {
            element.addEventListener(event, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent('on' + event, handler);
        } else {
            element['on'+event] = handler;
        }
    };

    $.delegateEvent = function (element, event, tag, handler) {
        $.addEvent(element, event, function (e) {
            var ev = e || window.event,
                target = ev.target || ev.srcElement;
            if (target && target.tagName === tag.toUpperCase()) {
                handler.call(target, ev);
            }
        });
    };

}());