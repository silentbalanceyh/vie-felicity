// 按照Type分组
const group = (array = [], field, meta = {}) => {
    const result = {};
    array.forEach(item => {
        let key = item[field];
        // Key转换
        if (meta[key]) key = meta[key];
        if (!result[key]) {
            result[key] = [];
        }
        result[key].push(item);
    });
    return result;
};

const sort = (left = "", right = "", asc = true) => {
    const minLen = Math.min(left.length, right.length);
    let order = 0;
    for (let idx = 0; idx < minLen; idx++) {
        const leftCode = left.charCodeAt(idx);
        const rightCode = right.charCodeAt(idx);
        if (leftCode !== rightCode) {
            if(asc) {
                order = leftCode - rightCode;
            }else{
                order = rightCode - leftCode;
            }
            break;
        }
    }
    return order;
};

export default {
    group,
    sort
}
