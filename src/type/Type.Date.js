import moment from "moment";

const now = (pattern = "YYYY-MM-DD") => {
    return moment().format(pattern);
};

const duration = (from, to, flag = "seconds") => {
    if (from && moment.isMoment(from) && to && moment.isMoment(to)) {
        return to.diff(from, flag);
    } else {
        console.warn(
            "[JOY] Please check your parameters 'from' and 'to', they are invalid.",
            from,
            to
        );
    }
};

const end = (start, adjust = 0, flag = "seconds") => {
    if (start && start.isMoment(start)) {
        const $start = moment(start);
        if (0 < adjust) {
            return $start.add(adjust, flag);
        } else {
            return $start.substract(adjust, flag);
        }
    } else {
        console.warn("[JOY] Please check your parameter 'start'.", start);
    }
};

export default {
    now,
    duration,
    end
};
