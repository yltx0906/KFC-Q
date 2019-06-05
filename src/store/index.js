import productReducer from './productReducer'
import memoReducer from './memoReducer'

import {combineReducers,createStore} from 'redux'

//合并多个reducer
let rootReducer = combineReducers({
    productState:productReducer,
    memoState:memoReducer
})

//创建仓库并且暴露
export default createStore(rootReducer)