const sign = (uri, method, parameters, {
    seed, sig, secret
}) => {
    let message = `%c [Joy] [Sign] Sign with method ${method}. ( uri = ${uri})`;
    console.groupCollapsed(message, "color:#CCCC33;font-weight:900");
    console.log(`%c [Joy] Parameters -> `, 'color:#9999CC;font-weight:900', parameters);
    console.log(`%c [Joy] Seed -> `, 'color:#669966;font-weight:900', seed);
    console.log(`%c [Joy] Secret -> `, 'color:blue;font-weight:900', secret);
    console.log(`%c [Joy] Sig -> `, 'color:red;font-weight:900', sig);
    console.groupEnd()
};

export default {
    sign
}
