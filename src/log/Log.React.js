
const _colorful = (reference = {}, Name, color = {}) => {
    if (process.env.NODE_ENV === `development`) {
        let message = `%c [VI] [React Component] Control monitor: name = ${Name}`;
        console.groupCollapsed(message, `color:${color.group};font-weight:900`);
        console.log(`%c [VI] Props -> `, `color:${color.props};font-weight:900`, reference.props);
        console.log(`%c [VI] State -> `, `color:${color.state};font-weight:900`, reference.state);
        console.log(`%c [VI] Hoc -> `, `color:${color.props};font-weight:900`, reference.hoc);
        console.groupEnd()
    }
};

const control = (reference = {}, Name) => {
    _colorful(reference, Name, {
        group:'#990000',
        props:'#333366',
        state:'#666666'
    });
};

const stateless = (props = {}, Name, hoc = {}) => {
    if (process.env.NODE_ENV === `development`) {
        let message = `%c [VI] [Stateless Function Component] Control monitor: name = ${Name}`;
        console.groupCollapsed(message, `color:#99CC33;font-weight:900`);
        console.log(`%c [VI] Props -> `, `color:#333366;font-weight:900`, props);
        console.log(`%c [VI] Hoc -> `, `color:#3366CC;font-weight:900`, hoc);
        console.groupEnd()
    }
};

const container = (reference = {}, Name) => {
    _colorful(reference, Name, {
        group:'#006666',
        props:'#333366',
        state:'#666666'
    });
};

const components = (reference = {}, Name) => {
    _colorful(reference, Name, {
        group:'#CC9933',
        props:'#333366',
        state:'#666666'
    });
};

const form = (reference = {}, Name) => {
    _colorful(reference, Name, {
        group:'#0099FF',
        props:'#333366',
        state:'#666666'
    });
};

export default {
    control,
    container,
    components,
    form,
    stateless
}
