"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var _click = function _click(id) {
    if (id && document) {
        var ele = document.getElementById(id);
        if (ele) {
            ele.click(id);
        } else {
            console.warn("[JOY] Connected element could not be found. id " + id);
        }
    } else {
        console.warn("[JOY] Connected environment is invalid. ");
    }
};
exports.default = {
    $: {
        click: function click(id) {
            return function () {
                _click(id);
            };
        }
    }
};