'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Log = require('./log/Log');

Object.defineProperty(exports, 'Loch', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Log).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }