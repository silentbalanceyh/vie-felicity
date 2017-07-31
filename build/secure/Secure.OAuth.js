'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Tool = require('../tool/Tool.Store');

var _Meta = require('../meta/Meta.Key');

var _Meta2 = _interopRequireDefault(_Meta);

var _Tool2 = require('../tool/Tool.Encrypt');

var _Tool3 = _interopRequireDefault(_Tool2);

var _Ajax = require('../ajax/Ajax.Promise');

var _Ajax2 = _interopRequireDefault(_Ajax);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var OAuth = function () {
    function OAuth(_ref) {
        var _ref$endpoint = _ref.endpoint,
            endpoint = _ref$endpoint === undefined ? '' : _ref$endpoint,
            _ref$key = _ref.key,
            key = _ref$key === undefined ? '' : _ref$key,
            _ref$debug = _ref.debug,
            debug = _ref$debug === undefined ? true : _ref$debug;

        _classCallCheck(this, OAuth);

        this.key = new _Meta2.default(key);

        this.$secure = new _Ajax2.default({ endpoint: endpoint, key: key, debug: debug });
        this.$public = new _Ajax2.default({ endpoint: endpoint, key: key, debug: debug }, false);
    }

    _createClass(OAuth, [{
        key: 'token',
        value: function token(_ref2) {
            var client_id = _ref2.client_id,
                code = _ref2.code;
            var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var session = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

            if (client_id && code) {
                var params = { client_id: client_id, code: code, grant_type: 'authorization_code' };

                var uri = '/api/oth/token';
                var promise = this.$public.post(uri, params);
                var key = this.key;
                promise.then(function (data) {
                    if (data.code) delete data.code;
                    session = Object.assign(session, data);

                    if (session['clientSecret']) delete session['clientSecret'];

                    _Tool.Session.put(key.session(), session);
                    if (callback.success) callback.success(session);
                }).fail(function (error) {
                    if (callback.failure) callback.failure(error);
                });
            } else {
                console.warn("[OAuth] 'code' or 'clientId' missing when requesting token.");
            }
        }
    }, {
        key: 'authorize',
        value: function authorize() {
            var user = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var session = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

            var params = {};
            var client_id = user['uniqueId'];
            params['scope'] = user['scope'];
            params['client_id'] = client_id;
            params['client_secret'] = user['clientSecret'];
            params['response_type'] = 'code';

            var uri = '/api/oth/authorize';
            var promise = this.$public.post(uri, params);
            var token = this.token;
            promise.then(function (data) {
                token({
                    client_id: client_id,
                    code: data.code
                }, callback, session);
            }).fail(function (error) {
                if (callback) callback.failure(error);
            });
        }
    }, {
        key: 'login',
        value: function login() {
            var entry = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
                success: function success() {
                    return console.warn("[JOY] (login) Success of callback not implemented.");
                },
                failure: function failure() {
                    return console.warn("[JOY] (login) Failure of callback not implemented.");
                }
            };
            var session = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

            params.password = _Tool3.default.md5(params.password);

            var promise = this.$public.post(entry, params);

            var authorize = this.authorize;
            promise.then(function (data) {
                Object.assign(session, data);
                authorize(data, callback, session);
            }).fail(function (error) {
                if (callback) callback.failure(error);
            });
        }
    }, {
        key: 'cipher',
        value: function cipher() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
                success: function success() {
                    return console.warn("[JOY] (cipher) Success of callback not implemented.");
                },
                failure: function failure() {
                    return console.warn("[JOY] (cipher) Failure of callback not implemented.");
                }
            };
            var session = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

            var data = {};
            data['id'] = params['uniqueId'];
            data['opassword'] = _Tool3.default.md5(params['opassword']);
            data['npassword'] = _Tool3.default.md5(params['npassword']);

            var uri = '/api/user/cipher';
            var promise = this.$secure.put(uri, params);

            promise.then(function (data) {
                if (callback.success) callback.success(data);
            }).fail(function (error) {
                if (callback.failure) callback.failure(error);
            });
        }
    }, {
        key: 'forbidden',
        value: function forbidden() {
            var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var uri = arguments[1];
            var fnCallback = arguments[2];

            var session = this.user();
            if (!session) {
                var _props$$router = props.$router,
                    $router = _props$$router === undefined ? { to: function to() {} } : _props$$router;

                $router.to(uri);
            } else {
                if (fnCallback) {
                    fnCallback();
                }
            }
        }
    }, {
        key: 'logout',
        value: function logout() {
            var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var uri = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

            var session = this.user();
            if (session) {
                _Tool.Session.remove(this.key.session());
                var $router = props.$router,
                    $app = props.$app;

                if ($app.is()) {
                    uri = '/' + $app._('path') + uri;
                }
                $router.to(uri);
            }
        }
    }]);

    return OAuth;
}();

exports.default = OAuth;