
class Promise {

    constructor(endpoint){
        if(endpoint) {
            this.endpoint = endpoint;
        }else{
            console.info("[JOY] The promise switch to relative api path instead of endpoint.");
            this.endpoint = '';
        }
    }
}

export default (endpoint) => {
    return new Promise(endpoint);
}