import { ADD_PRODUCT_TO_CART, ADD_PRODUCT_WITH_TEXT_CART, DELETE_PRODUCT_WITH_TEXT_CART, GET_ALL_CATEGORIES, GET_LOGIN_WITH_USER, GET_PRODUCTS_ON_CATEGORY, GET_PRODUCT_BY_CATEGORY, ADD_REGISTER_WITH_USER, GET_SINGLE_PRODUCT, UPDATE_PRODUCT_WITH_TEXT_CART } from '../Redux/ActionType'

const intialGetAllCategoryState = {
    getallCategories: [],
}

const intialgetSingleProductState = {
    getSingleProductCategory: [],
}

const intialgetProductByState = {
    getProductByCategory: [],
}

const intialgetProductsOnCategoryState = {
    getProductsOnCategory: [],
}
const intialaddIdProductToCartState = {
    addIdProductToCart: [],
}
const intialaddwithTextProductState = {
    addWithTextProduct: [],
}
const intialupdatewithTextProductState = {
    updateWithTextProduct: [],
}

const intialdeletewithTextProductState = {
    deleteWithTextProduct: [],
}
//Login and register page with API
const intialLoginwithUserState = {
    loginWithUser: [],
}
const intialRegisterwithUserState = {
    registerWithUser: [],
}

export const GetAllCategoriesReducer = (state = intialGetAllCategoryState, action) => {
    switch (action.type) {
        case GET_ALL_CATEGORIES:
            return {
                getallCategories: action.payload.products,
                error: action.payload.products
            }
        default: return state
    }
}

export const GetSingleProductReducer = (state = intialgetSingleProductState, action) => {
    switch (action.type) {
        case GET_SINGLE_PRODUCT:
            return {
                getSingleProductCategory: action.payload,
                error: action.payload
            }
        default: return state

    }
}

export const AddProductToCartReducer = (state = intialaddIdProductToCartState, action) => {
    switch (action.type) {
        case ADD_PRODUCT_TO_CART:
            return {
                addIdProductToCart: action.payload,
                error: action.payload
            }
        default: return state
    }
}

export const AddProductWithTextReducer = (state = intialaddwithTextProductState, action) => {
    switch (action.type) {
        case ADD_PRODUCT_WITH_TEXT_CART:
            return {
                addWithTextProduct: action.payload,
                error: action.payload
            }
        default: return state
    }
}

export const UpdateProductWithTextReducer = (state = intialupdatewithTextProductState, action) => {
    switch (action.type) {
        case UPDATE_PRODUCT_WITH_TEXT_CART:
            return {
                updateWithTextProduct: action.payload,
                error: action.payload
            }
        default: return state
    }
}
export const DeleteProductWithTextReducer = (state = intialdeletewithTextProductState, action) => {
    switch (action.type) {
        case DELETE_PRODUCT_WITH_TEXT_CART:
            return {
                deleteWithTextProduct: action.payload,
                error: action.payload
            }
        default: return state
    }
}
export const GetProductByReducer = (state = intialgetProductByState, action) => {
    switch (action.type) {
        case GET_PRODUCT_BY_CATEGORY:
            return {
                getProductByCategory: action.payload,
                error: action.payload
            }
        default: return state
    }
}

export const GetProductOnCategoryReducer = (state = intialgetProductsOnCategoryState, action) => {
    switch (action.type) {
        case GET_PRODUCTS_ON_CATEGORY:
            return {
                getProductsOnCategory: action.payload.products,
                error: action.payload.products

            }
        default: return state
    }
}

//Login and Register with API
export const GetLoginwithUserReducer = (state = intialLoginwithUserState, action) => {
    switch (action.type) {
        case GET_LOGIN_WITH_USER:
            return {
                loginWithUser: action.payload,
                error: action.payload
            }
        default: return state
    }
}

export const AddRegisterwithUserReducer = (state = intialRegisterwithUserState, action) => {
    switch (action.type) {
        case ADD_REGISTER_WITH_USER:
            return {
                registerWithUser: action.payload,
                error: action.payload
            }
        default: return state
    }
}