export const SERVER = process.env.NODE_ENV == 'production' ? 'http://api.sortmall.com' : ''
export const VERSION = 'v1'

export const CATEGORY_ICON_UPLOAD_ADDRESS = SERVER + '/' + VERSION + '/categories/icons'
export const PRODUCT_IMAGE_UPLOAD_ADDRESS = SERVER + '/' + VERSION + '/products/images'
export const API_CONFIG = {
    getcaptcha: ['/users/captcha', 'get'],
    login: ['/users/login', 'post'],
    getcounts: ['/counts', 'get'],
    logout: ['/users/logout', 'get'],
    getUserList: ['/users/list', 'get'],
    getUpdateIsActive: ['/users/isActive', 'put'],

    addCategory: ['/categories', 'post'],
    uadateCategory: ['/categories', 'put'],
    getLevelCategories: ['/categories/levelCategories', 'get'],
    getCategoryList: ['/categories/list', 'get'],
    UpdateCategoriesName: ['/categories/name', 'put'],
    UpdateCategoriesMobileName: ['/categories/mobileName', 'put'],
    UpdateCategoriesIsShow: ['/categories/isShow', 'put'],
    UpdateCategoriesIsFloor: ['/categories/isFloor', 'put'],
    UpdateCategoriesOrder: ['/categories//order', 'put'],
    getCategoriesDetail: ['/categories//detail', 'get'],

    addAttr: ['/attrs', 'post'],
    uadateAttr: ['/attrs', 'put'],
    getAttrList: ['/attrs/list', 'get'],
    UpdateAttrsOrder: ['/attrs//order', 'put'],
    getAttrsDetail: ['/attrs//detail', 'get'],
    getAllAttrs: ['/attrs/allAttrs', 'get'],
}