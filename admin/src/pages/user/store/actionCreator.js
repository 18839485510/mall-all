//import { LOAD_DATA, CHANGE_ITEM, ADD_ITEM, DEL_ITEM } from './actionType.js'
import * as types from './actionType.js'
import api from 'api'

const setPages = (payload) => {
    return {
        type: types.SET_PAGES,
        payload: payload
    }
}
export const getPagesAction = () => {
    return async function (dispatch) {
        const result = await api.getUserList()
        if (result.code == 0) {
            dispatch(setPages(result.data))
        }

    }
}
