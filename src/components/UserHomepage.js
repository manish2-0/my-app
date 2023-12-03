import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { Routes, Route, Outlet } from "react-router-dom"
import { Link, useLocation } from "react-router-dom"
import useModal from '../hooks/useModal'
import api from "./axiosapi"
import Logout from '../modal/Logout';
import Loader from './Loader';
import moment from 'moment/moment'

const UserHomepage = () => {

  const { modal, setmodal, modalmessage, setmodalmessage } = useModal();
  const [loading, setloading] = useState(false);

  const [balance, setbalance] = useState(0);
  const [data, setdata] = useState([]);

  const getbalance = async () => {
    setloading(true);

    try {
      await api.get(`balance/${localStorage.getItem("user_id")}`).then(async function (response) {
        let a = response.data;
        if (a?.data[0]?.balance) {
          setbalance(a.data[0].balance);
          setloading(false);
        }
        else {
          setbalance(0);
          setloading(false);

        }
      });

    } catch (error) {
      setloading(false);
      setmodal(true);
      await setmodalmessage({
        "text1": "Error Occured",
        "text2": "No server response."
      });
    }


  }

  const gettransactions = async () => {
    setloading(true);
    try {
      await api.get(`transactions/${localStorage.getItem("user_id")}`).then(async function (response) {
        let a = response.data;
        if (a?.data) {
          setdata(a.data);
          setloading(false);
        }
        else {
          setdata([])
          setloading(false);

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
    getbalance();
    gettransactions();
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

        <article class="flex flex-col gap-4 rounded-lg border border-gray-100 bg-white p-6">

          <div>
            <strong class="block text-lg font-medium text-gray-500"> Welcome, {localStorage.getItem("name")} </strong>

            <p>
              {
                balance == 0
                  ? <span class="text-2xl font-medium text-gray-900"> ₹0 </span>
                  : <span class="text-2xl font-medium text-green-600"> ₹{balance} </span>

              }

            </p>
          </div>

          <div className='flex items-center justify-start flex-wrap'>

            <Link
              class="m-2 inline-block rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
              to="withdraw"
            >
              Withdraw
            </Link>

            <Link
              class="m-2 inline-block rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
              to="deposit"
            >
              Deposit
            </Link>

          </div>

        </article>

      </div>

      <div className='sm:container relative w-full p-3'>
        <p className='text-xl text-blue-800'>All Transactions:</p>

        <div className="overflow-x-auto">

          <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm rounded-md">
            <thead className="ltr:text-left rtl:text-right">
              <tr>

                <th className="w-fit whitespace-nowrap px-2 py-2 font-medium text-base md:text-lg text-sky-700">
                  Date
                </th>
                <th className="w-fit whitespace-nowrap px-2 py-2 font-medium text-base md:text-lg text-sky-700">
                  Type
                </th>
                <th className="whitespace-nowrap px-6 py-2 font-medium text-base md:text-lg text-sky-700">
                  Amount
                </th>
                <th className="whitespace-nowrap px-6 py-2 font-medium text-base md:text-lg text-sky-700">
                  Balance
                </th>

              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {
                data.length == 0
                  ? <tr >
                    <td colSpan={4} className="text-center w-1/3 whitespace-nowrap px-4 py-2 text-gray-700">No data found.</td>

                  </tr>
                  : data.toReversed().map((ele, index) =>
                    <tr>
                      <td className="text-center whitespace-nowrap px-2 py-2 text-gray-700">{moment(ele.date).format("DD/MM/YYYY")}</td>
                      {
                        ele.transaction_type === "deposit"
                          ? <>
                            <td className="text-center whitespace-nowrap px-2 py-2 text-green-600">Deposit</td>
                            <td className="text-center whitespace-nowrap px-4 py-2 font-semibold text-green-600">₹{ele.amount}</td>
                            <td className="text-center whitespace-nowrap px-4 py-2 font-semibold text-slate-800">₹{ele.balance}</td>

                          </>

                          : <>
                            <td className="text-center whitespace-nowrap px-2 py-2 text-red-600">Withdraw</td>
                            <td className="text-center whitespace-nowrap px-4 py-2 font-semibold text-red-600">₹{ele.amount}</td>
                            <td className="text-center whitespace-nowrap px-4 py-2 font-semibold text-slate-800">₹{ele.balance}</td>

                          </>
                      }
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

export default UserHomepage