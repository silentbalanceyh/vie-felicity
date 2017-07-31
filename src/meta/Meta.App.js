import Key from './Meta.Key'
import { Session, Storage } from "../tool/Tool.Store"
import Formule from '../string/String.Formule'
class App {

    constructor(prefix = ''){
        this.key = new Key(prefix);
    }

    read(){
        const name = Session.get(this.key.run());
        let data = null;
        if(name){
            const key = Formule.format(this.key.app(),{name});
            data = Storage.get(key);
        }
        return data;
    }

    write(data){
        if(data && data.name){
            const name = data.name.toUpperCase();
            // 写入运行专用App配置
            Session.put(this.key.run(), name);
            // 写入App配置
            const key = Formule.format(this.key.app(), {name});
            Storage.put(key, data);
        }
    }
    // 读取登陆用户
    user(){
        return Session.get(this.key.session());
    }
}

export default App
