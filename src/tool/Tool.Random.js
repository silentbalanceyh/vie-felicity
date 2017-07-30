import randomjs from 'random-js';
import {v4} from 'uuid'
const string = (length) => {
    if(!length){
        console.error("[JOY] Input parameter 'length' must be valid number for random string.");
    }
    const engine = randomjs.engines.mt19937().autoSeed();
    return randomjs.string()(engine, length);
};

export default {
    string,
    uuid:v4
}

