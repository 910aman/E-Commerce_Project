import React, {useEffect, useState } from 'react';
import { FaUser, FaEnvelope, FaLock, FaPhoneAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getRegisterDetailswithUser } from '../Action/Data';

const RegisterPage = () => {

  const [registerData, setregisterData] = useState();
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const registeredUser = useSelector((state) => state.AddRegisterwithUserReducer?.registerWithUser);
 
  const stringLoginData = localStorage.getItem('sessionToken');
  const JSONformatData = JSON.parse(stringLoginData);

  useEffect(() => {
    if (JSONformatData) {
      navigate("/")
    }
  }, [])


  const MessagePass = () => {
    <div >
      {setMessage("🗹 Data Passed")}
      {setTimeout(() => {
        navigate({
          pathname: "/login",
          state: { registerData: registerData }
        })
        localStorage.setItem('userInfo', JSON.stringify(registerData));
      },2000)}
    </div>
  }

  function validateForm() {

    if (registerData?.name == "" || registerData?.email == "" || registerData?.phoneNumber == "") {
      return setMessage("☒ Please Fill up all the fields")
    }

    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(registerData?.email)) {
      return setMessage("☒ Enter proper format of email")
    }

    // else if (registerData?.password.length < 8) {
    //   return setMessage(
    //     '☒ Invalid Form, Password must contain greater than or equal to 8 characters.',
    //   )
    // }
    else if (registerData?.name == "" || registerData?.email == "") {
      return setMessage("☒ Fill Password Field")
    }
    // else if (registerData?.password !== registerData?.confirmPassword) {
    //   return setMessage(" ☒ Enter same password in both fields")
    // }
    // else if(registerData?.email == "admin123@gmail.com" || registerData?.password == "Admin@1234"){
    //   return setMessage("☒ Enter valid email and password")
    // }

    else {
      MessagePass()
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setregisterData({ ...registerData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getRegisterDetailswithUser(registerData))
    // console.log("register page", registerData,"Register data with API",registeredUser);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 ">
            <label htmlFor="name" className="block text-gray-700">Name</label>
            <div className="relative">
              <input
                type="text"
                id="username"
                name="username"
                placeholder='Username'
                value={registerData?.username}
                onChange={handleChange}
                className="px-8 border-2 w-full bg-gray-200 appearance-none border-gray-200 rounded py-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                required
              />
              <FaUser className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                placeholder='Email ID'
                value={registerData?.email}
                onChange={handleChange}
                className="px-8 border-2 w-full bg-gray-200 appearance-none border-gray-200 rounded py-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                required
              />
              <FaEnvelope className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block text-gray-700">Phone Number</label>
            <div className="relative">
              <input
                type="tel" pattern=".{10,10}"
                id="phone"
                name="phone"
                placeholder='Mobile Number'
                value={registerData?.phone}
                onChange={handleChange}
                className="px-8 border-2 w-full bg-gray-200 appearance-none border-gray-200 rounded py-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                required
              />
              <FaPhoneAlt className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <div className="relative">
              <input
                type="password"
                id="password"
                name="password"
                placeholder='Password'
                value={registerData?.password}
                onChange={handleChange}
                className="px-8 border-2 w-full bg-gray-200 appearance-none border-gray-200 rounded py-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                required
              />
              <FaLock className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-gray-700">Confirm Password</label>
            <div className="relative">
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder='Confirm Password'
                value={registerData?.confirmPassword}
                onChange={handleChange}
                className="px-8 border-2 w-full bg-gray-200 appearance-none border-gray-200 rounded py-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                required
              />
              <FaLock className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
            </div>
          </div>

          <span className={message == "🗹 Data Passed" ? 'text-green-500 py-2' : 'text-red-500 py-2'} >{message}</span>
          {/* onClick={() => navigate("/login")} */}
          <button type="submit" onClick={validateForm}  className="w-full mt-2 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300">Register</button>
        </form>
        <div className=''>
            <Link className='text-xs text-blue-600 hover:underline focus:underline ' to="/login">
              Already have account?
            </Link>
          </div>
        {message == "🗹 Data Passed" &&
          <div className='font-medium text-xl py-4 px-2 duration-200'>
            <div>Name: {registerData?.name}</div>
            <div>Email: {registerData?.email}</div>
            <div>Phone Number: {registerData?.phoneNumber}</div>
            <div>Pwd: {registerData?.password}</div>
          </div>
        }
      </div>
    </div>
  );
};

export default RegisterPage;