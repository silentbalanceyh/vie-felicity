"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var now = function now() {
    var pattern = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "YYYY-MM-DD";

    return (0, _moment2.default)().format(pattern);
};

var duration = function duration(from, to) {
    var flag = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "seconds";

    if (from && _moment2.default.isMoment(from) && to && _moment2.default.isMoment(to)) {
        return to.diff(from, flag);
    } else {
        console.warn("[JOY] Please check your parameters 'from' and 'to', they are invalid.", from, to);
    }
};

var end = function end(start) {
    var adjust = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var flag = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "seconds";

    if (start && start.isMoment(start)) {
        var $start = (0, _moment2.default)(start);
        if (0 < adjust) {
            return $start.add(adjust, flag);
        } else {
            return $start.substract(adjust, flag);
        }
    } else {
        console.warn("[JOY] Please check your parameter 'start'.", start);
    }
};

exports.default = {
    now: now,
    duration: duration,
    end: end
};