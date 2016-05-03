/**
 * Created by aaron on 16/5/2.
 */

/* global Board, Box, Commander, Controller */

(function () {
    "use strict";

    var $table = document.getElementById('board'),
        $box = document.getElementById('box'),
        $input = document.getElementById('command'),
        board = new Board({
            element: $table,
            rows: 10,
            columns: 10
        }),
        box = new Box($box),
        controller = new Controller(board, box, $input);

}());