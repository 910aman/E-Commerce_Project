import { combineReducers } from "redux";
import { configureStore } from '@reduxjs/toolkit';
import {
    GetAllCategoriesReducer, GetProductByReducer,
    GetSingleProductReducer, AddProductToCartReducer,
    GetProductOnCategoryReducer, AddProductWithTextReducer,
    UpdateProductWithTextReducer, DeleteProductWithTextReducer,
    GetLoginwithUserReducer, AddRegisterwithUserReducer
} from "../reducer/DummyReducer";
import cartReducer from "../reducer/cartSlice";


const rootReducer = combineReducers({
    //Products
    GetAllCategoriesReducer: GetAllCategoriesReducer,
    GetSingleProductReducer: GetSingleProductReducer,
    //Add Product to cart
    AddProductToCartReducer: AddProductToCartReducer,

    //Add new Product with Post API
    AddProductWithTextReducer: AddProductWithTextReducer,

    // Update and Delete Product with API
    UpdateProductWithTextReducer: UpdateProductWithTextReducer,
    DeleteProductWithTextReducer: DeleteProductWithTextReducer,

    //Login & Registeration Page with API 
    GetLoginwithUserReducer: GetLoginwithUserReducer,
    AddRegisterwithUserReducer: AddRegisterwithUserReducer,

    cart: cartReducer,
    //Category Page
    GetProductByReducer: GetProductByReducer,
    GetProductOnCategoryReducer: GetProductOnCategoryReducer,

})


const ConfigureStores = configureStore({
    reducer: rootReducer,
});

export default ConfigureStores;