'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Meta = require('./Meta.Key');

var _Meta2 = _interopRequireDefault(_Meta);

var _Tool = require('../tool/Tool.Store');

var _String = require('../string/String.Formule');

var _String2 = _interopRequireDefault(_String);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = function () {
    function App() {
        var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

        _classCallCheck(this, App);

        this.key = new _Meta2.default(prefix);
    }

    _createClass(App, [{
        key: 'read',
        value: function read() {
            var name = _Tool.Session.get(this.key.run());
            var data = null;
            if (name) {
                var key = _String2.default.format(this.key.app(), { name: name });
                data = _Tool.Storage.get(key);
            }
            return data;
        }
    }, {
        key: 'write',
        value: function write(data) {
            if (data && data.name) {
                var name = data.name.toUpperCase();

                _Tool.Session.put(this.key.run(), name);

                var key = _String2.default.format(this.key.app(), { name: name });
                _Tool.Storage.put(key, data);
            }
        }
    }, {
        key: 'user',
        value: function user() {
            return _Tool.Session.get(this.key.session());
        }
    }]);

    return App;
}();

exports.default = App;