const build = (generator, config = {}, data) => {
    // 1.使用generator生成参数
    if (generator) {
        const { uri, method = "GET" } = config;
        let promise = null;
        switch (method) {
            case "GET":
                promise = generator.get(uri, data);
                break;
            case "POST":
                promise = generator.post(uri, data);
                break;
            default:
                console.warn(
                    "[JOY] Promise building met error, only support GET/POST. ",
                    method
                );
                break;
        }
        return promise;
    } else {
        console.warn("[JOY] The promise generator has not been passed.");
    }
};

export default {
    build
};
