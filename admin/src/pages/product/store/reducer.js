//import { LOAD_DATA, CHANGE_ITEM, ADD_ITEM, DEL_ITEM } from './actionType'
import * as types from './actionType.js'

import { fromJS } from 'immutable'
//定义一个初始化的state
const defaultState = fromJS({
    current: 1,
    total: 0,
    pageSize: 0,
    list: [],
    isFecthing: false,
    categories: [],
    allAttrs: []
})

function reducer(state = defaultState, action) {
    if (action.type == types.SET_PAGES) {
        const { list, current, total, pageSize } = action.payload
        return state.merge({
            current: current,
            total: total,
            pageSize: pageSize,
            list: list
        })
    }
    if (action.type == types.PAGE_REQUEST_START) {
        return state.set('isFecthing', true)
    }
    if (action.type == types.PAGE_REQUEST_END) {
        return state.set('isFecthing', false)
    }
    if (action.type == types.SET_CATEGORIES) {
        return state.set('categories', action.payload)
    }
    if (action.type == types.SET_ALL_ATTRS) {
        return state.set('allAttrs', action.payload)
    }
    return state
}

export default reducer