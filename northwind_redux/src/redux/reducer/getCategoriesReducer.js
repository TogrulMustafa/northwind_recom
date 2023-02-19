import * as actionTypes from '../action/actionTypes'
import initialState from './initialState'



const getCategories = (state=initialState.categories, action) => {
    switch (action.type) {
        case actionTypes.GET_CATEGORIES_ACCESS:
            return action.payload
        default:
            return state;
    }
}

export default getCategories