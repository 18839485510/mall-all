//目标：生成一个对象，这个对象的每一个属性名是一个方法名，对应的属性值是一个api方法的调用
//eg:  {handleChange:()=>{}}
import axios from 'axios'

//依据配置文件来生成对象
import { SERVER, VERSION, API_CONFIG } from './config'

import { goLogin, removeUsername } from 'utils'


const getApiObj = (apiConfig) => {
    let apiObj = {}
    for (let key in apiConfig) {
        const url = SERVER + '/' + VERSION + apiConfig[key][0] || ''
        const method = apiConfig[key][1] || 'get'
        apiObj[key] = (data) => {
            return request(url, method, data)
        }
    }
    return apiObj
}

const request = (url, method, data) => {
    return new Promise((resolve, reject) => {
        const options = {
            url: url,
            method: method
        }
        if (method.toUpperCase() == 'GET') {
            options.params = data
        } else {
            options.data = data
        }
        axios(options).then(result => {
            const data = result.data
            if (data.code == 10) {
                //没有权限
                removeUsername()
                //跳转到登录界面
                goLogin()
                //返回警告信息
                resolve('没有权限')
            } else {
                resolve(data)
            }

        }).catch(e => {
            reject(e)
        })
    })


}

export default getApiObj(API_CONFIG)