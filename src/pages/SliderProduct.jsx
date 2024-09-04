/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getSingleProductCategory } from "../Action/Data";
import ReactStars from 'react-rating-star-with-type'
import { addToCart, getCartTotal } from "../reducer/cartSlice";
import { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";

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

    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <MdArrowForwardIos
                className={`${className} block text-gray-700 hover:text-black lg:h-10 sm:h-5 h-2`}
                style={{ ...style, }}
                onClick={onClick}
            />
        );
    }

    function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <MdArrowBackIosNew
                className={`${className} block text-gray-700 hover:text-black lg:h-10 sm:h-5 h-2`}
                style={{ ...style }}
                onClick={onClick}
            />
        );
    }

    // const settings = {
    //     className: "center",
    //     centerMode: true,
    //     centerPadding: "60px",
    //     slidesToShow: 1,
    //     style: { display: "flex" },
    //     nextArrow: <SampleNextArrow />,
    //     prevArrow: <SamplePrevArrow />
    // };
    // const settings_SmallSlider = {
    //     centerPadding: "60px",
    //     infinite: false,
    // };
    
    const settings = {
        className: "center",
        centerMode: true,
        centerPadding: "60px",
        slidesToShow: 1,
        style: { display: "flex" },
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };
    const settings_SmallSlider = {
        centerPadding: "60px",
        infinite: false,
        slidesToShow: 4,
        swipeToSlide: false,
    };


    const [nav1, setNav1] = useState(null);
    const [nav2, setNav2] = useState(null);
    let sliderRef1 = useRef(null);
    let sliderRef2 = useRef(null);

    useEffect(() => {
        setNav1(sliderRef1);
        setNav2(sliderRef2);
    }, []);


    return (

        <div key={singleData?.id} className="relative px-2 py-5 h-fit bg-blue-200  lg:flex md:px-4 lg:px-6">
            <div >
                {/* <SwiperSlider /> */}
                <div className="lg:w-96 sm:w-80 w-64 px-5 ">
                    <Slider
                        asNavFor={nav1} // Change to nav2
                        {...settings}
                        ref={sliderRef2}

                        slidesToShow={1}
                        swipeToSlide={false}
                        focusOnSelect={true}
                    >
                        {singleData.images?.map((image, index) => (
                            <img src={image} alt="Product Image" key={index} className=" ease-in h-full border-2 aspect-square bg-white hover:border-gray-300 " />
                        ))}
                        {/* <img alt={singleData?.category}
                            src={singleData?.thumbnail}
                            className="h-full w-full rounded-md object-cover object-center  lg:h-full lg:w-full" /> */}
                    </Slider>
                </div>
                <div className="lg:w-40 sm:w-32 w-20 px-5 ">
                    <Slider
                        asNavFor={nav2}
                        {...settings_SmallSlider}
                        ref={sliderRef2}
                        slidesToShow={4}
                        swipeToSlide={false}
                        focusOnSelect={true} >
                        {singleData.images?.map((image, index) => (
                            <img src={image} alt="Product Image" key={index} className=" ease-in h-full border-2 aspect-square bg-white hover:border-gray-300 " />
                        ))}
                    </Slider>
                </div>


            </div>


            <div className=" pl-5 w-auto h-fit ">
                <div className=''>
                    <h3 className="text-2xl font-bold text-gray-700">{(singleData?.title)}</h3>
                    {/* <span aria-hidden="true" className="absolute inset-0" /> */}
                    <h2 className=" text-lg text-gray-500 border-b-[2px] pb-1">Brand: {singleData?.brand}</h2>
                    <p className="text-2xl font-semibold text-gray-500 pt-1">{singleData?.description}</p>


                    <div className="p-2 bg-gray-100 rounded-md w-fit my-2" >
                        <div className='flex items-center'>
                            <div className='line-through text-gray-600 text-sm '>
                                {product?.price.toFixed(2)}
                            </div>
                            <span className='fs-14 mx-2 text-black'>
                                Inclusive of all taxes
                            </span>
                        </div>

                        <div className='flex align-center my-1 gap-4'>
                            <div className=' font-semibold font-poppins fs-24 '>
                                {((product?.price) - (product?.price * (product?.discountPercentage / 100))).toFixed(2)}
                            </div>
                            <div className='discount px-2 border rounded-md bg-[#747171] fs-13 text-white fw-6 font-poppins'>
                                {product?.discountPercentage.toFixed(2)}% OFF
                            </div>
                        </div>
                    </div>

                    {/* <div className="flex gap-2 py-2">
                            <div className="pr-2 border-r-[1px] border-gray-500">
                                <p className="font-semibold text-xs">Inclusive of all taxes</p>
                                <h2 className="text-base flex items-center font-semibold text-gray-900  ">${((product?.price) - (product?.price * (product?.discountPercentage / 100))).toFixed(2)}</h2>
                            </div>
                            <div className="items-center gap-4 pr-2 border-r-[1px] border-gray-500">
                                <p className="text-base text-gray-900 line-through h-full flex items-center font-bold "> ${singleData?.price}</p>
                            </div>
                            <div className="h-full py-2">
                                <h3 className=" text-sm h-fit py-2 px-2 rounded-md text-white bg-gray-500 ">{singleData?.discountPercentage}% Off</h3>
                            </div>

                        </div> */}

                    <div className="flex gap-4 py-2">
                        <ReactStars
                            onChange={onChange}
                            value={singleData?.rating}
                            edit={true}
                            activeColors={["red", "orange", "#FFCE00", "#9177FF", "#8568FC",]}
                        />
                        <h2 className="text-lg font-medium w-fit px-4 rounded-md text-white bg-[#747171] "> <span className='font-semibold sm:text-base lg:text-xl'>In Stock: </span>{singleData?.stock}</h2>
                    </div>


                    <div className="flex gap-4 mt-4">

                        <button onClick={() => handleAddToCart(product)} className="cursor-pointer  text-start ">
                            <p className="border-gray-500 border-2 bg-gray-300 hover:bg-gray-800 hover:text-white px-5 py-2 text-xl rounded-md font-semibold  ">Add to Cart</p>
                        </button>
                        <button className="cursor-pointer  text-start">
                            <p className="border-gray-500 border-2 bg-gray-600 hover:bg-gray-800 hover:text-white px-5 py-2 text-xl rounded-md font-semibold  ">Buy Now</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Product;