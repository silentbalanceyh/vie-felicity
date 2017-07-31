import Q from 'q'
class Flow {

    constructor(promise) {
        this.promise = promise;
        this.replace = (params = {}, replaced = []) => {
            const target = {};
            for (const key in params) {
                const expr = params[key];
                let value = null;
                if (expr && 0 < expr.indexOf('.')) {
                    const meta = expr.toString().split('.');
                    if (Array.prototype.isPrototypeOf(meta)) {
                        const index = meta[0];
                        const field = meta[1];
                        if (undefined !== index && field) {
                            const element = replaced[index];
                            if (element) {
                                value = element[field];
                            }
                        }
                    }
                    if (undefined !== value) {
                        target[key] = value;
                    }
                } else {
                    target[key] = value;
                }
            }
            return target;
        };
    }

    catena(promise, next = [], reference = []) {
        if (0 === next.length) {
            return promise
        } else {
            // 构造参数链
            const config = next[0];
            const nextPromise = promise.then(data => {
                reference.push(data);
                const {uri, params = {}, secure = true} = config;
                const target = this.replace(params, reference);
                return this.promise.flowGet(uri, target, reference, secure);
            });
            // 链式操作递归
            if (1 === next.length) {
                return nextPromise
            } else {
                const left = next.slice(1);
                return this.catena(nextPromise, left, reference);
            }
        }
    };

    parallel(promise, multi = [], reference = []) {
        if (0 === multi.length) {
            return promise
        } else {
            // 构造参数
            return promise.then(data => {
                reference["-1"] = data;
                const fnReplace = this.replace;
                // Promise的构建函数
                const parallelPromise = (multi = [], replaced = []) => {
                    const result = [];
                    multi.forEach(config => {
                        const { uri, params = {}, secure = true} = config;
                        const target = fnReplace(params, replaced);
                        const promise = Promise.get(uri, target, secure);
                        result.push(promise);
                    });
                    return Q.all(result);
                };
                // 返回并行化的Promise信息
                return parallelPromise(multi, reference).then(
                    parallelData => {
                        const ret = [];
                        ret.push(data);
                        const parallel = {};
                        multi.forEach((item, index) => {
                            if (item.key) {
                                const response = parallelData[index];
                                if (response) {
                                    parallel[item.key] = response.list
                                }
                            }
                        });
                        ret.push(parallel);
                        return ret;
                    }
                );
            });
        }
    }
}
export default Flow;
