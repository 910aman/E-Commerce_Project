import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteProductswithTextCategory, getAllCategoriesData } from '../Action/Data';
import { Link, useNavigate, } from 'react-router-dom'
import { FaCartShopping, FaHeart } from "react-icons/fa6";
import { addToCart, getCartTotal } from '../reducer/cartSlice';
import { IoCreateSharp } from 'react-icons/io5';
import { MdDelete } from 'react-icons/md';
import { CiSquareMore } from 'react-icons/ci';
import { BiSolidMessageDetail } from 'react-icons/bi';

const Products = () => {

  const navigate = useNavigate();
  const stringLoginData = localStorage.getItem('sessionToken');
  const JSONformatData = JSON.parse(stringLoginData);


  useEffect(() => {
    if (!JSONformatData) {
      navigate("/login")
    }
  }, [])

  const allDummyData = useSelector((state) => state.GetAllCategoriesReducer?.getallCategories)
  const deletedProduct = useSelector((state) => state.DeleteProductWithTextReducer?.deleteWithTextProduct);
  const dispatch = useDispatch()

  //Displaying All the data
  useEffect(() => {
    dispatch(getAllCategoriesData())
  }, [])

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

  const handleOnDelete = (productId) => {
    dispatch(deleteProductswithTextCategory(productId))
    console.log("Deleted State", deletedProduct);
  }

  return (
    <div className='bg-gray-100 text-gray-900 text-xl p-4'>

      <div className="bg-gray-100 mx-auto  text-xs cursor-pointer gap-x-5 gap-y-3 overflow-hidden grid grid-cols-1 xl:grid-cols-4 2xl:grid-cols-5 sm:grid-cols-1 md:grid-cols-2 py-2">
        {allDummyData.map((product, index) => (
          <div key={index} className="group relative cursor-pointer bg-gray-200 hover:bg-slate-300 hover:rounded-e-lg hover:rounded-s-lg rounded-s-lg rounded-e-lg"  >
            {/* <Link to={`/products/${product.id}`} state={product}> */}

            <div className="w-full overflow-hidden lg:aspect-none group-hover:opacity-75 h-52 rounded-ss-lg rounded-t-lg ">
              <img
                src={product?.thumbnail}
                alt={product?.category}
                title={product?.category}
                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
              />
              <div className="absolute top-0 right-0 transform translate-x-full opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                <div className="flex flex-wrap flex-col gap-y-0.5  p-2 mr-1 mt-1">
                  <button onClick={() => handleAddToCart(product)} className='flex justify-end'>
                    <FaCartShopping className="w-4 h-4 p-0.5 bg-gray-300 hover:bg-gray-500 hover:text-white" />
                  </button>

                  <Link to={"/update_product"} state={product} className='flex justify-end' >
                    <IoCreateSharp className="w-4 h-4 p-0.5 bg-gray-300 hover:bg-gray-500 hover:text-white" />
                  </Link>

                  <FaHeart title="Add to Favourite" className="w-4 h-4 p-0.5 bg-gray-300 hover:bg-gray-500 hover:text-white " />

                  <button onClick={() => handleOnDelete(product.id)} className='flex justify-end w-fit'>
                    <MdDelete className="w-4 h-4 p-0.2 bg-gray-300 hover:bg-gray-500 hover:text-white text-end" />
                  </button>
                  <Link to={`/products/${product.id}`} state={product}>
                    <BiSolidMessageDetail className='w-4 h-4 p-[2px] hover:bg-gray-500 hover:text-white text-end bg-gray-300 ' />
                  </Link>
                </div>
              </div>
            </div>
            <div className="px-3 py-2 justify-between">
              <p className="text-sm flex pb-1 justify-center border-b-[0.5px]  border-gray-500 text-gray-500">Brand: {product?.brand}</p>

              <div className=''>
                <h3 className="text-base py-1 text-gray-700 text-center">
                  {product?.title}
                </h3>
              </div>
              <div className='flex justify-center gap-2'>
                <p className="text-xs font-semibold pr-2 border-r-[1px] border-gray-500 items-center flex text-gray-500 line-through">${product?.price}</p>
                <p className="text-lg font-medium pr-2 border-r-[1px] border-gray-500 text-gray-900">${((product?.price) - (product?.price * (product?.discountPercentage / 100))).toFixed(2)}</p>
                <p className="text-base font-medium flex items-center text-zinc-700">({(product?.discountPercentage).toFixed(1)}% Off)</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div >
  )
}

export default Products