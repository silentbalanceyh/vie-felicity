import Op from './Web.Op';

const toolbar = (props = {}) => {
    const {
        left = [],
        right = []
    } = props;
    // 读取toolbar的连接点
    left.forEach(item => {
        if (item.connect) {
            item.connect = Op
                .$
                .click(item.connect);
        }
    });
    right.forEach(item => {
        if (item.connect) {
            item.connect = Op
                .$
                .click(item.connect);
        }
    });
    return {left, right}
};

export default {
    "control.bar.ToolBar" : toolbar
}
