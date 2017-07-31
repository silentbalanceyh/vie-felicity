
import { Session } from '../tool/Tool.Store';
import Key from "../meta/Meta.Key";
import App from '../meta/Meta.App';
import Encrypt from '../tool/Tool.Encrypt'
import Promise from '../ajax/Ajax.Promise';

class OAuth{
    constructor({ endpoint = '', key = '', debug = true }){
        this.key = new Key(key);
        this.app = new App(key);
        // 构造两个Promise用户处理不同模式的安全访问
        this.$secure = new Promise({endpoint, key, debug});
        this.$public = new Promise({endpoint, key, debug},false);
    }
    // 交换Token并且存储Token
    token({client_id, code}, callback = {}, session = {}){
        if (client_id && code) {
            const params = {client_id, code, grant_type: 'authorization_code'};
            // 构造Promise
            const uri = '/api/oth/token';
            const promise = this.$public.post(uri, params);
            const key = this.key;
            promise.then(data => {
                // 防止用户信息被盗取，删除相关信息
                if (data.code) delete data.code;
                session = Object.assign(session, data);
                // clientSecret可用于交换相关code，所以删除
                if (session['clientSecret']) delete session['clientSecret'];
                // 将最终数据写入到Session中
                Session.put(key.session(), session);
                if (callback.success) callback.success(session);
            }).fail(error => {
                if (callback.failure) callback.failure(error)
            });
        } else {
            console.warn("[OAuth] 'code' or 'clientId' missing when requesting token.");
        }
    };
    // 获取授权码
    authorize(user = {}, callback = {}, session = {}){
        // 构造authorize的参数
        const params = {};
        const client_id = user['uniqueId'];
        params['scope'] = user['scope'];
        params['client_id'] = client_id;
        params['client_secret'] = user['clientSecret'];
        params['response_type'] = 'code';
        // 提交该请求，生成响应数据
        const uri = '/api/oth/authorize';
        const promise = this.$public.post(uri, params);
        const reference = this;
        promise.then(data => {
            reference.token.bind(reference);
            reference.token({
                client_id,
                code: data.code
            }, callback, session)
        }).fail(error => {
            if (callback) callback.failure(error)
        });
    };
    // 登陆
    login(entry = '', params = {}, callback = {
        success: () => (console.warn("[JOY] (login) Success of callback not implemented.")),
        failure: () => (console.warn("[JOY] (login) Failure of callback not implemented."))
    }, session = {}){
        // 加密密码
        params.password = Encrypt.md5(params.password);
        // 直接访问，不需要secure模式
        const promise = this.$public.post(entry, params);
        // 调用远程接口登陆
        const reference = this;
        promise.then(data => {
            Object.assign(session, data);
            reference.authorize.bind(reference);
            reference.authorize(data, callback, session);
        }).fail(error => {
            if (callback) callback.failure(error)
        });
    }
    // 修改密码接口
    cipher(params = {}, callback = {
        success: () => (console.warn("[JOY] (cipher) Success of callback not implemented.")),
        failure: () => (console.warn("[JOY] (cipher) Failure of callback not implemented."))
    }, session = {}){
        // 加密两个密码，仅提供提交参数
        const data = {};
        data['id'] = params['uniqueId'];
        data['opassword'] = Encrypt.md5(params['opassword']);
        data['npassword'] = Encrypt.md5(params['npassword']);
        // 使用secure模式访问，固定访问地址和参数
        const uri = '/api/user/cipher';
        const promise = this.$secure.put(uri, params);
        // 调用远程接口
        promise.then(data => {
            if(callback.success) callback.success(data);
        }).fail(error => {
            if(callback.failure) callback.failure(error);
        })
    };
    // 登陆控制
    forbidden(props = {}, uri, fnCallback){
        // 登陆检查，不存在的时候登出系统
        const session = this.app.user();
        if(!session){
            const { $router = { to:() => {}} } = props;
            $router.to(uri);
        }else{
            if(fnCallback){
                fnCallback();
            }
        }
    };
    // 注销用户，存在时执行
    logout(props = {}, uri = ''){
        const session = this.app.user();
        if(session){
            Session.remove(this.key.session());
            const { $router, $app } = props;
            if($app.is()){
                uri = `/${$app._('path')}${uri}`;
            }
            $router.to(uri);
        }
    }
}
export default OAuth
