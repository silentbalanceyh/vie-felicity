import Op from './Web.Op';
import Immutable from 'immutable';
const toolbar = (props = {}) => {
    const {
        left = [],
        right = []
    } = props;
    // 读取toolbar的连接点
    left.forEach(item => {
        if (item.connect) {
            const $item = Immutable
                .fromJS(item)
                .toJS();
            item.connect = Op
                .$
                .click($item.connect);
        }
    });
    right.forEach(item => {
        if (item.connect) {
            const $item = Immutable
                .fromJS(item)
                .toJS();
            item.connect = Op
                .$
                .click($item.connect);
        }
    });
    return {left, right}
};

export default {
    "control.bar.ToolBar" : toolbar
}
