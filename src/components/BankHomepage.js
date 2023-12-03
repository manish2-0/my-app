import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { Routes, Route, Outlet } from "react-router-dom"
import { Link, useLocation } from "react-router-dom"
import useModal from '../hooks/useModal'
import api from "./axiosapi"
import Logout from '../modal/Logout';
import Loader from './Loader';
import moment from 'moment/moment'

const BankHomepage = () => {
  const { modal, setmodal, modalmessage, setmodalmessage } = useModal();
  const [loading, setloading] = useState(false);

  const [balance, setbalance] = useState(0);
  const [data, setdata] = useState([]);

  const getcustomers = async () => {
    setloading(true);
    try {
      await api.get(`customers`).then(async function (response) {
        let a = response.data;
        if (a?.data) {
          setdata(a.data);
          setloading(false);
        }
        else {
          setdata([])
          setloading(false);
          setmodal(true);
          setmodalmessage({
            "text1": "Error Occured",
            "text2": "Something went wrong."
          });
        }
      });

    } catch (error) {
      setdata([]);
      setloading(false);
      setmodal(true);
      await setmodalmessage({
        "text1": "Error Occured",
        "text2": "No server response."
      });
    }


  }


  useEffect(() => {
    getcustomers();
  }, []);


  return (
    <>

      {
        modal
          ? <><Logout /></>
          : <></>
      }

      {
        loading
          ? <Loader />
          : <></>
      }


      <div className=' sm:container relative w-full p-2 px-3 mx-auto'>

        <article class="flex flex-col rounded-lg border border-gray-100 bg-white">

          <div>
            <strong class="block text-xl font-medium text-gray-500 p-2"> Welcome, {localStorage.getItem("name")} </strong>


          </div>



        </article>

      </div>

      <div className='sm:container relative w-full p-3'>
        <p className='text-xl text-blue-800'>All Customers:</p>

        <div className="overflow-x-auto">

          <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm rounded-md">
            <thead className="ltr:text-left rtl:text-right">
              <tr>

                <th className="w-fit whitespace-nowrap px-2 py-2 font-medium text-base md:text-lg text-sky-700">
                  Name
                </th>
                <th className="w-fit whitespace-nowrap px-2 py-2 font-medium text-base md:text-lg text-sky-700">
                  Email
                </th>
                <th className="whitespace-nowrap px-6 py-2 font-medium text-base md:text-lg text-sky-700">
                  Balance
                </th>
                <th className="whitespace-nowrap px-6 py-2 font-medium text-base md:text-lg text-sky-700">
                  View
                </th>


              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {
                data.length == 0
                  ? <tr >
                    <td colSpan={4} className="text-center w-1/3 whitespace-nowrap px-4 py-2 text-gray-700">No data found.</td>

                  </tr>
                  : data.map((ele, index) =>
                    <tr>
                      <td className="text-center whitespace-nowrap px-2 py-2 text-gray-700">{ele.name}</td>
                      <td className="text-center whitespace-nowrap px-2 py-2 text-gray-700">{ele.email}</td>
                      <td className="text-center whitespace-nowrap px-2 py-2 text-gray-700">₹{ele.balance}</td>
                      <td className="text-center whitespace-nowrap px-2 py-2 text-blue-700 cursor-pointer">
                        <Link state={{ values: ele }} to="viewcustomer" >View</Link>
                      </td>

                    </tr>
                  )
              }




            </tbody>
          </table>
        </div>
        <div>

        </div>
      </div>



    </>

  )
}

export default BankHomepage