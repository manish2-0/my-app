import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {

    const navigate = useNavigate();

    useEffect(() => {
        navigate("/", { replace: true })
    }, []);

    return (
        <div>NotFound</div>
    )
}

export default NotFound