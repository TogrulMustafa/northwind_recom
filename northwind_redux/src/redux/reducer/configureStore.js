import { createStore, applyMiddleware } from "redux";
import reducers from "./index.js";
import thunk from "redux-thunk";


const configureStore = _ => {
    return createStore(reducers, applyMiddleware(thunk))
}

export default configureStore