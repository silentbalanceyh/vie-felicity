'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _Meta = require('../meta/Meta.Header');

var _Meta2 = _interopRequireDefault(_Meta);

var _String = require('../string/String.Formule');

var _String2 = _interopRequireDefault(_String);

var _Ajax = require('./Ajax.Sign');

var _Ajax2 = _interopRequireDefault(_Ajax);

var _Log = require('../log/Log');

var _Log2 = _interopRequireDefault(_Log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DFT_MIME = "application/json";

var Promise = function () {
    function Promise(_ref) {
        var _this = this;

        var _ref$endpoint = _ref.endpoint,
            endpoint = _ref$endpoint === undefined ? '' : _ref$endpoint,
            _ref$key = _ref.key,
            key = _ref$key === undefined ? '' : _ref$key,
            _ref$debug = _ref.debug,
            debug = _ref$debug === undefined ? true : _ref$debug;
        var secure = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

        _classCallCheck(this, Promise);

        this.secure = secure;
        var sign = new _Ajax2.default(key, debug);
        this.sign = sign;
        if (endpoint) {
            this.endpoint = endpoint;
        } else {
            console.info("[JOY] The promise switch to relative api path instead of endpoint.");
            this.endpoint = '';
        }
        var repdor = function repdor(defer, ret) {
            return function (err, res) {
                if (err) {
                    if (res && res.body) {
                        defer.reject(res.body.error);
                    } else {
                        defer.reject(err);
                    }
                } else {
                    if (ret && Array.prototype.isPrototypeOf(ret)) {
                        ret.push(res.body.data);
                        defer.resolve(ret);
                    } else {
                        defer.resolve(res.body.data);
                    }
                }
                if (debug) {
                    _Log2.default.response(err, res);
                }
            };
        };

        this.request = function (uri) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'get';
            var ret = arguments[3];

            if (debug) {
                _Log2.default.request(uri, method, params, _this.sign.token());
            }
            var defer = _q2.default.defer();
            try {
                console.info(_this.sign.token());
                if (_this.secure) {
                    _superagent2.default[method](uri).accept(DFT_MIME).set(_Meta2.default['HTTP11']['CONTENT_TYPE'], DFT_MIME).set(_Meta2.default['HTTP11']['AUTHORIZATION'], _this.sign.token()).send(params).end(repdor(defer, ret));
                } else {
                    _superagent2.default[method](uri).accept(DFT_MIME).set(_Meta2.default['HTTP11']['CONTENT_TYPE'], DFT_MIME).send(params).end(repdor(defer, ret));
                }
            } catch (error) {
                console.error(error);
            }
            return defer.promise;
        };
        var request = this.request;
        this.promise = function (method) {
            return function (uri) {
                var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

                var api = _String2.default.format(uri, params);

                sign.signature(uri, method.toUpperCase(), params);

                api = '' + endpoint + api;
                return request(api, params, method.toLowerCase(), secure);
            };
        };
    }

    _createClass(Promise, [{
        key: 'flowGet',
        value: function flowGet(uri) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var ret = arguments[2];

            var api = _String2.default.format(uri, params);

            this.sign.signature(api, "GET", params);

            var query = _String2.default.query(params, 0 > uri.indexOf('?') ? 0 : 1);
            api = api + query;

            api = '' + this.endpoint + api;
            return this.request(api, params, "get", ret);
        }
    }, {
        key: 'get',
        value: function get(uri) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            return this.flowGet(uri, params);
        }
    }, {
        key: 'post',
        value: function post(uri) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            var request = this.promise('post');
            return request(uri, params);
        }
    }, {
        key: 'put',
        value: function put(uri) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            var request = this.promise('put');
            return request(uri, params);
        }
    }], [{
        key: '_',
        value: function _() {
            var store = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            var defer = _q2.default.defer();
            defer.resolve(store);
            return defer.promise;
        }
    }]);

    return Promise;
}();

exports.default = Promise;