import { BrowserRouter, Routes, Outlet, Route } from "react-router-dom";
import Products from "./pages/Products";
import Product from "./pages/Product";
import ProductByCategory from "./pages/Categories";
import AddProduct from "./pages/AddProduct";
import UpdateProduct from "./pages/UpdateProduct";
import RegisterPage from "./pages/RegistrationPage";
import Login from "./pages/LoginPage";

import Cart from "./components/Cart";
import Header from './components/Header'

const RouterPage = () => {

  return (
    <BrowserRouter>
      <Header />
      <div className="container mx-auto bg-gray-200">
        <Routes>
          <Route path="/" element={<Outlet />}>
            <Route path="/" index element={<Products />} />
            
            <Route path="/products/:id" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/add_product" element={<AddProduct />} />
            <Route path="/update_product" element={<UpdateProduct />} />
            <Route path="/products/category" element={<ProductByCategory />} />
            
            <Route path={`/register`} element={<RegisterPage />} />
            <Route path={`/login`} element={<Login />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>

  )
}

export default RouterPage
