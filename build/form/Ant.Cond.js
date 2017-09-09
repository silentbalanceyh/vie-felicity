"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var rLength = function rLength(value, item) {
    if (value) {
        var length = value.length;
        if (0 <= item.indexOf("<")) {} else if (0 <= item.indexOf(">")) {
            var expected = Number(item.substring(item.indexOf(">") + 1));
            return length > expected;
        } else {}
    } else {
        return false;
    }
};
var rBool = function rBool(value, item) {
    return Boolean(item) === value;
};
var JFun = {
    length: rLength,
    bool: rBool
};
var _execRules = function _execRules(value) {
    var rules = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var passed = true;

    for (var key in rules) {
        var executor = JFun[key];
        var item = rules[key];
        passed = executor(value, item);
        if (!passed) {
            break;
        }
    }
    return passed;
};

var preCheck = function preCheck(form, trigger, value) {
    if (!form) {
        console.warn("[JOY] Form reference is invalid, error will occurs. ", form);
    }

    if (trigger) {
        var values = form.getFieldsValue();
        var passed = true;

        for (var field in trigger) {
            var _value = values[field];

            var rules = trigger[field];

            passed = _execRules(_value, rules);
            if (!passed) {
                break;
            }
        }
        return passed;
    } else {
        return true;
    }
};

var execute = function execute(form) {
    var rule = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var callback = arguments[2];
    var executor = arguments[3];

    var ready = preCheck(form, rule.$trigger);
    if (ready) {
        var message = executor();
        if (message) {
            callback(message);
        } else {
            callback();
        }
    } else {
        callback();
    }
};

exports.default = {
    execute: execute
};