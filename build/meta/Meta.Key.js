"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Key = function () {
    function Key(prefix) {
        _classCallCheck(this, Key);

        if (!prefix) {
            console.error("[JOY] Please provide correct prefix when create Key");
            return;
        }
        this.prefix = prefix;
    }

    _createClass(Key, [{
        key: "session",
        value: function session() {
            return this.prefix + "SESSION/USER";
        }
    }, {
        key: "app",
        value: function app() {
            return this.prefix + "STORE/APP/$name";
        }
    }, {
        key: "run",
        value: function run() {
            return this.prefix + "STORE/RUN";
        }
    }]);

    return Key;
}();

exports.default = Key;