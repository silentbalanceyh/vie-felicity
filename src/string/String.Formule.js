const _formatArray = (input = '', args = []) => {
    if (Array.prototype.isPrototypeOf(args) && 0 < args.length) {
        args.forEach((item, index) => {
            // 表达式开始带冒号:
            if (0 <= input.indexOf(':' + index) && undefined != item) {
                let replaced = new RegExp(`\\:${index}`, 'gm');
                input = input.replace(replaced, item);
            }
        })
    }
    return input;
};

const _formatNamed = (input = '', params = {}) => {
    if (!Array.prototype.isPrototypeOf(params) && 0 < Object.keys(params).length) {
        for (const key in params) {
            const value = params[key];
            if (0 <= input.indexOf(':' + key) && undefined != value) {
                let replaced = new RegExp(`\\:${key}`, 'gm');
                input = input.replace(replaced, value);
                delete params[key];
            }
        }
    }
    return input;
};
const format = (input = "", params) => {
    if (params) {
        if (Array.prototype.isPrototypeOf(params)) {
            input = _formatArray(input, params);
        } else {
            input = _formatNamed(input, params);
        }
    }
    return input;
};
const query = (params = {}, idx = 0) => {
    let queryStr = '';
    for (const key in params) {
        if (params.hasOwnProperty(key)) {
            const value = params[key];
            if (value) {
                const kv = (key + '=' + encodeURIComponent(value));
                if (0 === idx) {
                    queryStr += `?${kv}`;
                } else {
                    queryStr += `&${kv}`;
                }
                idx++;
            }
        }
    }
    return queryStr;
};
const message = (input = "", params = []) => {
    if (params && Array.prototype.isPrototypeOf(params) && 0 < params.length) {
        params.forEach((item, index) => {
            const reg = new RegExp(`\\{${index}\\}`, "gm");
            input = input.replace(reg, item);
        })
    }
    return input;
};
const currency = (num) => {
    // Negative
    let oldNum = num;
    num = Math.abs(num);

    let result = '',
        counter = 0;
    let decimal = num
        .toString()
        .split('.')[1];
    if (!decimal) {
        decimal = "00";
    } else {
        decimal = decimal.substring(0, 2);
        // Two Digit
        if (2 > decimal.toString().length) {
            decimal = decimal + "0";
        }
    }
    let int = num
        .toString()
        .split('.')[0];
    int = (int || 0).toString();
    for (let i = int.length - 1; i >= 0; i--) {
        counter++;
        result = int.charAt(i) + result;
        if (!(counter % 3) && i !== 0) {
            result = ',' + result;
        }
    }
    if (0 > oldNum) {
        return "-" + result + '.' + decimal;
    } else {
        return result + '.' + decimal;
    }
}
export default {
    format,
    message,
    query,
    currency
}
