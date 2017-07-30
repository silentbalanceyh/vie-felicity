
import { Session } from '../tool/Tool.Store';
import Key from "../meta/Meta.Key";

class OAuth{
    constructor(prefix = ''){
        this.key = new Key(prefix);
    }

    user(){
        return Session.get(this.key.session());
    }
}

export default OAuth
