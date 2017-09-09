"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Ant = require("./Ant.Cond");

var _Ant2 = _interopRequireDefault(_Ant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var diff = function diff() {
    var form = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return function () {
        var rule = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var values = arguments[1];
        var callback = arguments[2];

        if (!rule["$comparedTo"]) {
            console.warn("[JOY] Please check your configuration for rule: diff. '$comparedTo' missing.");
        }
        _Ant2.default.execute(form, rule, callback, function () {
            var compared = form.getFieldValue(rule.$comparedTo);
            return compared === values ? rule.message : false;
        });
    };
};
var same = function same() {
    var form = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return function () {
        var rule = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var values = arguments[1];
        var callback = arguments[2];

        if (!rule["$comparedTo"]) {
            console.warn("[JOY] Please check your configuration for rule: same. '$comparedTo' missing.");
        }

        _Ant2.default.execute(form, rule, callback, function () {
            var compared = form.getFieldValue(rule.$comparedTo);
            return compared !== values ? rule.message : false;
        });
    };
};
var required = function required() {
    var form = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return function () {
        var rule = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var values = arguments[1];
        var callback = arguments[2];

        _Ant2.default.execute(form, rule, callback, function () {
            return !values ? rule.message : false;
        });
    };
};

var _prepare = function _prepare() {
    var form = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var rule = arguments[1];
    var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    if (rule["$params"]) {
        for (var name in rule.$params) {
            var target = rule.$params[name];
            if (target) {
                var value = form.getFieldValue(target);
                if (value) {
                    params[name] = value;
                }
            }
        }
    }
};
var duplicated = function duplicated() {
    var form = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var generator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return function () {
        var rule = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var values = arguments[1];
        var callback = arguments[2];

        if (!rule["$ajax"]) {
            console.warn("[JOY] Please check your configuration for rule: duplicated. '$ajax' missing.");
        }

        if (values) {
            var uri = rule.uri ? rule.uri : "/api/vlv/rule/duplicated";
            var _rule$$ajax = rule.$ajax,
                identifier = _rule$$ajax.identifier,
                name = _rule$$ajax.name;

            var params = { identifier: identifier, name: name, value: values };

            _prepare(form, rule, params);
            var promise = generator.post(uri, params);
            promise.then(function (data) {
                if (data) {
                    callback();
                } else {
                    var message = rule.message;

                    callback(message);
                }
            });
        } else {
            callback();
        }
    };
};
var existing = function existing() {
    var form = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var generator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return function () {
        var rule = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var values = arguments[1];
        var callback = arguments[2];

        if (!rule["$ajax"]) {
            console.warn("[JOY] Please check your configuration for rule: existing. '$ajax' missing.");
        }

        if (values) {
            var uri = rule.uri ? rule.uri : "/api/vlv/rule/existing";
            var _rule$$ajax2 = rule.$ajax,
                identifier = _rule$$ajax2.identifier,
                name = _rule$$ajax2.name;

            var params = { identifier: identifier, name: name, value: values };

            _prepare(form, rule, params);
            var promise = generator.post(uri, params);
            promise.then(function (data) {
                if (data) {
                    callback();
                } else {
                    var message = rule.message;

                    callback(message);
                }
            });
        } else {
            callback();
        }
    };
};
exports.default = {
    diff: diff,
    same: same,
    required: required,
    duplicated: duplicated,
    existing: existing
};