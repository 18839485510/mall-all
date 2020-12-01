import { combineReducers } from 'redux-immutable'

//合并所有组件的reducer

import { reducer as login } from 'pages/login/store'

export default combineReducers({
    login
})