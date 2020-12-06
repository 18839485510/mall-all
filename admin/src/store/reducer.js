import { combineReducers } from 'redux-immutable'

//合并所有组件的reducer

import { reducer as login } from 'pages/login/store'
import { reducer as home } from 'pages/home/store'

export default combineReducers({
    login,
    home
})