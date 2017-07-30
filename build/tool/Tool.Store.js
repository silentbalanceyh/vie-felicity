"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var put = function put(reference) {
    return function (key, value) {
        if (reference && value && key) {
            if (Object.prototype.isPrototypeOf(value)) {
                value = JSON.stringify(value);
            }
            reference.setItem(key, value);
        } else {
            console.warn("[JOY] (put) Your browser does not support sessionStorage/localStorage.");
        }
    };
};

var get = function get(reference) {
    return function (key) {
        if (reference && key) {
            var value = reference.getItem(key);
            try {
                value = JSON.parse(value);
            } catch (error) {}
            return value;
        } else {
            console.warn("[JOY] (get) Your browser does not support sessionStorage/localStorage.");
        }
    };
};

var remove = function remove(reference) {
    return function (key) {
        if (reference) {
            reference.removeItem(key);
        } else {
            console.warn("[JOY] (remove) Your browser does not support sessionStorage/localStorage. ");
        }
    };
};

var clear = function clear(reference) {
    return function () {
        if (reference) {
            reference.clear();
        } else {
            console.warn("[JOY] (clear) Your browser does not support sessionStorage/localStorage. ");
        }
    };
};

var Session = exports.Session = {
    put: put(window.sessionStorage),
    get: get(window.sessionStorage),
    remove: remove(window.sessionStorage),
    clear: clear(window.sessionStorage)
};

var Storage = exports.Storage = {
    put: put(window.localStorage),
    get: get(window.localStorage),
    remove: remove(window.localStorage),
    clear: clear(window.localStorage)
};