const extract = (props = {}, keys = []) => {
    const attrs = {};
    keys.forEach(key => {
        const dataKey = `$${key}`;
        if(props.hasOwnProperty(dataKey)){
            attrs[dataKey] = props[dataKey];
        }
    });
    return attrs;
};

export default {
    extract
}
