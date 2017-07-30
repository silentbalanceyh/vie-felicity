const _formatArray = (input = '', args = []) => {
    if(Array.prototype.isPrototypeOf(args)
        && 0 < args.length){
        args.forEach((item, index) => {
            // 表达式开始带冒号:
            if(0 <= input.indexOf('$' + index) && item){
                let replaced = new RegExp(`\\$${index}`,'gm');
                input = input.replace(replaced, item);
            }
        })
    }
    return input;
};

const _formatNamed = (input = '', params = {}) => {
    if(!Array.prototype.isPrototypeOf(params)
        && 0 < Object.keys(params).length){
        for(const key in params){
            const value = params[key];
            if(0 <= input.indexOf('$' + key) && value){
                let replaced = new RegExp(`\\$${key}`,'gm');
                input = input.replace(replaced, value);
            }
        }
    }
    return input;
};
const format = (input = "", params) => {
    if(params){
        if(Array.prototype.isPrototypeOf(params)){
            input = _formatArray(input, params);
        }else{
            input = _formatNamed(input, params);
        }
    }
    return input;
};
const query = (params = {}, idx = 0) => {
    let queryStr = '';
    for(const key in params){
        if(params.hasOwnProperty(key)){
            const value = params[key];
            if(value){
                const kv = (key + '=' + encodeURIComponent(value));
                if(0 === idx){
                    queryStr += `?${kv}`;
                }else{
                    queryStr += `&${kv}`;
                }
                idx++;
            }
        }
    }
    return queryStr;
};
export default {
    format,
    query
}
