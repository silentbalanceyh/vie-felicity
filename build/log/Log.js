'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Log = require('./Log.Ajax');

var _Log2 = _interopRequireDefault(_Log);

var _Log3 = require('./Log.React');

var _Log4 = _interopRequireDefault(_Log3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    sign: _Log2.default.sign,
    request: _Log2.default.request,
    response: _Log2.default.response,

    control: _Log4.default.control,
    container: _Log4.default.container,
    components: _Log4.default.components,
    form: _Log4.default.form,
    stateless: _Log4.default.stateless,
    hoc: _Log4.default.hoc,
    reuse: _Log4.default.reuse
};