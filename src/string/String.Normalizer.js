const integer = length => value => {
    if (value) {
        /** 整数限制函数 */
        value = value.toString();
        if (1 === value.length) {
            value = value.replace(/[^1-9]/g, "");
        } else {
            value = value.replace(/\D/g, "");
        }
        /** 长度限制 */
        if (0 < length) {
            if (length < value.length) {
                value = value.substring(0, length);
            }
        }
    }
    return value;
};
const decimal = (length, scale) => value => {
    if (value) {
        /** 2.正数输入限制 **/
        value = value.toString();
        value = value.replace(/[^\d.]/g, ""); //清除“数字”和“.”以外的字符
        value = value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
        value = value
            .replace(".", "$#$")
            .replace(/\./g, "")
            .replace("$#$", ".");
        const scaleReg = new RegExp(`(\\-)*(\\d+)\\.(\\d{${scale}}).`);
        value = value.replace(scaleReg, `$1$2.$3`); //只能输入两个小数
        /** 3.长度输入限制 **/
        if (length < value.length) {
            value = value.substring(0, length);
        }
        return value;
    }
    return value;
};
export default {
    integer,
    decimal
};
