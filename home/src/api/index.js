//目标：生成一个对象，这个对象的每一个属性名是一个方法名，对应的属性值是一个api方法的调用
//eg:  {handleChange:()=>{}}

//依据配置文件来生成对象
var { SERVER, VERSION, API_CONFIG } = require('./config')
const getApiObj = (apiConfig) => {
    let apiObj = {}
    for (let key in apiConfig) {
        const url = SERVER + '/' + VERSION + apiConfig[key][0] || ''
        const method = apiConfig[key][1] || 'get'
        apiObj[key] = (data,success,error) => {

            const options = {
                url: url,
                method: method,
                data: data,
                success:success,
                error:error
            }
            return request(options)
        }
    }
    return apiObj
}

const request = (options) => {
    $.ajax({
        url: options.url,
        type: options.method,
        data: options.data,
        dataType: 'json',//返回数据的类型,可以是xml json jsonp script text html,默认是text
        xhrFields: { withCredentials: true },//跨域请求是否携带cookie设置,true为携带
        success: function(result){
            if(result.code==0){

            }
            console.log(result)
        },
        error:function(err){
            console.log(err)
        }
    })
}

module.exports = getApiObj(API_CONFIG)