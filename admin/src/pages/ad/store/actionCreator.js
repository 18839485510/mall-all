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

export const getPagesAction = (page) => {
    return async function (dispatch) {
        try {
            dispatch(getPageRequestStart())
            const result = await api.getAdList({
                page: page
            })
            if (result.code == 0) {
                dispatch(setPages(result.data))
            } else[
                message.error(result.message)
            ]
        } catch (e) {
            message.error('网络请求失败', 1)
        } finally {
            dispatch(getPageRequestEnd())
        }
    }
}

export const getUpdateIsShowAction = (id, newIsShow) => {
    return async function (dispatch, getState) {
        dispatch(getPageRequestStart())
        const page = getState().get('ad').get('current')
        try {
            const result = await api.UpdateAdsIsShow({
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
            message.error('网络请求失败', 1)
        } finally {
            dispatch(getPageRequestEnd())
        }
    }

}

export const getUpdateOrderAction = (id, newOrder) => {
    return async function (dispatch, getState) {
        dispatch(getPageRequestStart())
        const page = getState().get('ad').get('current')
        try {
            const result = await api.UpdateAdsOrder({
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
            message.error('网络请求失败', 1)
        } finally {
            dispatch(getPageRequestEnd())
        }
    }

}

//提交新增、更改
export const getSaveAction = (values) => {
    return async function (dispatch) {
        try {
            let request = api.addAd
            let actionMessage = '添加广告成功'
            if (values.id) {
                request = api.uadateAd
                actionMessage = '修改广告成功'
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

