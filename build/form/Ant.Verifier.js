"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var _triggered = function _triggered() {
    var rule = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var values = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
    var _trigger = rule._trigger;

    if (_trigger) {
        if (_trigger.min && values.length < _trigger.min) {
            return false;
        }

        if (_trigger.max && values.length > _trigger.max) {
            return false;
        }
    }

    return true;
};
var diff = function diff() {
    var form = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return function () {
        var rule = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var values = arguments[1];
        var callback = arguments[2];

        if (!rule['_target']) {
            console.warn("[JOY] Please check your configuration for rule: diff. '_target' missing.");
        }
        var ready = _triggered(rule, values);
        if (ready) {
            var _target = rule._target,
                message = rule.message;

            var compared = form.getFieldValue(_target);
            if (compared === values) {
                callback(message);
            } else {
                callback();
            }
        } else {
            callback();
        }
    };
};
var same = function same() {
    var form = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return function () {
        var rule = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var values = arguments[1];
        var callback = arguments[2];

        if (!rule['_target']) {
            console.warn("[JOY] Please check your configuration for rule: same. '_target' missing.");
        }

        var ready = _triggered(rule, values);
        if (ready) {
            var _target = rule._target,
                message = rule.message;

            var compared = form.getFieldValue(_target);
            if (compared !== values) {
                callback(message);
            } else {
                callback();
            }
        } else {
            callback();
        }
    };
};
exports.default = {
    diff: diff,
    same: same
};