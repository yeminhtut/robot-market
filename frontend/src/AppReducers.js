import { combineReducers } from 'redux'

import { productReducer } from './modules/product/reducer'

const appReducer = combineReducers({
    product: productReducer
})

export default appReducer
