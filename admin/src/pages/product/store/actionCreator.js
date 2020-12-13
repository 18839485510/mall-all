//import { LOAD_DATA, CHANGE_ITEM, ADD_ITEM, DEL_ITEM } from './actionType.js'
import * as types from './actionType.js'
import api from 'api'
import { message } from 'antd'

const getPageRequestStart = () => {
    return {
        type: types.PAGE_REQUEST_START
    }
}

const getPageRequestEnd = () => {
    return {
        type: types.PAGE_REQUEST_END
    }
}

const setPages = (payload) => {
    return {
        type: types.SET_PAGES,
        payload: payload
    }
}

//store里存分类数据
const setCategories = (payload) => ({
    type: types.SET_CATEGORIES,
    payload: payload
})

//store里存属性数据
const setAllAttrs = (payload) => ({
    type: types.SET_ALL_ATTRS,
    payload: payload
})

export const getPagesAction = (page, keyword) => {
    return async function (dispatch) {
        try {
            dispatch(getPageRequestStart())
            const options = {
                page: page
            }
            if (keyword) {
                options.keyword = keyword
            }
            const result = await api.getProductList(options)
            if (result.code == 0) {
                dispatch(setPages(result.data))
            } else[
                message.error(result.message)
            ]
        } catch (e) {
            console.log(e)
            message.error('网络请求失败', 1)
        } finally {
            dispatch(getPageRequestEnd())
        }
    }
}

export const getUpdateIsShowAction = (id, newIsShow) => {
    return async function (dispatch, getState) {
        dispatch(getPageRequestStart())
        const page = getState().get('product').get('current')
        try {
            const result = await api.UpdateProductsIsShow({
                id: id,
                isShow: newIsShow,
                page: page
            })
            if (result.code == 0) {
                dispatch(setPages(result.data))
                message.success('修改成功', 1)
            } else {
                message.error(result.message)
            }
        } catch (e) {
            console.log(e)
            message.error('网络请求失败', 1)
        } finally {
            dispatch(getPageRequestEnd())
        }
    }

}

export const getUpdateStatusAction = (id, newStatus) => {
    return async function (dispatch, getState) {
        dispatch(getPageRequestStart())
        const page = getState().get('product').get('current')
        try {
            const result = await api.UpdateProductsStatus({
                id: id,
                status: newStatus,
                page: page
            })
            if (result.code == 0) {
                dispatch(setPages(result.data))
                message.success('修改成功', 1)
            } else {
                message.error(result.message)
            }
        } catch (e) {
            console.log(e)
            message.error('网络请求失败', 1)
        } finally {
            dispatch(getPageRequestEnd())
        }
    }

}

export const getUpdateIsHotAction = (id, newIsHot) => {
    return async function (dispatch, getState) {
        dispatch(getPageRequestStart())
        const page = getState().get('product').get('current')
        try {
            const result = await api.UpdateProductsIsHot({
                id: id,
                isHot: newIsHot,
                page: page
            })
            if (result.code == 0) {
                dispatch(setPages(result.data))
                message.success('修改成功', 1)
            } else {
                message.error(result.message)
            }
        } catch (e) {
            console.log(e)
            message.error('网络请求失败', 1)
        } finally {
            dispatch(getPageRequestEnd())
        }
    }

}

export const getUpdateOrderAction = (id, newOrder) => {
    return async function (dispatch, getState) {
        dispatch(getPageRequestStart())
        const page = getState().get('product').get('current')
        try {
            const result = await api.UpdateProductsOrder({
                id: id,
                order: newOrder,
                page: page
            })
            if (result.code == 0) {
                dispatch(setPages(result.data))
                message.success('修改成功', 1)
            } else {
                message.error(result.message)
            }
        } catch (e) {
            console.log(e)
            message.error('网络请求失败', 1)
        } finally {
            dispatch(getPageRequestEnd())
        }
    }

}

//提交新增、更改
export const getSaveAction = (values) => {
    return async function () {
        try {
            let request = api.addProduct
            let actionMessage = '添加商品成功'
            if (values.id) {
                request = api.uadateProduct
                actionMessage = '修改商品成功'
            }
            const result = await request(values)
            if (result.code == 0) {
                message.success(actionMessage, 1)
            } else {
                message.error(result.message, 1)
            }
        } catch (e) {
            console.log(e)
            message.error('网络请求失败', 1)
        }
    }
}

//获取分类选项数据
export const getLevelCategoriesAction = () => {
    return async function (dispatch) {
        try {
            const result = await api.getLevelCategories({
                leval: 3
            })
            if (result.code == 0) {
                dispatch(setCategories(result.data))
            }
        } catch (e) {
            message.error('网络请求失败', 1)
        }
    }
}
export const getAllAttrsAction = () => {
    return async function (dispatch) {
        try {
            const result = await api.getAllAttrs()
            if (result.code == 0) {
                dispatch(setAllAttrs(result.data))
            }
        } catch (e) {
            console.log(e)
            message.error('网络请求失败', 1)
        }
    }
}


