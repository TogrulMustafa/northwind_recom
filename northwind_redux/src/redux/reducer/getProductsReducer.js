import * as actionTypes from '../action/actionTypes'
import initialState from '../reducer/initialState'


const getProducts = (state=initialState.products, action) => {
    switch (action.type) {
        case actionTypes.GET_PRODUCTS_ACCESS:
            return action.payload
        default:
            return state;
    }
}

export default getProducts