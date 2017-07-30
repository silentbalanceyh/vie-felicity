const _colorful = (reference = {}, Name, color = {}) => {
    let message = `%c [Joy] [React Component] Control monitor: name = ${Name}`;
    console.groupCollapsed(message, `color:${color.group};font-weight:900`);
    console.log(`%c [Joy] Props -> `, `color:${color.props};font-weight:900`, reference.props);
    console.log(`%c [Joy] State -> `, `color:${color.state};font-weight:900`, reference.state);
    console.log(`%c [Joy] Hoc -> `, `color:${color.props};font-weight:900`, reference.hoc);
    console.groupEnd()
};

const control = (reference = {}, Name) => {
    _colorful(reference, Name, {
        group: '#990000',
        props: '#333366',
        state: '#666666'
    });
};

const stateless = (props = {}, Name, hoc = {}) => {
    let message = `%c [Joy] [Stateless Function Component] Control monitor: name = ${Name}`;
    console.groupCollapsed(message, `color:#99CC33;font-weight:900`);
    console.log(`%c [Joy] Props -> `, `color:#333366;font-weight:900`, props);
    console.log(`%c [Joy] Hoc -> `, `color:#3366CC;font-weight:900`, hoc);
    console.groupEnd()
};

const container = (reference = {}, Name) => {
    _colorful(reference, Name, {
        group: '#006666',
        props: '#333366',
        state: '#666666'
    });
};

const components = (reference = {}, Name) => {
    _colorful(reference, Name, {
        group: '#CC9933',
        props: '#333366',
        state: '#666666'
    });
};

const form = (reference = {}, Name) => {
    _colorful(reference, Name, {
        group: '#0099FF',
        props: '#333366',
        state: '#666666'
    });
};

export default {
    control,
    container,
    components,
    form,
    stateless
}
