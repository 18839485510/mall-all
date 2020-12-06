//import { LOAD_DATA, CHANGE_ITEM, ADD_ITEM, DEL_ITEM } from './actionType'
import * as types from './actionType.js'

import { fromJS } from 'immutable'
//定义一个初始化的state
const defaultState = fromJS({
    usernum: 0,
    ordernum: 0,
    productnum: 0
})

function reducer(state = defaultState, action) {
    if (action.type == types.SET_COUNTS) {
        const { usernum, ordernum, productnum } = action.payload
        return state.merge({
            usernum,
            ordernum,
            productnum
        })
    }
    return state
}

export default reducer