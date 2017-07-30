import Q from 'q'
import agent from 'superagent'

import Header from '../meta/Meta.Header'
import Formule from '../string/String.Formule';
import Sign from './Ajax.Sign'

const _repdor = (defer, ret) => {
    return (err, res) => {
        if(err){
            if(res && res.body){
                defer.resolve(res.body.error);
            }else{
                defer.reject(err);
            }
        }else{
            if(ret){
                ret.push(res.body.data);
                defer.resolve(ret);
            }else{
                defer.resolve(res.body.data);
            }
        }
    }
};

const DFT_MIME = "application/json";

class Promise {

    constructor(endpoint, prefix = '', secure = true){
        this.secure = secure;
        const sign = new Sign(prefix);
        this.sign = sign;
        if(endpoint) {
            this.endpoint = endpoint;
        }else{
            console.info("[JOY] The promise switch to relative api path instead of endpoint.");
            this.endpoint = '';
        }
        // Private
        this.request = (uri, params = {}, method = 'get', ret) => {
            const defer = Q.defer();
            try{
                if(this.secure){
                    agent[method](uri)
                        .accept(DFT_MIME)
                        .set(Header['HTTP11']['CONTENT_TYPE'],DFT_MIME)
                        .set(Header['HTTP11']['AUTHORIZATION'],this.sign.token())
                        .send(params)
                        .end(_repdor(defer, ret))
                }else{
                    agent[method](uri)
                        .accept(DFT_MIME)
                        .set(Header['HTTP11']['CONTENT_TYPE'],DFT_MIME)
                        .send(params)
                        .end(_repdor(defer, ret))
                }
            }catch(error){
                console.error(error);
            }
            return defer;
        };
        const request = this.request;
        this.promise = (method) => (uri, params = {}) => {
            let api = Formule.format(uri, params);
            // 签名
            sign.signature(uri, method.toUpperCase(), params);
            // 最终请求路径
            api = `${endpoint}${api}`;
            return request(api, params, method.toLowerCase(), secure);
        }
    }

    flowGet(uri, params = {}, ret = {}){
        let api = Formule.format(uri, params);
        // 签名
        this.sign.signature(api, "GET", params);
        // 追加Query
        const query = Formule.query(params, (0 > uri.indexOf('?') ? 0: 1));
        api = api + query;
        // 最终请求路径
        api = `${this.endpoint}${api}`;
        return this.request(uri, params, "get", ret);
    }

    get(uri, params = {}){
        return this.flowGet(uri, params);
    }

    post(uri, params = {}){
        const request = this.promise('post');
        return request(uri, params);
    }

    put(uri, params = {}){
        const request = this.promise('put');
        return request(uri, params);
    }
    // 静态方法处理
    static _(store = {}){
        const defer = Q.defer();
        defer.resolve(store);
        return defer.promise;
    }
}

export default Promise
