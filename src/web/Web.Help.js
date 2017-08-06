const move = (props = {}, step = 0, target = {}) => {
    const {fnFlush, $step} = props;
    if (fnFlush && $step) {
        const {
            current = 0
        } = $step.to();
        if (current < step) {
            fnFlush(target);
        }
    }
};

const start = (props = {}, target = {}) => {
    const {fnFlush, $step} = props;
    if (fnFlush && $step) {
        fnFlush(target);
    }
};

export default {
    move,
    start
}
