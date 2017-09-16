'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Flow = function () {
    function Flow(promise) {
        _classCallCheck(this, Flow);

        this.promise = promise;
        this.replace = function () {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var replaced = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

            var target = {};
            for (var key in params) {
                var expr = params[key];
                var value = null;
                if (expr && 0 < expr.indexOf('.')) {
                    var meta = expr.toString().split('.');
                    if (Array.prototype.isPrototypeOf(meta)) {
                        var index = meta[0];
                        var field = meta[1];
                        if (undefined !== index && field) {
                            var element = replaced[index];
                            if (element) {
                                value = element[field];
                            } else {
                                target[key] = expr;
                            }
                        }
                    }
                    if (undefined !== value) {
                        target[key] = value;
                    }
                } else {
                    target[key] = expr;
                }
            }
            return target;
        };
    }

    _createClass(Flow, [{
        key: 'catena',
        value: function catena(promise) {
            var _this = this;

            var next = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
            var reference = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

            if (0 === next.length) {
                return promise;
            } else {
                var config = next[0];
                var nextPromise = promise.then(function (data) {
                    reference.push(data);
                    var uri = config.uri,
                        _config$params = config.params,
                        params = _config$params === undefined ? {} : _config$params;

                    var target = _this.replace(params, reference);
                    return _this.promise.flowGet(uri, target, reference);
                });

                if (1 === next.length) {
                    return nextPromise;
                } else {
                    var left = next.slice(1);
                    return this.catena(nextPromise, left, reference);
                }
            }
        }
    }, {
        key: 'parallel',
        value: function parallel(promise) {
            var _this2 = this;

            var multi = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
            var reference = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

            if (0 === multi.length) {
                return promise;
            } else {
                return promise.then(function (data) {
                    reference["-1"] = data;
                    var fnReplace = _this2.replace;
                    var promiseReference = _this2.promise;

                    var parallelPromise = function parallelPromise() {
                        var multi = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
                        var replaced = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

                        var result = [];
                        multi.forEach(function (config) {
                            var uri = config.uri,
                                _config$params2 = config.params,
                                params = _config$params2 === undefined ? {} : _config$params2,
                                _config$secure = config.secure,
                                secure = _config$secure === undefined ? true : _config$secure;

                            var target = fnReplace(params, replaced);
                            var promise = promiseReference.get(uri, target);
                            result.push(promise);
                        });
                        return _q2.default.all(result);
                    };

                    return parallelPromise(multi, reference).then(function (parallelData) {
                        var ret = [];
                        ret.push(data);
                        var parallel = {};
                        multi.forEach(function (item, index) {
                            if (item.key) {
                                var response = parallelData[index];
                                if (response) {
                                    parallel[item.key] = response.list;
                                }
                            }
                        });
                        ret.push(parallel);
                        return ret;
                    });
                });
            }
        }
    }]);

    return Flow;
}();

exports.default = Flow;