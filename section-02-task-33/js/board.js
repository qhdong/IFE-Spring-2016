/**
 * Created by aaron on 16/5/2.
 */
/* jshint strict: false */

var Board = function (options) {
    options = options || {};
    this.element = options.element;
    this.COLUMNS = options.columns || 10;
    this.ROWS = options.rows || 10;
};

Board.prototype = {
    constructor: Board,

    render: function () {
        var row,
            col,
            classList,
            html = '';

        for (row = 0; row <= this.ROWS; row++) {
            html += '<tr>';
            for (col = 0; col <= this.COLUMNS; col++) {
                if (row === 0 && col === 0) {
                    html += '<td></td>';
                } else if (row === 0) {
                    html += '<td class="board-grid x-axis">' + col + '</td>';
                } else if (col === 0) {
                    html += '<td class="board-grid y-axis">' + row + '</td>';
                } else {
                    classList = ['board-grid'];
                    if (row === 1) {
                        classList.push('board-top');
                    } else if (row === this.ROWS) {
                        classList.push('board-bottom');
                    }
                    if (col === 1) {
                        classList.push('board-left');
                    } else if (col === this.COLUMNS) {
                        classList.push('board-right');
                    }
                    html += '<td class="' + classList.join(' ') + '"></td>';
                }
            }
            html += '</tr>';
        }

        this.element.innerHTML = html;
    }
};