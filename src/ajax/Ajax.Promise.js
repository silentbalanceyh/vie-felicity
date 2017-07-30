import Q from 'q'
import agent from 'superagent'

import Header from '../meta/Meta.Header.json'
import Formule from '../string/String.Formule';

class Promise {

    constructor(endpoint, prefix = ''){
        if(endpoint) {
            this.endpoint = endpoint;
            this.prefix = prefix;
        }else{
            console.info("[JOY] The promise switch to relative api path instead of endpoint.");
            this.endpoint = '';
            this.prefix = '';
        }
    }


}

export default (endpoint) => {
    return new Promise(endpoint);
}
