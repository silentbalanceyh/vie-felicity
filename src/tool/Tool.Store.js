const put = (reference) => (key, value) => {
    if (reference && value && key) {
        if (Object.prototype.isPrototypeOf(value)) {
            value = JSON.stringify(value);
        }
        reference.setItem(key, value);
    }else{
        console.warn("[JOY] (put) Your browser does not support sessionStorage/localStorage.");
    }
};

const get = (reference) => (key) => {
    if (reference && key){
        let value = reference.getItem(key);
        try{
            value = JSON.parse(value);
        }catch(error){}
        return value;
    }else{
        console.warn("[JOY] (get) Your browser does not support sessionStorage/localStorage.");
    }
};

const remove = (reference) => (key) => {
    if(reference){
        reference.removeItem(key);
    }else{
        console.warn("[JOY] (remove) Your browser does not support sessionStorage/localStorage. ");
    }
};

const clear = (reference) => () => {
    if(reference){
        reference.clear();
    }else{
        console.warn("[JOY] (clear) Your browser does not support sessionStorage/localStorage. ");
    }
};

export const Session = {
    put: put(window.sessionStorage),
    get: get(window.sessionStorage),
    remove: remove(window.sessionStorage),
    clear: clear(window.sessionStorage)
}

export const Storage = {
    put: put(window.localStorage),
    get: get(window.localStorage),
    remove: remove(window.localStorage),
    clear: clear(window.localStorage)
}