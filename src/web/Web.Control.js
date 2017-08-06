import Op from './Web.Op';

const toolbar = (props = {}) => {
    const {
        left = [],
        right = []
    } = props;
    // 读取toolbar的连接点
    left.forEach(item => {
        if (item.connect) {
            const id = item.connect;
            item.connect = Op
                .$
                .click(id);
        }
    });
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
