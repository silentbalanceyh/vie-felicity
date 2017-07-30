const sign = (uri, method, parameters, {
    seed, sig, secret
}) => {
    if (process.env.NODE_ENV === `development` && config.debug['ajax']) {
        let message = `%c [VI] [Sign] Sign with method ${method}. ( uri = ${uri})`;
        console.groupCollapsed(message, "color:#CCCC33;font-weight:900");
        console.log(`%c [VI] Parameters -> `, 'color:#9999CC;font-weight:900', parameters);
        console.log(`%c [VI] Seed -> `, 'color:#669966;font-weight:900', seed);
        console.log(`%c [VI] Secret -> `, 'color:blue;font-weight:900', secret);
        console.log(`%c [VI] Sig -> `, 'color:red;font-weight:900', sig);
        console.groupEnd()
    }
};

export default {
    sign
}
