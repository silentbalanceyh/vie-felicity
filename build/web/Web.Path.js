'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var link = function link() {
    var app = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var link = arguments[1];
    return '/' + app.path + link;
};

var image = function image() {
    var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    if (0 <= path.indexOf("img:")) {
        return '/img' + path.substring(4);
    }
};

var query = function query() {
    var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    var params = {};
    if (path.startsWith('?')) {
        path = path.substring(path.indexOf('?') + 1);
        var pairs = path.split('&');
        pairs.forEach(function (item) {
            if (0 < item.indexOf('=')) {
                var key = item.split("=")[0];
                var value = item.split("=")[1];
                if (key) {
                    params[key] = value;
                }
            }
        });
    }
    return params;
};
exports.default = {
    link: link,
    image: image,
    query: query
};