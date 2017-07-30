const sign = (uri, method, parameters, {
    seed, sig, secret
}) => {
    let message = `%c [Joy] [Sign] Sign with method ${method}. ( uri = ${uri})`;
    console.groupCollapsed(message, "color:#CCCC33;font-weight:900");
    console.log(`%c [Joy] Parameters -> `, 'color:#9999CC;font-weight:900', parameters);
    console.log(`%c [Joy] Seed -> `, 'color:#669966;font-weight:900', seed);
    console.log(`%c [Joy] Secret -> `, 'color:blue;font-weight:900', secret);
    console.log(`%c [Joy] Sig -> `, 'color:red;font-weight:900', sig);
    console.groupEnd();
};

const request = (uri, method, parameters) => {
    let message = `%c [Joy] [Ajax] Ajax request with method ${method}. ( uri = ${uri})`;
    console.groupCollapsed(message, "color:#0066CC;font-weight:900");
    console.log(`%c [Joy] Parameters -> `, 'color:#9999CC;font-weight:900', parameters);
    console.log(`%c [Joy] Uri -> `, 'color:#669966;font-weight:900', uri);
    console.groupEnd();
};

const response = (err, res) => {
    let message = `%c [Joy] [Ajax] Ajax response got with method.`;
    console.groupCollapsed(message, "color:#339933;font-weight:900");
    console.log(`%c [Joy] Resource -> `, 'color:#9999CC;font-weight:900', res);
    console.log(`%c [Joy] Error -> `, 'color:#669966;font-weight:900', err);
    console.groupEnd();
};

export default {
    sign,
    request,
    response
}
