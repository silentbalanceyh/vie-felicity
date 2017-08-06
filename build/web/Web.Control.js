'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Web = require('./Web.Op');

var _Web2 = _interopRequireDefault(_Web);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toolbar = function toolbar() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (!props.left || !props.right) {
        console.warn("[JOY] Please check your input configuration of toolbar.");
    }
    var left = _immutable2.default.fromJS(props.left).toJS();
    left.forEach(function (item) {
        if (item.connect) {
            var id = item.connect;
            item.connect = _Web2.default.$.click(id);
        }
    });
    var right = _immutable2.default.fromJS(props.right).toJS();
    right.forEach(function (item) {
        if (item.connect) {
            var id = item.connect;
            item.connect = _Web2.default.$.click(id);
        }
    });
    return { left: left, right: right };
};

exports.default = {
    "control.bar.ToolBar": toolbar
};