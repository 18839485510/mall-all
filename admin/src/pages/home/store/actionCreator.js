//import { LOAD_DATA, CHANGE_ITEM, ADD_ITEM, DEL_ITEM } from './actionType.js'
import * as types from './actionType.js'
import api from 'api'

const setCounts = (payload) => {
    return {
        type: types.SET_COUNTS,
        payload: payload
    }
}
export const geCountsAction = () => {
    return async function (dispatch) {
        const result = await api.getcounts()
        console.log(result)

        if (result.code == 0) {
            dispatch(setCounts(result.data))
        }

    }
}
