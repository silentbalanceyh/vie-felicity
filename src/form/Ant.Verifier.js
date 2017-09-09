import Cond from "./Ant.Cond";

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
    if (values) {
        const uri = rule.uri ? rule.uri : "/api/vlv/rule/duplicated";
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
};
export default {
    diff,
    same,
    required,
    duplicated,
    existing
};
