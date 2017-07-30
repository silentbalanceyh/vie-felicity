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

var _Ajax = require('./ajax/Ajax.RxJs');

Object.defineProperty(exports, 'RxJs', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Ajax).default;
  }
});

var _Ajax2 = require('./ajax/Ajax.Promise');

Object.defineProperty(exports, 'Promettre', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Ajax2).default;
  }
});

var _String = require('./string/String.Formule');

Object.defineProperty(exports, 'Formule', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_String).default;
  }
});

var _Tool = require('./tool/Tool.Random');

Object.defineProperty(exports, 'Perdu', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Tool).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }