'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _antd = require('antd');

var error = function error() {
    var title = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var content = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var onOk = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {
        console.warn("[JOY] The onOk function has not been implemented.");
    };

    _antd.Modal.error({
        title: title, content: content, onOk: onOk
    });
};

var confirm = function confirm() {
    var title = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var content = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var onOk = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {
        console.warn("[JOY] The onOk function has not been implemented.");
    };

    _antd.Modal.confirm({
        title: title, content: content, onOk: onOk
    });
};

var $confirm = function $confirm() {
    var title = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var content = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var onOk = arguments[2];

    return function () {
        confirm(title, content, onOk);
    };
};

exports.default = {
    error: error,
    confirm: confirm,
    $confirm: $confirm
};