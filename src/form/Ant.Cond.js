const rLength = (value, item) => {
    if (value) {
        const length = value.length;
        if (0 <= item.indexOf("<")) {
            // <n: 长度小于某个值
            // TODO:
        } else if (0 <= item.indexOf(">")) {
            // >n：长度大于某个值
            const expected = Number(item.substring(item.indexOf(">") + 1));
            return length > expected;
        } else {
            // [n,m]：长度在某个范围内
            // TODO:
        }
    } else {
        return false;
    }
};
const rBool = (value, item) => {
    return Boolean(item) === value;
};
const JFun = {
    length: rLength,
    bool: rBool
};
const _execRules = (value, rules = {}) => {
    let passed = true;
    // 读取检查字段的值
    for (const key in rules) {
        const executor = JFun[key];
        const item = rules[key];
        passed = executor(value, item);
        if (!passed) {
            break;
        }
    }
    return passed;
};

const preCheck = (form, trigger, value) => {
    if (!form) {
        console.warn(
            "[JOY] Form reference is invalid, error will occurs. ",
            form
        );
    }
    // 是否包含了$trigger节点
    if (trigger) {
        // 读取Form中所有字段信息
        const values = form.getFieldsValue();
        let passed = true;
        // 遍历$trigger中的每一个字段
        for (const field in trigger) {
            // 读取检查字段的值
            const value = values[field];
            // 读取检查字段的规则配置
            const rules = trigger[field];
            // 检查规则
            passed = _execRules(value, rules);
            if (!passed) {
                break;
            }
        }
        return passed;
    } else {
        // 不包含直接跳过
        return true;
    }
};

const execute = (form, rule = {}, callback, executor) => {
    const ready = preCheck(form, rule.$trigger);
    if (ready) {
        const message = executor();
        if (message) {
            callback(message);
        } else {
            callback();
        }
    } else {
        callback();
    }
};

export default {
    execute
};
