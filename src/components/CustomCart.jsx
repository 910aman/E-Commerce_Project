import { useDispatch, useSelector } from "react-redux";
// import "./../main.css";
import { useEffect, } from "react";
import { getCartTotal, removeItem, updateQuantity } from "../reducer/cartSlice";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { CgClose } from "react-icons/cg";
import { Link } from "react-router-dom";
const CustomCart = () => {


    const dispatch = useDispatch();
    const { data: cartProducts, totalAmount } = useSelector(
        (state) => state.cart
    );

    useEffect(() => {
        dispatch(getCartTotal());
    }, [useSelector((state) => state.cart)]);

    const handleRemoveItem = (itemId) => {
        dispatch(removeItem({ id: itemId }));
    };

    const increaseQty = (cartProductId, currentQty) => {
        const newQty = currentQty + 1;
        dispatch(updateQuantity({ id: cartProductId, quantity: newQty }));
    };

    const decreaseQty = (cartProductId, currentQty) => {
        const newQty = Math.max(currentQty - 1);
        dispatch(updateQuantity({ id: cartProductId, quantity: newQty }));
    };

    // console.log("My products", cartProducts);
    return (
        <div className="mt-3 p-4 bg-slate-100 opacity-100">
            <div className="flex gap-8 items-center pb-4 border-b-2">
                <h1 className="text-xl font-semibold ">Shopping Cart</h1>

                <button className="text-white bg-gray-800 rounded-md font-bold  text-xl uppercase p-2">
                    ${totalAmount.toFixed(2)}
                </button>
            </div>
            <div className="h-screen">
                {cartProducts.length === 0 ? (
                    <>
                        <p className="font-bold text-2xl text-center">Your cart is empty</p>
                        <Link to="/" className="w-full flex justify-center mt-4">
                            <p className="font-bold text-2xl text-center p-3 bg-black text-white w-fit flex justify-center">Go to Home</p>
                        </Link>
                    </>
                ) : (
                    <ul className="  pb-40 h-screen mt-4 overflow-y-auto">
                        {cartProducts.map((item, index) => (
                            <div key={index} className="w-80 flex h-56 p-4 border-b-2 border-gray-200">
                                <div className="overflow-hidden  aspect-square group-hover:opacity-75">
                                    <img className="h-32 w-full" src={item.thumbnail} alt={item.category} />
                                    <p className="font-semibold flex justify-center">{(item.title).slice(0, 20)}...</p>
                                    <p className="text-gray-600 flex justify-center">${((item?.price) - (item?.price * (item?.discountPercentage / 100))).toFixed(2)}</p>
                                </div>
                                {/* <div className="px-2"> */}

                                {/* </div> */}
                                <div className=" h-fit gap-x-2 flex flex-1 flex-col">
                                    <div className="flex items-center py-2 px-4">
                                        <div className="h-fit">
                                            <FaMinus
                                                onClick={() => decreaseQty(item.id, item.quantity)}
                                                className=" rounded-sm bg-gray-200 border cursor-pointer" />
                                        </div>
                                        <span className="ps-2 pe-2 text-xl font-bold">
                                            {item.quantity || 1}
                                        </span>
                                        <div className="h-fit">
                                            <FaPlus
                                                onClick={() => increaseQty(item.id, item.quantity)}
                                                className=" rounded-sm bg-gray-200 border cursor-pointer" />
                                        </div>
                                    </div>
                                    <span className="ps-2 pe-2 py-2 text-xl font-bold">
                                        ${((item?.totalPrice) - (item?.price * (item?.discountPercentage / 100))).toFixed(2)}
                                    </span>
                                    <div className="flex py-1 cursor-pointer justify-center">
                                        <CgClose
                                            className=" text-black justify-center border-2 text-3xl  bg-gray-200 hover:bg-gray-500"
                                            onClick={() => handleRemoveItem(item.id)} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default CustomCart;
{/* <div className="quantity flex items-center p-1">
        <div className="input-group-btn">
            <FaMinus
                onClick={() => decreaseQty(item.id, item.quantity)}
                className="btn btn-sm btn-minus rounded-circle bg-light border"/>
        </div>
        
        <div className="input-group-btn">
            <FaPlus
                onClick={() => increaseQty(item.id, item.quantity)}
                className="btn btn-sm btn-plus rounded-circle bg-light border" />
        </div>
    </div>
    <span className="font-bold  ">${item.totalPrice.toFixed(2)}</span> */}