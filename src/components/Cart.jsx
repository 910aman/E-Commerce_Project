/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useDispatch, useSelector, } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
// import { addProductToCart } from "../Action/Data";
import { FaMinus, FaPlus } from "react-icons/fa";
import { addProductToCart } from "../Action/Data";

const Cart = ({ cartDetails }) => {

  const allCarts = useSelector((state) => state.AddProductToCartReducer?.addIdProductToCart);

  const location = useLocation();
  cartDetails = location.state;
  const dispatch = useDispatch();
  const stringLoginData = localStorage.getItem('sessionToken');
  const JSONformatData = JSON.parse(stringLoginData);
 
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!JSONformatData) {
      navigate("/login")
    }
  }, [])
  const [productData, setProductData] = useState({});
  const singleProductPrice = productData.price * productData.quantity;
  const products = {
    userId: 1,
    products: [cartDetails]
  }

  const incrementProduct = () => {

  };


  const decrementProduct = () => {

  };

  useEffect(() => {
    setProductData({
      userId: 1,
      products: [products],
      total: singleProductPrice
    });
    dispatch(addProductToCart(products));
  }, []);


  return (
    <div className="bg-slate-200 ">
      <div className="flex py-3">
        <div className="px-4 py-2 text-center bg-slate-300  w-full">
          <h2 className="text-xl text-center font-bold">Cart Products</h2>
          {/* <h4 className="text-lg">Cart Products</h4> */}
        </div>
      </div>
      <div className="bg-gray-100 mx-auto  text-xs cursor-pointer gap-x-5 gap-y-1 overflow-auto grid grid-cols-1 xl:grid-cols-4 sm:grid-cols-1 md:grid-cols-2 py-2">
        {allCarts.map((cartDetails, index) => (
          <div className="group h-52 w-72 relative mx-4 hover:bg-slate-300 bg-gray-200" key={index}>
            <div className="aspect-h-1 w-72 overflow-hidden  lg:aspect-none group-hover:opacity-75 lg:h-32">
              <img
                src={cartDetails?.thumbnail}
                alt={cartDetails?.category}
                title={cartDetails?.category}
                className="h-full w-full object-cover object-center  lg:h-full lg:w-full" />
              <div className="icons absolute top-0 right-0 transform translate-x-full opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
              </div>
            </div>
            <div className="py-1 flex h-auto justify-between">
              <div className='pl-3 '>
                <h3 className="text-sm text-gray-700">
                  {/* <span aria-hidden="true" className="absolute inset-0" /> */}
                  {cartDetails?.title}
                </h3>
                <p className="mt-1 text-sm text-gray-500 font-semibold">${cartDetails?.price}</p>
              </div>

              <div className="">
                <div className="flex text-sm items-center pr-2 gap-2">
                  <button className="bg-gray-400 p-2 text-sm font-bold " onClick={decrementProduct}>
                    <FaMinus >-</FaMinus>
                  </button>
                  <p className="text-xl">{cartDetails?.quantity}</p>
                  <button className="bg-gray-400 p-2 font-bold" onClick={incrementProduct}>
                    <FaPlus >-</FaPlus>
                  </button>
                </div>
                <div className="text-center text-base font-bold">Total ${cartDetails?.total}</div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Cart
