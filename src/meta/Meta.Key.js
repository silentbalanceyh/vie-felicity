
class Key{

    constructor(prefix){
        if(!prefix){
            console.error("[JOY] Please provide correct prefix when create Key");
            return;
        }
        this.prefix = prefix;
    }

    session(){
        return `${this.prefix}SESSION/USER`;
    }

    app(){
        return `${this.prefix}STORE/APP/$name`;
    }

    run(){
        return `${this.prefix}STORE/RUN`;
    }
}

export default Key;