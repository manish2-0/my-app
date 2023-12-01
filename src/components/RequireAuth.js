import { useLocation, Navigate, Outlet } from "react-router-dom"
import React, { useState } from 'react'
import useAuth from "../hooks/useAuth";


const RequireAuth = () => {

    // const { auth, setauth } = useState(true);
    // const [try1, settry1] = useState(true);
    const { auth, setauth } = useAuth();
    //  const [auth, setauth] = useState(useAuth());

    // console.log(auth)
    // const location = useLocation();

    return (
        <>

            {
                auth
                    ? <Outlet />
                    : <Navigate to="/login" replace />
            }
        </>
    )
}

export default RequireAuth