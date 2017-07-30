const _colorful = (reference = {}, Name, color = {}, stateless) => {
    let message = `%c [Joy] [${stateless?"React Component":"Stateless Function Component"}] Control monitor: name = ${Name}`;
    console.groupCollapsed(message, `color:${color.group};font-weight:900`);
    console.log(`%c [Joy] Props -> `, `color:${color.props};font-weight:900`, reference.props);
    if(!stateless) console.log(`%c [Joy] State -> `, `color:${color.state};font-weight:900`, reference.state);
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

const hoc = (reference = {}, Name) => {
    _colorful(reference, Name, {
        group: '#CC0066',
        props: '#333366',
        state: '#666666'
    });
};

const stateless = (props = {}, Name) => {
    _colorful({props,state:null}, Name, {
        group: '#99CC33',
        props: "#333366",
        state: "#666666"
    },true)
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
    stateless,
    hoc
}
