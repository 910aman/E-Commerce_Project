import { Link, useLocation, } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { GrClose } from "react-icons/gr";
import Cart from "./CustomCart";
import { useSelector } from "react-redux";
import { Cookies } from "react-cookie";
import googleIcon from "../assets/google.png";
import { useAuth0 } from "@auth0/auth0-react";

const Header = () => {
  const location = useLocation();
  const [isRegisterPage, setIsRegisterPage] = useState(false);
  const [isLoginPage, setIsLoginPage] = useState(false);

  useEffect(() => {
    setIsRegisterPage(location.pathname === "/register")
    setIsLoginPage(location.pathname === "/login")
  }, [location.pathname])


  const { totalItems } = useSelector(
    (state) => state.cart
  );

  const [showSidebar, setShowSidebar] = useState(false);

  const showRightBar = () => {
    setShowSidebar(true);
  };

  // const { user } = useAuth0()
  // console.log("Data from Login",user);

  const hideRightBar = () => {
    setShowSidebar(false);
  };
  const handleSignOut = () => {
    const cookie = new Cookies();
    cookie.remove("My Session token")
    localStorage.removeItem('sessionToken');
    logout({ logoutParams: { returnTo: window.location.origin } })
  }

  const loginDetails = JSON.parse(localStorage.getItem('loginInfo'));
  const { logout } = useAuth0();



  return (
    <>
      <header className="bg-gray-300">
        {!isRegisterPage && !isLoginPage ? (

          <div className="container mx-auto">
            <nav className=" flex max-w-full gap-3 items-center justify-between py-2 px-4 ">
              <div className="">
                <Link to={"/"} className="flex items-center">
                  <span className="sr-only ">Your Company</span>
                  <img className="h-6 w-auto sm:h-6 lg:h-8" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
                </Link>
              </div>

              <div className="sm:flex flex-1 gap-x-3 hidden sm:visible md:gap-x-6 lg:gap-x-12 justify-center">
                <Link to="/products/category" className="text-xs sm:text-base lg:text-lg flex items-center font-semibold leading-6 text-gray-900 hover:font-bold">
                  Categories
                </Link>
                <Link to="/add_product" className="text-xs sm:text-base lg:text-lg whitespace-nowrap flex items-center font-semibold leading-6 text-gray-900 hover:font-bold">
                  Add New Product
                </Link>
              </div>
              <div className="flex gap-4">
                <div className="flex gap-4 items-center">
                  <ul className="flex flex-wrap p-1  sm:bg-gray-300 sm:rounded-full text-sm md:text-base">
                    <li className="relative group bg-gray-300 rounded-full md:mb-0">
                      <div className="z-50 border-red-300 cursor-pointer border-2 rounded-full font-semibold whitespace-no-wrap text-gray-600 hover:text-blue-800">
                        <img src={loginDetails?.image} alt="Profile Image" title="Profile" className="w-6 h-6 rounded-full border-2 " />
                      </div>
                      <ul className="absolute whitespace-no-wrap w-fit -left-12 top-0 mt-10 p-2 text-center justify-center rounded-lg shadow-lg bg-white z-50 hidden group-hover:block">
                        <svg className="block fill-current text-white w-4 absolute left-11 top-0 ml-3 -mt-3 z-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path></svg>
                        <li className="p-1 whitespace-no-wrap rounded-md flex items-center cursor-pointer gap-3 text-sm md:text-base text-gray-600 hover:text-gray-800 hover:bg-gray-300">
                          <CgProfile />
                          <div> Hi,&nbsp;
                            <span className="">{loginDetails?.username}</span>
                          </div>
                        </li>
                        <Link to="/login" onClick={handleSignOut} className="p-1 font-semibold whitespace-no-wrap rounded-md flex items-center gap-3 text-sm md:text-base text-gray-600 hover:text-gray-800 hover:bg-gray-300">
                          <img src={googleIcon} alt='Google Icon' className='h-[18px] flex items-center' />
                          <p className=' items-center'>Logout</p>
                        </Link>
                      </ul>
                    </li>
                  </ul>
                  <div>
                    <FaHeart
                      className="hover:text-red-600 text-2xl"
                    />
                  </div>

                  <div className="">
                    <span className="absolute text-white ml-4 -mt-1 bg-red-600 rounded-full  px-1 text-xs">
                      {totalItems}
                    </span>
                    <FaShoppingCart
                      className="hover:text-red-500 text-2xl cursor-pointer"
                      onClick={showRightBar}
                    />

                    {showSidebar && (
                      <div className="fixed z-10 top-10 right-0 w-96 overflow-y-auto">
                        <Cart />

                        <span
                          className="absolute top-8 right-7 cursor-pointer text-gray-600"
                          onClick={hideRightBar}
                        >
                          <GrClose />
                        </span>
                      </div>
                    )}

                  </div>
                </div>
              </div>
            </nav>
          </div>
        ) : null}
      </header>
    </>
  )
}
export default Header;
