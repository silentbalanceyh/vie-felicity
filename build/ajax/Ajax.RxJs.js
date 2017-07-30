'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

require('rxjs/add/operator/map');

require('rxjs/add/operator/switchMap');

require('rxjs/add/observable/from');

var _rxjs = require('rxjs');

var $ = function $(type, $action, fnPromise, fnCallback) {
    return $action.ofType(type).map(function (action) {
        return action.payload;
    }).switchMap(function (payload) {
        var promise = fnPromise(payload);

        return _rxjs.Observable.from(promise).map(fnCallback);
    });
};

exports.default = {
    $: $
};