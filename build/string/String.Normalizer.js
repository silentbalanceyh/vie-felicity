"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var integer = function integer(length) {
    return function (value) {
        if (value) {
            value = value.toString();
            if (1 === value.length) {
                value = value.replace(/[^1-9]/g, "");
            } else {
                value = value.replace(/\D/g, "");
            }

            if (0 < length) {
                if (length < value.length) {
                    value = value.substring(0, length);
                }
            }
        }
        return value;
    };
};
var decimal = function decimal(length, scale) {
    return function (value) {
        if (value) {
            value = value.toString();
            value = value.replace(/[^\d.]/g, "");
            value = value.replace(/\.{2,}/g, ".");
            value = value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
            var scaleReg = new RegExp("(\\-)*(\\d+)\\.(\\d{" + scale + "}).");
            value = value.replace(scaleReg, "$1$2.$3");
            if (length < value.length) {
                value = value.substring(0, length);
            }
            return value;
        }
        return value;
    };
};
exports.default = {
    integer: integer,
    decimal: decimal
};