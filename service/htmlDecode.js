var request = require('request-promise-native');
var encoding = require('encoding');

var defaultOptions = {　　　　　　　
    encoding: null,
    // form: content,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
};

/**
 * 转码指定的html页面
 * method 使用get/post方法,默认get
 * originCode 源编码
 * distCode 目标编码，默认UTF-8
 * form 参数
 * url 连接
 */
module.exports = async(param) => {
    param.method = param.method ? param.method : 'get';
    let options = Object.assign({}, defaultOptions, param);
    let retObj;
    try {
        retObj = await request(options);
        log('retObj', retObj);
        let {
            originCode,
            distCode
        } = param;
        distCode = distCode ? distCode : 'utf-8';
        retObj = encoding.convert(retObj, distCode, originCode);
    } catch (err) {
        log(err);
        retObj = err;
    }

    return retObj;
}