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

exports.default = {
    now: now
};