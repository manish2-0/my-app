import React, { useState } from 'react'
import useAuth from '../hooks/useAuth';
import api from './axiosapi';
import { useNavigate } from 'react-router-dom'
import Logout from '../modal/Logout';
import useModal from '../hooks/useModal';
import Loader from "../components/Loader"

const Withdraw = () => {
  const navigate = useNavigate();

  const { modal, setmodal, modalmessage, setmodalmessage } = useModal();

  const [loading, setloading] = useState(false);

  const [inputs, setinputs] = useState({
    "user_id": localStorage.getItem("user_id"),
    "transaction_type": "withdraw",
    "amount": 0
  });


  function handlechange(event) {
    event.preventDefault();
    const name = event.target.name.trim();
    const value = event.target.value.trim();

    setinputs(values => ({ ...values, [name]: parseInt(value) }))
  }

  const handlesubmit = async (event) => {
    event.preventDefault();
    setloading(true);
    // console.log(inputs)

    try {
      await api.post('action', inputs, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => {

        if (response?.data?.status === true) {
          setloading(false);
          setmodal(true);
          setmodalmessage({
            "text1": "Done",
            "text2": "Amount Withdrawn Successfully"
          });
          navigate("/", { replace: true })

        }
        else {
          setloading(false);
          setmodal(true);
          setmodalmessage({
            "text1": "Error Occured",
            "text2": "Insufficient Balance."
          });

        }

      }
      )

    } catch (error) {
      setloading(false);
      setmodal(true);
      setmodalmessage({
        "text1": "Error Occured",
        "text2": "Insufficient Balance."
      });

    }
  }

  return (
    <>
      {
        loading
          ? <Loader />
          : <></>
      }

      {
        modal
          ? <Logout />
          : <></>
      }

      <div className='min-h-screen flex items-center justify-center bg-login p-4 bg-slate-200'>

        <form onSubmit={handlesubmit} className='relative lg:w-[500px] sm:w-[45%] md:w-[40%] h-[425px] border border-slate-200 sm:border-blue-100 shadow-lg backdrop-blur-md bg-white rounded-lg p-3 md:p-4 logintext'>

          <p className='w-full font-semibold text-center text-5xl pb-6 md:p-6 mt-12 sm:mt-6 mb-3 tracking-wider logintext text-fix'>WITHDRAW</p>

          <input
            name="amount"
            onWheelCapture={e => {
              e.target.blur()
            }}
            type="number"
            placeholder="Amount"
            onChange={handlechange}
            className="placeholder-slate-500 p-2 pl-3 font-semibold text-lg sm:text-base sm:mt-1 w-full rounded-lg sm:rounded-full border-2 text-slate-900 border-slate-500 bg-transparent focus:border-blue-800 focus:outline-none focus:ring-0"
            required
          />

          <div className='flex justify-center items-center w-full mt-10'>
            <button type='submit' className="edit-btn text-xl p-3 sm:p-2 w-4/5 rounded-lg sm:rounded-full bg-blue-800 font-semibold text-white hover:bg-blue-800 hover:border-white">SUBMIT</button>
          </div>

        </form>


      </div>

    </>
  )
}


export default Withdraw