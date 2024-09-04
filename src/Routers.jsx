import { BrowserRouter, Routes, Outlet, Route } from "react-router-dom";
import Products from "./pages/Products";
import ProductByCategory from "./pages/Categories";
import AddProduct from "./pages/AddProduct";
import UpdateProduct from "./pages/UpdateProduct";
import RegisterPage from "./pages/RegistrationPage";
import Login from "./pages/LoginPage";
import SlickSlider from './pages/SlickSlider'
import Cart from "./components/Cart";
import Header from './components/Header'
import Product from "./pages/Product";
// import SliderProduct from "./pages/SliderProduct";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategoriesData } from "./Action/Data";

const RouterPage = () => {

  const allDummyData = useSelector((state) => state.GetAllCategoriesReducer?.getallCategories);
  const dispatch = useDispatch()
  //Displaying All the data
  useEffect(() => {
    dispatch(getAllCategoriesData())
  }, [])

  // const Navbar = () => {
  //   if (window.location.href == "http://localhost:5173/") {
  //     <Navbar allProductList={allDummyData} />
  //   }
  // }

  return (
    <BrowserRouter>
      <Header />
     
      <div className="container mx-auto bg-gray-200 mb-5">
        <Routes>
          <Route path="/" element={<Outlet />}>
            <Route path="/" index element={<Products allProductList={allDummyData} />} />
            <Route path="/products/:id" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/add_product" element={<AddProduct />} />
            <Route path="/update_product" element={<UpdateProduct />} />
            <Route path="/products/category" element={<ProductByCategory />} />
            <Route path="/slick" element={<SlickSlider />} />
          
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/login' element={<Login />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>

  )
}

export default RouterPage
