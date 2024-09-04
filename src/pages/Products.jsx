/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteProductswithTextCategory, getAllCategoriesData } from '../Action/Data';
import { Link, useNavigate, } from 'react-router-dom'
import { FaCartShopping, FaHeart } from "react-icons/fa6";
import { addToCart, getCartTotal } from '../reducer/cartSlice';
import { IoCreateSharp } from 'react-icons/io5';
import { MdDelete } from 'react-icons/md';
import Heading from '../components/Heading';

const Products = ({ allProductList }) => {
  const navigate = useNavigate();
  const stringLoginData = localStorage.getItem('sessionToken');
  const JSONformatData = JSON.parse(stringLoginData);


  useEffect(() => {
    if (!JSONformatData) {
      navigate("/login")
    }
  }, [])

  // const allDummyData = useSelector((state) => state.GetAllCategoriesReducer?.getallCategories)
  const deletedProduct = useSelector((state) => state.DeleteProductWithTextReducer?.deleteWithTextProduct);
  const dispatch = useDispatch()

  //Displaying All the data
  useEffect(() => {
    dispatch(getAllCategoriesData())
  }, [])

  //Add to cart Product
  const [qty] = useState(1);
  const handleAddToCart = (item) => {
    // console.log(item);
    let totalPrice = qty * item.price;
    const tempProduct = {
      ...item,
      quantity: qty,
      totalPrice,
    };
    dispatch(addToCart(tempProduct));
    dispatch(getCartTotal());
  };

  //Deleting the Product in console
  const handleOnDelete = (productId) => {
    dispatch(deleteProductswithTextCategory(productId))
    console.log("Deleted State", deletedProduct);
  }

  //Search Bar Implementation
  const [searchTerm, setSearchTerm] = useState("");
  const searchValue = allProductList.filter((find) => find.title.toLowerCase().includes(searchTerm));

  return (
    <div className="bg-gray-100 text-gray-900 text-xl pb-4 px-4">
      <nav className='w-full bg-gray-100'>
        <div className="container mx-auto bg-gray-100 lg:max-w-screen-lg max-w-screen-sm py-3 bg-gray relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <input onChange={(e) => setSearchTerm(e.target.value.toLowerCase())} type="search" id="default-search" className="block w-full px-4 py-4 ps-10 text-lg text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Search any Product..." required />
          {/* <button to={`search/${searchTerm}`} type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">Search</button> */}
        </div>
      </nav>
      <Heading heading={"See our products"} />
      <div className="bg-gray-100 mx-auto  text-xs cursor-pointer gap-x-5 gap-y-3 overflow-hidden grid grid-cols-1 xl:grid-cols-3 2xl:grid-cols-4 sm:grid-cols-1 md:grid-cols-2 py-2">
        {searchValue.map((product, index) => (
          <>
            {searchValue.length === 0
              ?
              <div>
                <p>
                  No data Found
                </p>
              </div>
              :
              <div key={index} className="group relative cursor-pointer bg-gray-200 hover:bg-[#cbd5e1] hover:rounded-e-lg hover:rounded-s-lg rounded-s-lg rounded-e-lg"  >
                <div className="w-full overflow-hidden lg:aspect-none group-hover:opacity-75 h-52 rounded-ss-lg rounded-t-lg ">
                  <img
                    src={product?.thumbnail}
                    alt={product?.category}
                    title={product?.category}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full" />
                  <div className="absolute top-0 right-0 transform translate-x-full opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="flex flex-wrap flex-col gap-y-0.5  p-2 mr-1 mt-1">
                      <button onClick={() => handleAddToCart(product)} className='flex justify-end'>
                        <FaCartShopping className="w-4 h-4 p-0.5 bg-gray-300 hover:bg-gray-500 hover:text-white" />
                      </button>
                      <Link to={"/update_product"} state={product} className='flex justify-end'>
                        <IoCreateSharp className="w-4 h-4 p-0.5 bg-gray-300 hover:bg-gray-500 hover:text-white" />
                      </Link>
                      <FaHeart title="Add to Favourite" className="w-4 h-4 p-0.5 bg-gray-300 hover:bg-gray-500 hover:text-white " />

                      <button onClick={() => handleOnDelete(product.id)} className='flex justify-end w-fit'>
                        <MdDelete className="w-4 h-4 p-0.2 bg-gray-300 hover:bg-gray-500 hover:text-white text-end" />
                      </button>
                      {/* <Link to={`/products/${product.id}`} state={product}>
      <VscThreeBars className='w-4 h-4 p-[2px] hover:bg-gray-500 hover:text-white text-end bg-gray-300 ' />
    </Link> */}
                    </div>
                  </div>
                </div><div className="px-3 py-2 justify-between">
                  <p className="text-sm flex pb-1 justify-center border-b-[0.5px]  border-gray-500 text-gray-500">Brand: {product?.brand}</p>

                  <div className=''>

                    <h3 className="text-base py-1 text-gray-700 text-center ">
                      <Link to={`/products/${(product.title).replaceAll(" ", "-")}`} state={product} className='hover:underline hover:font-semibold'>
                        {product?.title}
                      </Link>
                    </h3>
                  </div>

                  <div className='flex justify-center gap-2'>
                    <p className="text-xs font-semibold pr-2 border-r-[1px] border-gray-500 items-center flex text-gray-500 line-through">${product?.price}</p>
                    <p className="flex items-center text-lg font-medium pr-2 border-r-[1px] border-gray-500 text-gray-900">${((product?.price) - (product?.price * (product?.discountPercentage / 100))).toFixed(2)}</p>
                    <p className="text-base font-medium flex items-center text-zinc-700">({(product?.discountPercentage).toFixed(1)}% Off)</p>
                  </div>
                </div>
              </div>
            }
          </>
        ))}
      </div >
    </div>
  )
}

export default Products