const move = (props = {}, step = 0, target = {}) => {
    const {fnFlush, $step} = props;
    if (fnFlush) {
        const {
            current = 0
        } = $step.to();
        if (current < step) {
            fnFlush(target);
        }
    }
};

export default {
    move
}
