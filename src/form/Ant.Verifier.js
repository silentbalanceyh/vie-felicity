const _triggered = (rule = {}, values = "") => {
    // 满足条件的验证规则
    const { _trigger } = rule;
    if(_trigger){
        // 检查触发条件min
        if(_trigger.min && values.length < _trigger.min){
            return false;
        }
        // 检查触发条件max
        if(_trigger.max && values.length > _trigger.max){
            return false;
        }
    }
    // 未配置触发条件则直接验证
    return true;
};
const diff = (form = {}) => (rule = {}, values, callback) => {
    // 1.提取target字段
    if (!rule['_target']) {
        console.warn("[JOY] Please check your configuration for rule: diff. '_target' missing.");
    }// 2.前置条件判断
    const ready = _triggered(rule, values);
    if(ready) {
        const {_target, message} = rule;
        const compared = form.getFieldValue(_target);
        if (compared === values) {
            callback(message);
        } else {
            callback();
        }
    }else{
        callback();
    }
};
const same = (form = {}) => (rule = {}, values, callback) => {
    // 1.提取target字段
    if (!rule['_target']) {
        console.warn("[JOY] Please check your configuration for rule: same. '_target' missing.");
    }
    // 2.前置条件判断
    const ready = _triggered(rule, values);
    if(ready) {
        const {_target, message} = rule;
        const compared = form.getFieldValue(_target);
        if (compared !== values) {
            callback(message);
        } else {
            callback();
        }
    }else{
        callback();
    }
};
export default {
    diff,
    same
}
