import { combineReducers } from "redux";
import changeCategoryReducer  from "./changeCategoryReducer";
import getCategories from "./getCategoriesReducer";
import getProducts from "./getProductsReducer";
import addToCart from "./cartReducer";
import saveProduct from "./saveProductReducer";


const reducers = combineReducers({
    changeCategoryReducer,
    getCategories,
    getProducts,
    addToCart,
    saveProduct
})

export default reducers