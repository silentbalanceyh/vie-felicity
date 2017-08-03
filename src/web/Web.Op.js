const click = (id) => {
    if (id && document) {
        const ele = document.getElementById(id);
        if (ele) {
            ele.click(id);
        } else {
            console.warn("[JOY] Connected element could not be found. id " + id);
        }
    } else {
        console.warn("[JOY] Connected environment is invalid. ");
    }
};
export default {
    $ : {
        click: (id) => () => {
            click(id);
        }
    }
}
