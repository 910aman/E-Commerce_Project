/* eslint-disable no-undef */
import axios from 'axios'
import { ADD_PRODUCT_TO_CART, ADD_PRODUCT_WITH_TEXT_CART, ADD_REGISTER_WITH_USER, DELETE_PRODUCT_WITH_TEXT_CART, GET_ALL_CATEGORIES, GET_LOGIN_WITH_USER, GET_PRODUCT_BY_CATEGORY, GET_PRODUCTS_ON_CATEGORY, GET_SINGLE_PRODUCT, UPDATE_PRODUCT_WITH_TEXT_CART } from '../Redux/ActionType'
import { Cookies } from 'react-cookie';
const BASE_URL = process.env.REACT_APP_DUMMY_URL;

const storeInLocalStorage = (data) => {
    localStorage.setItem('loginInfo', JSON.stringify(data));
    const cookie = new Cookies();
    cookie.set("My Session token",data.token)
    console.log("Store the data", cookie);
    localStorage.setItem('sessionToken', JSON.stringify(cookie));
}

export const getAllCategoriesData = () => {
    return (dispatch) => {
        axios.get(`${BASE_URL}/products?limit=100`)
            .then((response) => {
                // console.log("resp",response.data);
                // console.log("resp",response.status)

                dispatch({
                    type: GET_ALL_CATEGORIES,
                    payload: response.data,
                });
            })
            .catch(error => {
                console.log("All Categories error::", error);
            });
    }
}

export const getSingleProductCategory = (id) => {
    return (dispatch) => {
        axios.get(`${BASE_URL}/products/${id}`)
            .then((response) => {
                dispatch({
                    type: GET_SINGLE_PRODUCT,
                    payload: response.data,

                })
            }).catch(error => {
                console.log("error::", error);
            });
    }
}

export const addProductToCart = (products) => {
    return (dispatch) => {
        axios.post(`${BASE_URL}/carts/add`, products)
            .then((response) => {
                dispatch({
                    type: ADD_PRODUCT_TO_CART,
                    payload: response.data.products,
                })
                // console.log("Cart Details from api", response);
            }).catch(error => {
                console.log("Cart error::", error);
            });
    }
}



export const getProductByCategory = () => {
    return (dispatch) => {
        axios.get(`${BASE_URL}/products/category-list`)
            .then((response) => {
                dispatch({
                    type: GET_PRODUCT_BY_CATEGORY,
                    payload: response.data,

                })
            }).catch(error => {
                console.log("Category error::", error);
            });
    }
}

export const getProductsOnCategory = (category) => {
    return (dispatch) => {
        // axios.get(`${BASE_URL}/products/category/mens-s`)
        axios.get(`${BASE_URL}/products/category/${category}`)
            .then((response) => {
                dispatch({
                    type: GET_PRODUCTS_ON_CATEGORY,
                    payload: response.data,
                })
                // console.log(response.data);
            }).catch(error => {
                console.log("Categories error::", error);
            });
    }
}

//Adding a New product 
export const addProductswithTextCategory = (addProduct) => {
    return (dispatch) => {
        // axios.get(`${BASE_URL}/products/category/mens-s`)
        axios.post(`${BASE_URL}/products/add`, addProduct)
            .then((response) => {
                dispatch({
                    type: ADD_PRODUCT_WITH_TEXT_CART,
                    payload: response.data,
                })
                // console.log("ADD_PRODUCT_WITH_TEXT_CART", response.data);

            }).catch(error => {
                console.log("Categories error::", error);
            });
    }
}

export const updateProductswithTextCategory = (productId, updateProduct) => {
    return (dispatch) => {
        axios.put(`${BASE_URL}/products/${productId}`, updateProduct)
            .then((response) => {
                dispatch({
                    type: UPDATE_PRODUCT_WITH_TEXT_CART,
                    payload: response.data,
                })
                // console.log("UPDATE_PRODUCT_WITH_TEXT_CART", response.data, "Product ID and Data ", productId, updateProduct);
            }).catch(error => {
                console.log("Update Query error::", error);
            });
    }
}

export const deleteProductswithTextCategory = (productId) => {
    return (dispatch) => {
        axios.delete(`${BASE_URL}/products/${productId}`)
            .then((response) => {
                dispatch({
                    type: DELETE_PRODUCT_WITH_TEXT_CART,
                    payload: response.data,
                })
                // console.log("Delete_PRODUCT_WITH_TEXT_CART", response.data,"Product ID and Data ", productId);
            }).catch(error => {
                console.log("Deleting Query error::", error);
            });
    }
}

//Login and Register Details with User
export const getLoginDetailswithUser = (loginDetails) => {
    return (dispatch) => {
        axios.post(`${BASE_URL}/auth/login`, loginDetails)
            .then((response) => {
                dispatch({
                    type: GET_LOGIN_WITH_USER,
                    payload: response.data
                })
                storeInLocalStorage(response.data)
                // console.log("Login Data :: ",response,loginDetails);
            }).catch(error => {
                console.log("Login Error :: ", error);
            })
    }
}

export const getRegisterDetailswithUser = (registerDetails) => {
    return (dispatch) => {
        axios.post(`${BASE_URL}/users/add`, registerDetails)
            .then((response) => {
                dispatch({
                    type: ADD_REGISTER_WITH_USER,
                    payload: response.data
                })
                // console.log("Register Data :: ", response);
            }).catch(error => {
                console.log("Login Error :: ", error);
            })
    }
}