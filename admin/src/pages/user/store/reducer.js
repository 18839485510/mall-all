//import { LOAD_DATA, CHANGE_ITEM, ADD_ITEM, DEL_ITEM } from './actionType'
import * as types from './actionType.js'

import { fromJS } from 'immutable'
//定义一个初始化的state
const defaultState = fromJS({
    list: []
})

function reducer(state = defaultState, action) {
    if (action.type == types.SET_PAGES) {
        const { list } = action.payload
        return state.set('list', list)
    }
    return state
}

export default reducer