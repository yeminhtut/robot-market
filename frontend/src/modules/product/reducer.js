import { actionTypes } from '../../AppActions.js'
const defaultState = {
    error: null,
    isLoadingGetProduct: false,
    productList: []
}

function productReducer(state = defaultState, action) {
    switch (action.type) {
        case actionTypes.PRODUCT.PRODUCT_GET_ALL_RESPONSE:
            return {
                ...state,
                productList: action.payload.list.data
            }

        default:
            return state
    }
}

export { productReducer, defaultState }
