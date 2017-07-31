'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _Type = require('../type/Type.Date');

var _Type2 = _interopRequireDefault(_Type);

var _Tool = require('../tool/Tool.Encrypt');

var _Tool2 = _interopRequireDefault(_Tool);

var _Log = require('../log/Log');

var _Log2 = _interopRequireDefault(_Log);

var _Secure = require('../secure/Secure.OAuth');

var _Secure2 = _interopRequireDefault(_Secure);

var _Meta = require('../meta/Meta.App');

var _Meta2 = _interopRequireDefault(_Meta);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SCHEMA = {
    "OAuth": "Bearer",
    "Basic": "Basic"
};

var _parameters = function _parameters() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var param = '';
    var keys = Object.keys(params).sort();
    if (0 < keys.length) {
        keys.forEach(function (key) {
            if ("pager" === key) {
                var pager = params[key];
                if ("string" === typeof params[key]) {
                    pager = JSON.parse(params[key]);
                }
                if (pager) {
                    var sign = ':index' + pager.index + 'size' + pager.size;
                    param += key + sign + ':';
                } else {
                    param += key + ':';
                }
            } else {
                if ("criterias" !== key) {
                    if (params[key]) {
                        if ("object" === _typeof(params[key])) {
                            param += key + JSON.stringify(params[key]) + ':';
                        } else {
                            param += key + params[key] + ':';
                        }
                    } else {
                        if (false === params[key]) {
                            param += key + "false:";
                        } else if (undefined !== params[key]) {
                            param += key + params[key] + ':';
                        }
                    }
                }
            }
        });
    }
    return param;
};

var Sign = function () {
    function Sign() {
        var _this = this;

        var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        var debug = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

        _classCallCheck(this, Sign);

        this.app = new _Meta2.default(prefix);
        this.debug = debug;

        this.secret = function (seed) {
            var user = _this.app.user();
            var secret = _Type2.default.now("YYYYMMDDHH");
            if (user && 'object' === (typeof user === 'undefined' ? 'undefined' : _typeof(user))) {
                seed += user['uniqueId'];
                secret = user['token'];
            }
            return { seed: seed, secret: secret };
        };
    }

    _createClass(Sign, [{
        key: 'signature',
        value: function signature(uri) {
            var method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "GET";
            var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

            var seed = method.toUpperCase();
            seed += ":";
            seed += _parameters(params);
            seed += '' + uri;
            seed += "$";

            var secretObj = this.secret(seed);
            seed = secretObj.seed;
            var secret = secretObj.secret;

            var sig = _Tool2.default.hmSha512(seed, secret);
            if (this.debug) {
                _Log2.default.sign(uri, method, params, {
                    sig: sig, secret: secret, seed: seed
                });
            }

            params['sig'] = sig;
        }
    }, {
        key: 'token',
        value: function token() {
            var app = this.app.read();
            var header = '';
            if (app) {
                var auth = app.auth;
                var prefix = SCHEMA[auth];
                var user = this.app.user();
                if (user) {
                    var value = _Tool2.default.b64Enc(user['uniqueId'] + ':' + user['token']);
                    header = prefix + ' ' + value;
                }
            }
            return header;
        }
    }]);

    return Sign;
}();

exports.default = Sign;