'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _MetaHeader = require('../meta/Meta.Header.json');

var _MetaHeader2 = _interopRequireDefault(_MetaHeader);

var _String = require('../string/String.Formule');

var _String2 = _interopRequireDefault(_String);

var _Ajax = require('./Ajax.Sign');

var _Ajax2 = _interopRequireDefault(_Ajax);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _repdor = function _repdor(defer, ret) {
    return function (err, res) {
        if (err) {
            if (res && res.body) {
                defer.resolve(res.body.error);
            } else {
                defer.reject(err);
            }
        } else {
            if (ret) {
                ret.push(res.body.data);
                defer.resolve(ret);
            } else {
                defer.resolve(res.body.data);
            }
        }
    };
};

var DFT_MIME = "application/json";

var Promise = function () {
    function Promise(endpoint) {
        var _this = this;

        var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
        var secure = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

        _classCallCheck(this, Promise);

        this.secure = secure;
        var sign = new _Ajax2.default(prefix);
        this.sign = sign;
        if (endpoint) {
            this.endpoint = endpoint;
        } else {
            console.info("[JOY] The promise switch to relative api path instead of endpoint.");
            this.endpoint = '';
        }

        this.request = function (uri) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'get';
            var ret = arguments[3];

            var defer = _q2.default.defer();
            try {
                if (_this.secure) {
                    _superagent2.default[method](uri).accept(DFT_MIME).set(_MetaHeader2.default['HTTP11']['CONTENT_TYPE'], DFT_MIME).set(_MetaHeader2.default['HTTP11']['AUTHORIZATION'], _this.sign.token()).send(params).end(_repdor(defer, ret));
                } else {
                    _superagent2.default[method](uri).accept(DFT_MIME).set(_MetaHeader2.default['HTTP11']['CONTENT_TYPE'], DFT_MIME).send(params).end(_repdor(defer, ret));
                }
            } catch (error) {
                console.error(error);
            }
            return defer;
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
            var ret = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

            var api = _String2.default.format(uri, params);

            this.sign.signature(api, "GET", params);

            var query = _String2.default.query(params, 0 > uri.indexOf('?') ? 0 : 1);
            api = api + query;

            api = '' + this.endpoint + api;
            return this.request(uri, params, "get", ret);
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

exports.default = function (endpoint) {
    return new Promise(endpoint);
};