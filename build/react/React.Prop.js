"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var extract = function extract() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var keys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    var attrs = {};
    keys.forEach(function (key) {
        var dataKey = "$" + key;
        if (props.hasOwnProperty(dataKey)) {
            attrs[dataKey] = props[dataKey];
        }
    });
    return attrs;
};

var _prefix = function _prefix() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var keys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var prefix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";

    var attrs = {};
    keys.forEach(function (key) {
        var dataKey = prefix + "_" + key.replace(/\./g, "_");
        if (props.hasOwnProperty(dataKey)) {
            attrs[dataKey] = props[dataKey];
        }
    });
    return attrs;
};

exports.default = {
    extract: extract,
    t: function t() {
        var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var keys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
        return _prefix(props, keys, "t");
    },
    a: function a() {
        var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var keys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
        return _prefix(props, keys, "a");
    }
};