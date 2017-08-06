import Op from './Web.Op';
import Immutable from 'immutable';
const toolbar = (props = {}) => {
    // 读取toolbar的连接点
    if (!props.left || !props.right) {
        console.warn("[JOY] Please check your input configuration of toolbar.");
    }
    const left = Immutable
        .fromJS(props.left)
        .toJS();
    left.forEach(item => {
        if (item.connect) {
            const id = item.connect;
            item.connect = Op
                .$
                .click(id);
        }
    });
    const right = Immutable
        .fromJS(props.right)
        .toJS();
    right.forEach(item => {
        if (item.connect) {
            const id = item.connect;
            item.connect = Op
                .$
                .click(id);
        }
    });
    return {left, right}
};

export default {
    "control.bar.ToolBar" : toolbar
}
