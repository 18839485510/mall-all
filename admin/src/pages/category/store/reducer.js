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
    icon: '',
    iconValidate: {
        help: '',
        validateStatus: ''
    },
    categories: []
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
    if (action.type == types.GET_USERLIST_START) {
        return state.set('isFecthing', true)
    }
    if (action.type == types.GET_USERLIST_END) {
        return state.set('isFecthing', false)
    }
    if (action.type == types.SET_ICON) {
        return state.merge({
            icon: action.payload,
            iconValidate: fromJS({
                help: '',
                validateStatus: ''
            })
        })
    }
    if (action.type == types.SET_ICON_ERR) {
        return state.set('iconValidate', fromJS({
            help: '请上传手机分类图标',
            validateStatus: 'error'
        }))
    }
    if (action.type == types.SET_CATEGORIES) {
        return state.set('categories', action.payload)
    }
    return state
}

export default reducer