/**
 * Created by aaron on 16/5/2.
 */

/* jshint strict: false */

var Box = function (box) {
    this.element = box;
    this.sideLength = parseInt(this.element.offsetWidth);
    this.coordinate = {
        x: 1,
        y: 1
    };
    this.angle = 0;
    this.direction = this.directions.FRONT;

};

Box.prototype = {
    constructor: Box,

    directions: {
        FRONT: 0,
        RIGHT: 90,
        BACK: 180,
        LEFT: 270
    },
    
    render: function () {
        this.element.style.left =  this.coordinate.x * this.sideLength + 'px';
        this.element.style.top = this.coordinate.y * this.sideLength + 'px';
        this.element.style.transform = 'rotate(' + this.angle + 'deg)';
    },

    turn: function (angle) {
        this.angle += parseInt(angle);
        this.angle = (this.angle + 360) % 360;
        this.element.style.transform = 'rotate(' + this.angle + 'deg)';
        switch (this.angle) {
            case 0: this.direction = this.directions.FRONT; break;
            case 90: this.direction = this.directions.RIGHT; break;
            case 180: this.direction = this.directions.BACK; break;
            case 270: this.direction = this.directions.LEFT; break;
            default: throw new Error('Wrong deg: ' + this.angle);
        }
    },

    go: function () {
        switch (this.direction) {
            case this.directions.FRONT:
                this.coordinate.y -= 1;
                break;
            case this.directions.RIGHT:
                this.coordinate.x += 1;
                break;
            case this.directions.BACK:
                this.coordinate.y += 1;
                break;
            case this.directions.LEFT:
                this.coordinate.x -= 1;
                break;
        }
        this.render();
    },

    getDirection: function () {
        return this.direction;
    },

    getAngle: function () {
        return this.angle;
    }
};