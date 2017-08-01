const link = (app = {}, link) => (`/${app.path}${link}`);

const image = (path = '') => {
    if(0 <= path.indexOf("img:")){
        // 以img:开头，直接从静态图片库中读取
        return `/img${path.substring(4)}`;
    }
};

const query = (path = '') => {
    const params = {};
    if(path.startsWith('?')){
        path = path.substring(path.indexOf('?') + 1);
        const pairs = path.split('&');
        pairs.forEach(item => {
            if(0 < item.indexOf('=')){
                const key = item.split("=")[0];
                const value = item.split("=")[1];
                if(key) {
                    params[key] = value;
                }
            }
        })
    }
    return params;
};
export default {
    link,
    image,
    query
}
