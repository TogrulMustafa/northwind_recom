import * as actionTypes from '../action/actionTypes'
import initialState from './initialState'


const addToCart = (state=initialState.cart, action) => {
    switch (action.type) {
        case actionTypes.ADD_TO_CART:
            const addedItem = state.find(item => item.product.id === action.payload.product.id)
            if (addedItem) {
                const addState = state.map(item => {
                    if (item.product.id === action.payload.product.id) {
                        return Object.assign({},addedItem,{quantity: addedItem.quantity + 1})
                    }
                    return item
                })
                return addState
            } 
            else {
                return [...state,{...action.payload}]
            }
        case actionTypes.REMOVE_FROM_CART:
            const removeState = state.filter(item => item.product.id !== action.payload.product.id)
            return removeState
        default:
            return state;
    }
}

export default addToCart