'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _randomJs = require('random-js');

var _randomJs2 = _interopRequireDefault(_randomJs);

var _uuid = require('uuid');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var string = function string(length) {
    if (!length) {
        console.error("[JOY] Input parameter 'length' must be valid number for random string.");
    }
    var engine = _randomJs2.default.engines.mt19937().autoSeed();
    return _randomJs2.default.string()(engine, length);
};

exports.default = {
    string: string,
    uuid: _uuid.v4
};