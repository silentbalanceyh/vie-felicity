import Date from '../type/Type.Date'
import Encrypt from '../tool/Tool.Encrypt'
import Log from '../log/Log'
import Schema from '../meta/Meta.Security.Schema.json'
import OAuth from '../secure/Secure.OAuth'
import App from "../meta/Meta.App";

const _parameters = (params = {}) => {
    let param = '';
    const keys = Object.keys(params).sort();
    if (0 < keys.length) {
        keys.forEach(key => {
            if ("pager" === key) {
                /** 1.Pager参数专用签名 **/
                let pager = params[key];
                if ("string" === typeof(params[key])) {
                    pager = JSON.parse(params[key])
                }
                if(pager) {
                    let sign = `:index${pager.index}size${pager.size}`;
                    param += key + sign + ':'
                }else{
                    param += key + ':'
                }
            } else {
                /** 这两个参数不参加签名 **/
                if ("criterias" !== key) {
                    if (params[key]) {
                        if ("object" === typeof(params[key])) {
                            param += key + JSON.stringify(params[key]) + ':'
                        } else {
                            param += key + params[key] + ':'
                        }
                    } else {
                        /** 特殊Boolean值的签名 **/
                        if (false === params[key]) {
                            param += key + "false:"
                        } else if (undefined !== params[key]) {
                            param += key + params[key] + ':'
                        }
                    }
                }
            }
        })
    }
    return param
};

class Sign{

    constructor(prefix = ''){
        this.oauth = new OAuth(prefix);
        this.app = new App(prefix);
        // Private
        this.secret = (seed) => {
            const user = this.oauth.user();
            let secret = Date.now("YYYYMMDDHH");
            if(user && 'object' === typeof user){
                seed += user['uniqueId'];
                secret = user['token'];
            }
            return { seed, secret };
        }
    }

    /** Uri计算Sig **/
    signature(uri, method = "GET", params = {}){
        /** 1.构造签名的Method **/
        let seed = method.toUpperCase();
        seed += ":";
        seed += _parameters(params);
        seed += `${uri}`;
        seed += "$";
        /** 2.构造secret **/
        const secretObj = this.secret(seed);
        seed = secretObj.seed;
        const secret = secretObj.secret;
        /** 3.签名 **/
        const sig = Encrypt.hmSha512(seed, secret);
        Log.sign(uri, method, params, {
            sig, secret, seed
        });
        /** 4.注入 **/
        params['sig'] = sig
    };

    token(){
        const app = this.app.read();
        let header = '';
        if(app){
            const auth = app.auth;
            const prefix = Schema[auth];
            const user = this.oauth.user();
            if(user){
                const value = Encrypt.b64Enc(`${user['uniqueId']}:${user['token']}`);
                header = prefix + ' ' + value;
            }
        }
        return header;
    }
}

export default Sign;
