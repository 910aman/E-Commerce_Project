import { Link, useLocation, } from "react-router-dom";
import Icons from './Icons'
import { useEffect, useState } from "react";


const Header = () => {
  const location = useLocation();
  const [isRegisterPage, setIsRegisterPage] = useState(false);
  const [isLoginPage, setIsLoginPage] = useState(false);

  useEffect(() => {
    setIsRegisterPage(location.pathname === "/register")
    setIsLoginPage(location.pathname === "/login")
  }, [location.pathname])


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
              <Icons />
            </div>

          </nav>
        </div>
      ) : null}
      </header>
    </>
  )
}
export default Header;
