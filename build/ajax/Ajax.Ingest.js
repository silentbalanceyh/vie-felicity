"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var build = function build(generator) {
    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var data = arguments[2];

    if (generator) {
        var uri = config.uri,
            _config$method = config.method,
            method = _config$method === undefined ? "GET" : _config$method;

        var promise = null;
        switch (method) {
            case "GET":
                promise = generator.get(uri, data);
                break;
            case "POST":
                promise = generator.post(uri, data);
                break;
            default:
                console.warn("[JOY] Promise building met error, only support GET/POST. ", method);
                break;
        }
        return promise;
    } else {
        console.warn("[JOY] The promise generator has not been passed.");
    }
};

exports.default = {
    build: build
};