import * as actionTypes from "./actionTypes";

export const getProductsSuccess = (result) => {
    return {
        type: actionTypes.GET_PRODUCTS_ACCESS,
        payload: result,
    };
};

export const getProducts = (categoryID) => {
    return function (dispatch) {
        let url = "http://localhost:3000/products";
        if (categoryID) {
        url += "?categoryId=" + categoryID;
        }
        return fetch(url)
        .then((response) => response.json())
        .then((result) => dispatch(getProductsSuccess(result)));
    };
};

export const createProduct = (product) => {
    return {
        type: actionTypes.CREATE_PRODUCT_SUCCESS,
        payload: product,
    };
};

export const updateProduct = (product) => {
    return {
        type: actionTypes.UPDATE_PRODUCT_SUCCESS,
        payload: product,
    };
};

export const saveProductAPI = (product) => {
    return fetch("http://localhost:3000/products/" + (product.id || ""), {
        method: product.id ? "PUT" : "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(product),
    })
    .then(handleResponse)
    .catch(handleError);
};

export const saveProduct = (product) => {
    return function (dispatch) {
        return saveProductAPI(product)
        .then((response) => {
            product.id
            ? dispatch(updateProduct(response))
            : dispatch(createProduct(response));
        })
        .catch((error) => {
            throw error;
        });
    };
};

export async function handleResponse(response) {

    if (response.ok) {
        return response.json();
    }

    const error = await response.text();
    throw new Error(error);
}

export function handleError(error) {
    throw error;
}

// throw --> Yaranan erroru veya Error obyektini(yalnizca error oturmur eyni zamanda string,number ve s. de oturur) catch-e oturen Javascript ifadesidir.
/* 
    Komponentlerimizin ownprops-u olur ve onun da layihemizde istifade edeceyimiz match,history,location kimi ve s. propertileri olur.
    Eger bu propertileri yalnizca mapStateToProps daxilinde istifade edeceksense hook komponentine props olaraq yazmagina ehtiyac yoxdur
    yox eger hook daxilinde de istifade edeceksense mutleq props olaraq hook komponentine elave etmelisen.
*/

