import moment from 'moment'

const now = (pattern = "YYYY-MM-DD") => {
    return moment().format(pattern)
};

export default {
    now
}
