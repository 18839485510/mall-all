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
            const result = await api.getUserList({
                page: page
            })
            if (result.code == 0) {
                dispatch(setPages(result.data))
            }
        } catch (e) {
            message.error('网络请求失败', 1)
        } finally {
            dispatch(getUserListEnd())
        }
    }
}

export const UpdateIsActiveAction = (id, newIsActive, page) => {
    return async function (dispatch) {
        try {
            dispatch(getUserListStart())
            const result = await api.getUpdateIsActive({
                id: id,
                isActive: newIsActive,
                page: page
            })
            if (result.code == 0) {
                dispatch(setPages(result.data))
                message.success('修改成功', 1)
            }
        } catch (e) {
            message.error('网络请求失败', 1)
        } finally {
            dispatch(getUserListEnd())
        }
    }

}

