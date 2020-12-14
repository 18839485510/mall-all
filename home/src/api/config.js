export const SERVER = process.env.NODE_ENV == 'production' ? 'http://api.sortmall.com' : ''
export const VERSION = 'v1'

export const CATEGORY_ICON_UPLOAD_ADDRESS = SERVER + '/' + VERSION + '/categories/icons'
export const PRODUCT_IMAGE_UPLOAD_ADDRESS = SERVER + '/' + VERSION + '/products/images'
export const PRODUCT_DETAIL_IMAGES_ADDRESS = SERVER + '/' + VERSION + '/products/detailImages'
export const API_CONFIG = {
    getcaptcha: ['/users/captcha', 'get'],
    login: ['/users/login', 'post'],
    getcounts: ['/counts', 'get'],
    logout: ['/users/logout', 'get'],
    getUserList: ['/users/list', 'get'],
    getUpdateIsActive: ['/users/isActive', 'put'],
    getUpdatePwd: ['/users/pwd', 'put'],

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

    addProduct: ['/products', 'post'],
    uadateProduct: ['/products', 'put'],
    getProductList: ['/products/list', 'get'],
    UpdateProductsIsShow: ['/products/isShow', 'put'],
    UpdateProductsStatus: ['/products//status', 'put'],
    UpdateProductsIsHot: ['/products//isHot', 'put'],
    UpdateProductsOrder: ['/products//order', 'put'],
    getProductsDetail: ['/products//detail', 'get'],

    addAd: ['/ads', 'post'],
    uadateAd: ['/ads', 'put'],
    getAdList: ['/ads/list', 'get'],
    UpdateAdsIsShow: ['/ads/isShow', 'put'],
    UpdateAdsOrder: ['/ads//order', 'put'],
    getAdsDetail: ['/ads//detail', 'get'],
}