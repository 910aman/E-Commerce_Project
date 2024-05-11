/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react'
import { FaEnvelope, FaLock, } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getLoginDetailswithUser } from '../Action/Data';
import { Cookies } from 'react-cookie';


const Login = () => {
  const [loginData, setLoginData] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [expiresInMins] = useState(30);
  const loginedUser = useSelector((state) => state.GetLoginwithUserReducer.loginWithUser);
  const cookie = new Cookies();
  //Registeration Data on Login Page
  const loginDetails = JSON.parse(localStorage.getItem('loginInfo'));
  // console.log("Login Details on login Page", loginDetails);

  const stringLoginData = localStorage.getItem('sessionToken');
  const JSONformatData = JSON.parse(stringLoginData);

  useEffect(() => {
    if (JSONformatData) {
      navigate("/")
    }
  }, [])


  function ValidateLogin() {
    if (loginData?.username == null || loginData?.password == null) {
      return setMessage("☒ Fill all Fields")
    }
    else if (loginDetails?.token === null) {
      return setMessage("Please check our Token")
    }
    // if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(loginData?.username)) {
    //   return setMessage("☒ Enter proper format of username")
    // }
    // else if (loginData?.password.length < 8) {
    //   return (setMessage('☒ Invalid Form, Password must contain greater than or equal to 8 characters.'))
    // }
    //  else if(loginData?.username == "admin123@gmail.com" || loginData?.password == "Admin@1234"){
    //   return setMessage("☒ Enter valid username and password")
    // }
    else { MessagePass() }
    
  }


  const MessagePass = () => {
    <div >
      {setMessage("🗹 Data Passed")}
      {setTimeout(() => {
        navigate({
          pathname: "/",
          state: { loginData: loginData }
        })
        // localStorage.setItem('loginInfo', JSON.stringify(loginedUser));
      }, 2000)}
    </div>
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getLoginDetailswithUser(loginData));
    // console.log("Login Data", loginData, "Login API from user", loginData);
  };



  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit} >
          <input type="text" name="expiresInMins" id="expiresInMins" value={loginData?.expiresInMins} className='hidden' />
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700">Username</label>
            <div className="relative">
              <input
                type="username"
                id="username"
                name="username"
                value={loginData?.username}
                onChange={handleChange}
                className="px-8 border-2 w-full bg-gray-200 appearance-none border-gray-200 rounded py-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                autoComplete='username'
                required
              />
              <FaEnvelope className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <div className="relative">
              <input
                type="password"
                id="password"
                name="password"
                value={loginData?.password}
                onChange={handleChange}
                className="px-8 border-2 w-full bg-gray-200 appearance-none border-gray-200 rounded py-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                autoComplete='current-password'
                required
              />
              <FaLock className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
            </div>
          </div>
          <div>
            {/* <span>{message}</span> */}
            <span className={message == "🗹 Data Passed" ? 'text-green-500 py-2' : 'text-red-500 py-2'} >{message}</span>
            <button type="submit" onClick={ValidateLogin} className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300">Login</button>
          </div>
          <div className=''>
            <Link className='text-xs text-blue-600 hover:underline focus:underline ' to="/register">
              Do you have account?
            </Link>
          </div>
        </form>
        {message == "🗹 Data Passed" &&
          <div className='font-medium text-xl py-4 px-2 overflow-hidden duration-200'>
            <div>Username: {loginData?.username}</div>
            <div>Pwd: {loginData?.password}</div>
            <div>Token: {loginDetails?.token}</div>
          </div>
        }
      </div>
    </div>
  )
}

export default Login