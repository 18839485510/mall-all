//import { LOAD_DATA, CHANGE_ITEM, ADD_ITEM, DEL_ITEM } from './actionType'
import * as types from './actionType.js'

import { fromJS } from 'immutable'
//定义一个初始化的state
const defaultState = fromJS({ isLoading: false, captcha: '' })

function reducer(state = defaultState, action) {
    if (action.type == types.REQUEST_START) {
        return state.set('isLoading', true)
    }
    if (action.type == types.REQUEST_END) {
        return state.set('isLoading', false)
    }
    if (action.type == types.SET_CAPTCHA) {
        return state.set('captcha', action.payload)
    }
    return state
}

export default reducer