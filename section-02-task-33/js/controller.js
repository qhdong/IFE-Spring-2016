/**
 * Created by aaron on 16/5/3.
 */
/* jshint strict:false */

var Controller = function (board, box, commander) {
    this.board = board;
    this.board.render.call(this.board);
    
    this.box = box;
    this.box.render.call(this.box);

    var that = this;
    this.commander = commander;
    this.commander.addEventListener('keyup', function (event) {
        if (event && event.keyCode === 13) {
            that.parseCommand(that.commander.value.trim());
        }
    });
};

Controller.prototype = {
    constructor: Controller,

    commands: [
        {
            pattern: /^go$/i,
            handler: function () {
                if ((this.box.coordinate.y === 1 && this.box.direction === this.box.directions.FRONT) ||
                    (this.box.coordinate.x === 1 && this.box.direction === this.box.directions.LEFT) ||
                    (this.box.coordinate.y === this.board.ROWS && this.box.direction === this.box.directions.BACK) ||
                    (this.box.coordinate.x === this.board.COLUMNS && this.box.direction === this.box.directions.RIGHT)) {
                    console.log('touch the edge.');
                    return;
                }
                this.box.go.call(this.box);
            }
        }, {
            pattern: /^tun\s+(lef|rig|bac)$/i,
            handler: function (direction) {
                this.box.turn.call(this.box, {lef: -90, rig: 90, bac: 180}[direction]);
            }
        }
    ],

    parseCommand: function (str) {
        var i,
            command;

        for (i = 0; i < this.commands.length; i++) {
            command = this.commands[i];
            var match = str.match(command.pattern);
            if (match) {
                match.shift();
                command.handler.apply(this, match);
                return true;
            }
        }
        throw new Error('parse error for command: ' + str);
    }

};
