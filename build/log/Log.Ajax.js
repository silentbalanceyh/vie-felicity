'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var sign = function sign(uri, method, parameters, _ref) {
    var seed = _ref.seed,
        sig = _ref.sig,
        secret = _ref.secret;

    var message = '%c [Joy] [Sign] Sign with method ' + method + '. ( uri = ' + uri + ')';
    console.groupCollapsed(message, "color:#CCCC33;font-weight:900");
    console.log('%c [Joy] Parameters -> ', 'color:#9999CC;font-weight:900', parameters);
    console.log('%c [Joy] Seed -> ', 'color:#669966;font-weight:900', seed);
    console.log('%c [Joy] Secret -> ', 'color:blue;font-weight:900', secret);
    console.log('%c [Joy] Sig -> ', 'color:red;font-weight:900', sig);
    console.groupEnd();
};

var request = function request(uri, method, parameters) {
    var token = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';

    var message = '%c [Joy] [Ajax] Ajax request with method ' + method + '. ( uri = ' + uri + ')';
    console.groupCollapsed(message, "color:#0066CC;font-weight:900");
    console.log('%c [Joy] Parameters -> ', 'color:#9999CC;font-weight:900', parameters);
    console.log('%c [Joy] Uri -> ', 'color:#669966;font-weight:900', uri);
    console.log('%c [Joy] Uri -> ', 'color:#red;font-weight:900', token);
    console.groupEnd();
};

var response = function response(err, res) {
    var message = '%c [Joy] [Ajax] Ajax response got with method.';
    console.groupCollapsed(message, "color:#339933;font-weight:900");
    console.log('%c [Joy] Resource -> ', 'color:#9999CC;font-weight:900', res);
    console.log('%c [Joy] Error -> ', 'color:#669966;font-weight:900', err);
    console.groupEnd();
};

exports.default = {
    sign: sign,
    request: request,
    response: response
};