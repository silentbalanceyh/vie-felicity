import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/from';
import {Observable} from 'rxjs';

const $ = (type, $action, fnPromise, fnCallback) => {
    return $action.ofType(type)
        .map(action => action.payload)
        .switchMap((payload) => {
            // 1.构造Promise
            const promise = fnPromise(payload);
            // 2.发送事件
            return Observable.from(promise).map(fnCallback)
        });
};

export default {
    $
}