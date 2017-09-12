const extract = (props = {}, keys = []) => {
    const attrs = {};
    keys.forEach(key => {
        const dataKey = `$${key}`;
        if (props.hasOwnProperty(dataKey)) {
            attrs[dataKey] = props[dataKey];
        }
    });
    return attrs;
};

const _prefix = (props = {}, keys = [], prefix = "") => {
    const attrs = {};
    keys.forEach(key => {
        const dataKey = `${prefix}_${key.replace(/\./g, "_")}`;
        if (props.hasOwnProperty(dataKey)) {
            attrs[dataKey] = props[dataKey];
        }
    });
    return attrs;
};

export default {
    extract,
    t: (props = {}, keys = []) => _prefix(props, keys, "t"),
    a: (props = {}, keys = []) => _prefix(props, keys, "a")
};
