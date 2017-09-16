import Cond from "./Ant.Cond";
import moment from "moment";
const diff = (form = {}) => (rule = {}, values, callback) => {
    // 1.提取target字段
    if (!rule["$comparedTo"]) {
        console.warn(
            "[JOY] Please check your configuration for rule: diff. '$comparedTo' missing."
        );
    }
    Cond.execute(form, rule, callback, () => {
        const compared = form.getFieldValue(rule.$comparedTo);
        return compared === values ? rule.message : false;
    });
};
const same = (form = {}) => (rule = {}, values, callback) => {
    // 1.提取target字段
    if (!rule["$comparedTo"]) {
        console.warn(
            "[JOY] Please check your configuration for rule: same. '$comparedTo' missing."
        );
    }
    // 2.前置条件判断
    Cond.execute(form, rule, callback, () => {
        const compared = form.getFieldValue(rule.$comparedTo);
        return compared !== values ? rule.message : false;
    });
};
const lessEqual = (form = {}) => (rule = {}, values, callback) => {
    // 1.提取target字段
    if (!rule["$comparedTo"]) {
        console.warn(
            "[JOY] Please check your configuration for rule: lessEqual. '$comparedTo' missing."
        );
    }
    // 2.前置条件判断
    Cond.execute(form, rule, callback, () => {
        const compared = form.getFieldValue(rule.$comparedTo);
        return compared < values ? rule.message : false;
    });
};
const moreEqual = (form = {}) => (rule = {}, values, callback) => {
    // 1.提取target字段
    if (!rule["$comparedTo"]) {
        console.warn(
            "[JOY] Please check your configuration for rule: moreEqual. '$comparedTo' missing."
        );
    }
    // 2.前置条件判断
    Cond.execute(form, rule, callback, () => {
        const compared = form.getFieldValue(rule.$comparedTo);
        return compared > values ? rule.message : false;
    });
};
const after = (form = {}) => (rule = {}, values, callback) => {
    // 1.提取target字段
    if (!rule["$comparedTo"]) {
        console.warn(
            "[JOY] Please check your configuration for rule: after. '$comparedTo' missing."
        );
    }
    // 2.前置条件判断
    Cond.execute(form, rule, callback, () => {
        let compared;
        if ("$NOW$" === rule.$comparedTo) {
            compared = moment();
        } else {
            compared = form.getFieldValue(rule.$comparedTo);
        }
        return moment.isMoment(values) && !values.isAfter(compared);
        // return compared !== values ? rule.message : false;
    });
};
const before = (form = {}) => (rule = {}, values, callback) => {
    // 1.提取target字段
    if (!rule["$comparedTo"]) {
        console.warn(
            "[JOY] Please check your configuration for rule: before. '$comparedTo' missing."
        );
    }
    // 2.前置条件判断
    Cond.execute(form, rule, callback, () => {
        let compared;
        if ("$NOW$" === rule.$comparedTo) {
            compared = moment();
        } else {
            compared = form.getFieldValue(rule.$comparedTo);
        }
        return moment.isMoment(values) && !values.isBefore(compared);
    });
};
const required = (form = {}) => (rule = {}, values, callback) => {
    Cond.execute(form, rule, callback, () => {
        return !values ? rule.message : false;
    });
};

const _prepare = (form = {}, rule, params = {}) => {
    // 附加参数
    if (rule["$params"]) {
        for (const name in rule.$params) {
            const target = rule.$params[name];
            if (target) {
                const value = form.getFieldValue(target);
                if (value) {
                    params[name] = value;
                }
            }
        }
    }
};
const duplicated = (form = {}, generator = {}) => (
    rule = {},
    values,
    callback
) => {
    if (!rule["$ajax"]) {
        console.warn(
            "[JOY] Please check your configuration for rule: duplicated. '$ajax' missing."
        );
    }
    // OOB Endpoint
    const ready = Cond.preCheck(form, rule.$trigger);
    if (ready) {
        if (values) {
            const uri = rule.uri ? rule.uri : "/api/vlv/rule/duplicated";
            const { identifier, name, uniqueId = "uniqueId" } = rule.$ajax;
            let targetValues = [];
            let targetFields = [];
            targetFields.push(name);
            targetValues.push(values);
            // 附加参数
            if (rule["$params"]) {
                for (const name in rule.$params) {
                    const target = rule.$params[name];
                    if (target) {
                        const value = form.getFieldValue(target);
                        if (value) {
                            targetFields.push(target);
                            targetValues.push(value);
                        }
                    }
                }
            }
            const params = {
                identifier,
                name: targetFields,
                value: targetValues
            };
            // 更新流程中，重新设定了unquieId则使用重新设定后的unquieId，否则取默认的unquieId，添加流程中什么也不取
            if (form.getFieldValue(uniqueId)) {
                params["uniqueId"] = form.getFieldValue(uniqueId);
            }
            const promise = generator.post(uri, params);
            promise.then(data => {
                if (data) {
                    callback();
                } else {
                    const { message } = rule;
                    callback(message);
                }
            });
        } else {
            callback();
        }
    } else {
        callback();
    }
};
const existing = (form = {}, generator = {}) => (
    rule = {},
    values,
    callback
) => {
    if (!rule["$ajax"]) {
        console.warn(
            "[JOY] Please check your configuration for rule: existing. '$ajax' missing."
        );
    }
    // OOB Endpoint
    const ready = Cond.preCheck(form, rule.$trigger);
    if (ready) {
        if (values) {
            const uri = rule.uri ? rule.uri : "/api/vlv/rule/existing";
            const { identifier, name } = rule.$ajax;
            const params = { identifier, name, value: values };
            // 附加参数
            _prepare(form, rule, params);
            const promise = generator.post(uri, params);
            promise.then(data => {
                if (data) {
                    callback();
                } else {
                    const { message } = rule;
                    callback(message);
                }
            });
        } else {
            callback();
        }
    } else {
        callback();
    }
};
export default {
    diff,
    same,
    lessEqual,
    moreEqual,
    required,
    duplicated,
    existing,
    after,
    before
};
