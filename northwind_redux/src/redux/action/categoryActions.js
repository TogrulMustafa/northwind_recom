import * as actionTypes from './actionTypes'


export const changeCategory = category => {
    return {
        type: actionTypes.CHANGE_CATEGORY,
        payload: category
    }
}



export const getCategoriesSuccess = result => {
    return {
        type: actionTypes.GET_CATEGORIES_ACCESS,
        payload: result
    }
}

export const getCategories = _ => {
    return function(dispatch) {
        let url = 'http://localhost:3000/categories'
        return fetch(url)
                .then(response => response.json())
                .then(result => dispatch(getCategoriesSuccess(result)))
    }
}