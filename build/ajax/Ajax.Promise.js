"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Promise = function Promise(endpoint) {
    _classCallCheck(this, Promise);

    if (endpoint) {
        this.endpoint = endpoint;
    } else {
        console.info("[JOY] The promise switch to relative api path instead of endpoint.");
        this.endpoint = '';
    }
};

exports.default = function (endpoint) {
    return new Promise(endpoint);
};