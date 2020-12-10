//import { LOAD_DATA, CHANGE_ITEM, ADD_ITEM, DEL_ITEM } from './actionType.js'
import * as types from './actionType.js'
import api from 'api'
import { message } from 'antd'

const getUserListStart = () => {
    return {
        type: types.GET_USERLIST_START
    }
}
const getUserListEnd = () => {
    return {
        type: types.GET_USERLIST_END
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
            dispatch(getUserListStart())
            const result = await api.getCategoryList({
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
            dispatch(getUserListEnd())
        }
    }
}

export const getUpdateNameAction = (id, newName) => {
    return async function (dispatch, getState) {
        dispatch(getUserListStart())
        const page = getState().get('category').get('current')
        try {
            const result = await api.UpdateCategoriesName({
                id: id,
                name: newName,
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
            dispatch(getUserListEnd())
        }
    }

}
export const getUpdateMobileNameAction = (id, newName) => {
    return async function (dispatch, getState) {
        dispatch(getUserListStart())
        const page = getState().get('category').get('current')
        try {
            const result = await api.UpdateCategoriesMobileName({
                id: id,
                mobileName: newName,
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
            dispatch(getUserListEnd())
        }
    }

}
export const getUpdateIsShowAction = (id, newIsShow) => {
    return async function (dispatch, getState) {
        dispatch(getUserListStart())
        const page = getState().get('category').get('current')
        try {
            const result = await api.UpdateCategoriesIsShow({
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
            dispatch(getUserListEnd())
        }
    }

}
export const getUpdateIsFloorAction = (id, newIsFloor) => {
    return async function (dispatch, getState) {
        dispatch(getUserListStart())
        const page = getState().get('category').get('current')
        try {
            const result = await api.UpdateCategoriesIsFloor({
                id: id,
                isFloor: newIsFloor,
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
            dispatch(getUserListEnd())
        }
    }

}
export const getUpdateOrderAction = (id, newOrder) => {
    return async function (dispatch, getState) {
        dispatch(getUserListStart())
        const page = getState().get('category').get('current')
        try {
            const result = await api.UpdateCategoriesOrder({
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
            dispatch(getUserListEnd())
        }
    }

}

export const setIconAction = (payload) => ({
    type: types.SET_ICON,
    payload: payload
})
const setIconErr = () => ({
    type: types.SET_ICON_ERR
})
export const getValidateAction = () => {
    return function (dispatch, getState) {
        const icon = getState().get('category').get('icon')
        if (!icon) {
            dispatch(setIconErr())
            return
        }
    }
}
const setCategories = (payload) => ({
    type: types.SET_CATEGORIES,
    payload: payload
})
export const getSaveAction = (values) => {
    return async function (dispatch, getState) {
        try {
            const icon = getState().get('category').get('icon')
            if (!icon) {
                dispatch(setIconErr())
                return
            }
            values.icon = icon
            const result = await api.addCategory(values)
            if (result.code == 0) {
                message.success('添加分类成功', 1)
                dispatch(setCategories(result.data))
            } else {
                message.error(result.message, 1)
            }
        } catch (e) {
            console.log(e)
            message.error('网络请求失败', 1)
        }
    }
}
export const getLevelCategoriesAction = () => {
    return async function (dispatch) {
        try {
            const result = await api.getLevelCategories()
            if (result.code == 0) {
                dispatch(setCategories(result.data))
            }
        } catch (e) {
            message.error('网络请求失败', 1)
        }
    }
}


