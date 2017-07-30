"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var group = function group() {
    var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var field = arguments[1];
    var meta = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var result = {};
    array.forEach(function (item) {
        var key = item[field];

        if (meta[key]) key = meta[key];
        if (!result[key]) {
            result[key] = [];
        }
        result[key].push(item);
    });
    return result;
};

var sort = function sort() {
    var left = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
    var right = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
    var asc = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

    var minLen = Math.min(left.length, right.length);
    var order = 0;
    for (var idx = 0; idx < minLen; idx++) {
        var leftCode = left.charCodeAt(idx);
        var rightCode = right.charCodeAt(idx);
        if (leftCode !== rightCode) {
            if (asc) {
                order = leftCode - rightCode;
            } else {
                order = rightCode - leftCode;
            }
            break;
        }
    }
    return order;
};

exports.default = {
    group: group,
    sort: sort
};