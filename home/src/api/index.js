//目标：生成一个对象，这个对象的每一个属性名是一个方法名，对应的属性值是一个api方法的调用
//eg:  {handleChange:()=>{}}

//依据配置文件来生成对象
var utils = require('utils')
var { SERVER, VERSION, API_CONFIG } = require('./config')
const getApiObj = (apiConfig) => {
    let apiObj = {}
    for (let key in apiConfig) {
        let url = SERVER + '/' + VERSION + apiConfig[key][0] || ''
        const method = apiConfig[key][1] || 'get'
        if (!url.startsWith('http://') && SERVER) {
            url = SERVER + url
        }
        apiObj[key] = (options) => {
            return request({
                url: url,
                method: method,
                data: options.data,
                success: options.success,
                error: options.error,
                params: options.params//其他特殊的配置
            })
        }
    }
    return apiObj
}

const request = (options) => {
    let params = {}
    if (options.params) {
        params = options.params
    }
    $.ajax({
        url: options.url,
        type: options.method,
        data: options.data,
        dataType: 'json',//返回数据的类型,可以是xml json jsonp script text html,默认是text
        xhrFields: { withCredentials: true },//跨域请求是否携带cookie设置,true为携带
        ...params,
        success: function (result) {
            if (result.code == 0) {
            } else if (result.code == 1) {
                options.error && options.error(result.message)
            } else if (result.code == 10) {
                utils.goLogin()
            } else {
                options.error && options.error(result.message)
            }
        },
        error: function (err) {
            console.log(err)
            options.error && options.error('网络请求失败，请重试')
        }
    })
}

module.exports = getApiObj(API_CONFIG)