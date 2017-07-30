import CryptoJS from 'crypto-js';

const _toInt64Bytes = (x) => {
    const bytes = [];
    for(let i = 7;i>=0;i--){
        bytes[i] = x & 0xff;
        x = x>>8;
    }
    return bytes;
}

const _toHexStr = (bytes) => {
    let hex = [];
    for (let i = 0; i < bytes.length; i++) {
        hex.push((bytes[i] >>> 4).toString(16));
        hex.push((bytes[i] & 0xF).toString(16));
    }
    return hex.join("");
}
/** MD5加密 **/
const md5 = (value) => {
    if (value) {
        return CryptoJS.MD5(String(value)).toString().toUpperCase();
    } else {
        return "";
    }
};

/** Base64 Encoding **/
const b64Enc = (value) => {
    return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(value));
};

/** Base64 Decoding **/
const b64Dec = (value) => {
    return CryptoJS.enc.Base64.parse(value).toString(CryptoJS.enc.Utf8);
};

/** **/
const hmSha512 = (value,secret) => {
    const raw = CryptoJS.HmacSHA512(value,secret);
    const wordArr = raw.words;
    let retVal = "";
    for(let idx = 0; idx < wordArr.length; idx++ ){
        const bytes = _toInt64Bytes(wordArr[idx]);
        const hexStr = _toHexStr(bytes);
        /** 取低8位 **/
        retVal += hexStr.toUpperCase().substring(8,16);
    }
    return retVal;
};
export default {
    md5,
    hmSha512,
    b64Dec,
    b64Enc
}
