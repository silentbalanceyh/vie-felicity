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
    var _props$left = props.left,
        left = _props$left === undefined ? [] : _props$left,
        _props$right = props.right,
        right = _props$right === undefined ? [] : _props$right;

    left.forEach(function (item) {
        if (item.connect) {
            var $item = _immutable2.default.fromJS(item).toJS();
            item.connect = _Web2.default.$.click($item.connect);
        }
    });
    right.forEach(function (item) {
        if (item.connect) {
            var $item = _immutable2.default.fromJS(item).toJS();
            item.connect = _Web2.default.$.click($item.connect);
        }
    });
    return { left: left, right: right };
};

exports.default = {
    "control.bar.ToolBar": toolbar
};