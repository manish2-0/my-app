import React from 'react'
import BankLogin from './BankLogin'
import UserLogin from './UserLogin'

import { Routes, Route, Outlet } from "react-router-dom"
import { Link, useLocation } from "react-router-dom"

const Login = () => {
  return (
    <div className='relative'>
      {/* <div class="fixed top-0 right-1/2 translate-x-1/2 inline-flex sm:flex-row  shadow-sm rounded-md mt-2 z-10" role="group">
        <Link to="banklogin" className="border logintext whitespace-nowrap px-10  text-center sm:w-1/2 sm:rounded-l-lg sm:border border-gray-200 bg-white text-base font-semibold  py-2 text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700">
          Bank Login
        </Link>

        <Link to="userlogin" className="border logintext whitespace-nowrap text-center sm:w-1/2 sm:rounded-r-lg sm:border border-gray-200 bg-white text-base font-semibold px-10 py-2 text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700">
          User Login
        </Link>

      </div> */}


      {/* <BankLogin /> */}
      <Outlet />

    </div>

  )
}

export default Login
