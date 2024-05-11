import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getSingleProductCategory } from "../Action/Data";
import ReactStars from 'react-rating-star-with-type'
import { addToCart, getCartTotal } from "../reducer/cartSlice";

// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

// const NextArrow = (props) => (
//   <div {...props} className="slick-arrow next-arrow">
//     <IoIosArrowForward />
//   </div>
// );

// const PrevArrow = (props) => (
//   <div {...props} className="slick-arrow prev-arrow">
//     <IoIosArrowBack />
//   </div>
// );
const Product = ({ product }) => {

    const singleData = useSelector((state) => state.GetSingleProductReducer?.getSingleProductCategory)
    const dispatch = useDispatch();

    const location = useLocation();
    product = location.state;

    useEffect(() => {
        // if (singleData?.id === product?.id) {
        dispatch(getSingleProductCategory(product?.id))

    }, [product?.id])

    const [setStar] = useState(5);
    const onChange = (nextValue) => {
        setStar(nextValue)
    }
    const stringLoginData = localStorage.getItem('sessionToken');
    const JSONformatData = JSON.parse(stringLoginData);

    const navigate = useNavigate();

    useEffect(() => {
        if (!JSONformatData) {
            navigate("/login")
        }
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

    //Images of product
    const imagesOnSinglePage = singleData.images;

    return (

        <div key={singleData?.id} className="group relative px-4  py-5  bg-gray-100 ">
            <div className="flex">
                <div>
                    <div className="aspect-video group-hover:opacity-75 h-[300px]">
                        <img alt={singleData?.category}
                            src={singleData?.thumbnail}
                            className="h-full w-full rounded-md object-cover object-center  lg:h-full lg:w-full" />
                    </div>
                    <div className=" flex h-20 mt-2 gap-4 ">
                        {imagesOnSinglePage?.map((image, index) => (
                            <div key={index} className="ease-in border-2  aspect-square  hover:border-red-600">
                                <img src={image} alt="Product Image" className=" ease-in h-full  hover:scale-95  " />
                            </div>
                        ))}
                    </div>
                </div>

               
                <div className=" pl-5 w-auto h-[300px]">
                    <div className=''>
                        <h3 className="text-2xl font-bold text-gray-700">{singleData?.title}</h3>
                        {/* <span aria-hidden="true" className="absolute inset-0" /> */}
                        <h2 className=" text-lg text-gray-500 border-b-[2px] pb-1">Brand: {singleData?.brand}</h2>
                        <p className="text-2xl font-semibold text-gray-500 pt-1">{singleData?.description}</p>

                        <div className="flex gap-2 py-2">
                            <h2 className="text-lg flex items-center font-semibold text-gray-900 pr-2 border-r-[1px] border-gray-500 ">${((product?.price) - (product?.price * (product?.discountPercentage / 100))).toFixed(2)}</h2>
                            <h3 className=" text-sm flex items-center px-2 rounded-md text-white bg-gray-500 ">{singleData?.discountPercentage}% Off</h3>
                            <div className="items-center gap-4 pl-2 border-l-[1px] border-gray-500">
                                <p className="font-semibold text-sm">Inclusive of all taxes</p>
                                <p className="text-xs text-gray-900 line-through w-full font-bold"> ${singleData?.price}</p>
                            </div>

                        </div>

                        <div className="flex gap-4 py-2">
                            <ReactStars
                                onChange={onChange}
                                value={singleData?.rating}
                                edit={true}
                                activeColors={["red", "orange", "#FFCE00", "#9177FF", "#8568FC",]}
                            />
                            <h2 className="text-lg font-medium w-fit px-4 rounded-md text-white bg-gray-500 "> <span className='font-semibold sm:text-base lg:text-xl'>In Stock: </span>{singleData?.stock}</h2>
                        </div>
                    </div>

                    <div className="flex gap-4 mt-4">

                        <button onClick={() => handleAddToCart(product)} className="cursor-pointer  text-start ">
                            <button className="border-gray-500 border-2 bg-gray-300 hover:bg-gray-800 hover:text-white px-5 py-2 text-xl rounded-md font-semibold  ">Add to Cart</button>
                        </button>
                        <button className="cursor-pointer  text-start">
                            <button className="border-gray-500 border-2 bg-gray-600 hover:bg-gray-800 hover:text-white px-5 py-2 text-xl rounded-md font-semibold  ">Buy Now</button>
                        </button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Product