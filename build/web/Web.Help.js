"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var move = function move() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var step = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var target = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var fnFlush = props.fnFlush,
        $step = props.$step;

    if (fnFlush) {
        var _$step$to = $step.to(),
            _$step$to$current = _$step$to.current,
            current = _$step$to$current === undefined ? 0 : _$step$to$current;

        if (current < step) {
            fnFlush(target);
        }
    }
};

exports.default = {
    move: move
};