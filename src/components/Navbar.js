import React, { useState } from 'react'
import useModal from '../hooks/useModal';
import useAuth from '../hooks/useAuth';
import api from './axiosapi';
import { useNavigate, Link } from "react-router-dom"

const Navbar = () => {

    const { modal, setmodal, modalmessage, setmodalmessage } = useModal();

    const [loading, setloading] = useState(false);

    // const { setauth, setadminname } = useAuth();

    const { auth, setauth, adminname, setadminname } = useAuth();

    // const nav = useNavigate();


    const handlelogout = async (e) => {
        setloading(true);
        e.preventDefault();

        let a = {
            "access_token": auth
        }

        try {
            await api.post('logout', a).then(function (response) {
                localStorage.removeItem("user_id");
                localStorage.removeItem("name");
                localStorage.removeItem("email");
                localStorage.removeItem("category");

                setloading(false)
                setauth("");
                setadminname("");
                setmodal(true);
                setmodalmessage({
                    "text1": "Success",
                    "text2": "Logged out successfully"
                });
                // nav("/login", { replace: true });
            })

        } catch (error) {
            setloading(false)
            setmodal(true);
            setmodalmessage({
                "text1": "Error",
                "text2": "No server response."
            });
        }


    }

    return (
        <div className='z-50' id='navbarprivate'>
            <div className="transition translate-y-0 z-30 bg-fix fixed w-full" id='main'>
                <div className='sm:container relative w-full p-2 px-3 mx-auto bg-fix sm:translate-y-0 bg-cyan-900'>

                    <div className='flex justify-between h-1/2 sm:h-auto'>

                        {/* Navicon */}
                        <div className='flex items-center order-1 w-1/4 lg:ml-2 text-white'>
                            Logo Here
                        </div>

                        {/* Person Logo */}

                        <div className='relative flex items-center justify-end order-3 w-1/4 lg:mr-2'>
                            <button onClick={handlelogout} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Logout
                            </button>

                        </div>


                    </div>


                </div>



            </div >
        </div >



    )
}

export default Navbar