'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _MetaHeader = require('../meta/Meta.Header.json');

var _MetaHeader2 = _interopRequireDefault(_MetaHeader);

var _String = require('../string/String.Formule');

var _String2 = _interopRequireDefault(_String);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Promise = function Promise(endpoint) {
    var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    _classCallCheck(this, Promise);

    if (endpoint) {
        this.endpoint = endpoint;
        this.prefix = prefix;
    } else {
        console.info("[JOY] The promise switch to relative api path instead of endpoint.");
        this.endpoint = '';
        this.prefix = '';
    }
};

exports.default = function (endpoint) {
    return new Promise(endpoint);
};