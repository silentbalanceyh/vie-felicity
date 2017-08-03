"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var _colorful = function _colorful() {
    var reference = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var Name = arguments[1];
    var color = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var stateless = arguments[3];

    var message = "%c [Joy] [" + (!stateless ? "React Component" : "Stateless Function Component") + "] Control monitor: name = " + Name;
    console.groupCollapsed(message, "color:" + color.group + ";font-weight:900");
    console.log("%c [Joy] Props -> ", "color:" + color.props + ";font-weight:900", reference.props);
    if (!stateless) console.log("%c [Joy] State -> ", "color:" + color.state + ";font-weight:900", reference.state);
    console.log("%c [Joy] Hoc -> ", "color:" + color.props + ";font-weight:900", reference.hoc || reference.props['$hoc']);
    console.groupEnd();
};

var control = function control() {
    var reference = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var Name = arguments[1];

    _colorful(reference, Name, {
        group: '#990000',
        props: '#333366',
        state: '#666666'
    });
};

var hoc = function hoc() {
    var reference = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var Name = arguments[1];

    _colorful(reference, Name, {
        group: '#CC0066',
        props: '#333366',
        state: '#666666'
    });
};

var stateless = function stateless() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var Name = arguments[1];

    _colorful({
        props: props,
        state: null
    }, Name, {
        group: '#99CC33',
        props: "#333366",
        state: "#666666"
    }, true);
};

var container = function container() {
    var reference = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var Name = arguments[1];

    _colorful(reference, Name, {
        group: '#006666',
        props: '#333366',
        state: '#666666'
    });
};

var reuse = function reuse() {
    var reference = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var Name = arguments[1];

    _colorful(reference, Name, {
        group: '#009900',
        props: '#333366',
        state: '#666666'
    });
};

var components = function components() {
    var reference = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var Name = arguments[1];

    _colorful(reference, Name, {
        group: '#CC9933',
        props: '#333366',
        state: '#666666'
    });
};

var form = function form() {
    var reference = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var Name = arguments[1];

    _colorful(reference, Name, {
        group: '#0099FF',
        props: '#333366',
        state: '#666666'
    });
};

exports.default = {
    control: control,
    container: container,
    components: components,
    form: form,
    stateless: stateless,
    hoc: hoc,
    reuse: reuse
};