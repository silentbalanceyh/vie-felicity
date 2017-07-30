"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _cryptoJs = require("crypto-js");

var _cryptoJs2 = _interopRequireDefault(_cryptoJs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _toInt64Bytes = function _toInt64Bytes(x) {
    var bytes = [];
    for (var i = 7; i >= 0; i--) {
        bytes[i] = x & 0xff;
        x = x >> 8;
    }
    return bytes;
};

var _toHexStr = function _toHexStr(bytes) {
    var hex = [];
    for (var i = 0; i < bytes.length; i++) {
        hex.push((bytes[i] >>> 4).toString(16));
        hex.push((bytes[i] & 0xF).toString(16));
    }
    return hex.join("");
};

var md5 = function md5(value) {
    if (value) {
        return _cryptoJs2.default.MD5(String(value)).toString().toUpperCase();
    } else {
        return "";
    }
};

var b64Enc = function b64Enc(value) {
    return _cryptoJs2.default.enc.Base64.stringify(_cryptoJs2.default.enc.Utf8.parse(value));
};

var b64Dec = function b64Dec(value) {
    return _cryptoJs2.default.enc.Base64.parse(value).toString(_cryptoJs2.default.enc.Utf8);
};

var hmSha512 = function hmSha512(value, secret) {
    var raw = _cryptoJs2.default.HmacSHA512(value, secret);
    var wordArr = raw.words;
    var retVal = "";
    for (var idx = 0; idx < wordArr.length; idx++) {
        var bytes = _toInt64Bytes(wordArr[idx]);
        var hexStr = _toHexStr(bytes);

        retVal += hexStr.toUpperCase().substring(8, 16);
    }
    return retVal;
};
exports.default = {
    md5: md5,
    hmSha512: hmSha512,
    b64Dec: b64Dec,
    b64Enc: b64Enc
};