'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var _formatArray = function _formatArray() {
    var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    if (Array.prototype.isPrototypeOf(args) && 0 < args.length) {
        args.forEach(function (item, index) {
            if (0 <= input.indexOf(':' + index) && item) {
                var replaced = new RegExp('\\:' + index, 'gm');
                input = input.replace(replaced, item);
            }
        });
    }
    return input;
};

var _formatNamed = function _formatNamed() {
    var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (!Array.prototype.isPrototypeOf(params) && 0 < Object.keys(params).length) {
        for (var key in params) {
            var value = params[key];
            if (0 <= input.indexOf(':' + key) && value) {
                var replaced = new RegExp('\\:' + key, 'gm');
                input = input.replace(replaced, value);
                delete params[key];
            }
        }
    }
    return input;
};
var format = function format() {
    var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
    var params = arguments[1];

    if (params) {
        if (Array.prototype.isPrototypeOf(params)) {
            input = _formatArray(input, params);
        } else {
            input = _formatNamed(input, params);
        }
    }
    return input;
};
var query = function query() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var idx = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    var queryStr = '';
    for (var key in params) {
        if (params.hasOwnProperty(key)) {
            var value = params[key];
            if (value) {
                var kv = key + '=' + encodeURIComponent(value);
                if (0 === idx) {
                    queryStr += '?' + kv;
                } else {
                    queryStr += '&' + kv;
                }
                idx++;
            }
        }
    }
    return queryStr;
};
var message = function message() {
    var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    if (params && Array.prototype.isPrototypeOf(params) && 0 < params.length) {
        params.forEach(function (item, index) {
            var reg = new RegExp('\\{' + index + '\\}', "gm");
            input = input.replace(reg, item);
        });
    }
    return input;
};
var currency = function currency(num) {
    var oldNum = num;
    num = Math.abs(num);

    var result = '',
        counter = 0;
    var decimal = num.toString().split('.')[1];
    if (!decimal) {
        decimal = "00";
    } else {
        decimal = decimal.substring(0, 2);

        if (2 > decimal.toString().length) {
            decimal = decimal + "0";
        }
    }
    var int = num.toString().split('.')[0];
    int = (int || 0).toString();
    for (var i = int.length - 1; i >= 0; i--) {
        counter++;
        result = int.charAt(i) + result;
        if (!(counter % 3) && i !== 0) {
            result = ',' + result;
        }
    }
    if (0 > oldNum) {
        return "-" + result + '.' + decimal;
    } else {
        return result + '.' + decimal;
    }
};
exports.default = {
    format: format,
    message: message,
    query: query,
    currency: currency
};