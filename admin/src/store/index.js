import { createStore, applyMiddleware } from 'redux'
import reducer from './reducer'

//处理异步函数中间件
import thunk from 'redux-thunk'

//输出日志中间件
//import logger from 'redux-logger'
import { createLogger } from 'redux-logger'

const logger = createLogger({})

const middlewares = []

middlewares.push(thunk)
if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger)
}

const store = createStore(reducer, applyMiddleware(...middlewares))

export default store
