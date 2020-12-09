export const SERVER = process.env.NODE_ENV == 'production' ? 'http://api.sortmall.com' : ''
export const VERSION = 'v1'
export const API_CONFIG = {
    getcaptcha: ['/users/captcha', 'get'],
    login: ['/users/login', 'post'],
    getcounts: ['/counts', 'get'],
    logout: ['/users/logout', 'get'],
    getUserList: ['/users/list', 'get'],
    getUpdateIsActive: ['/users/isActive', 'put']
}