import React from 'react'
import Navbar from './Navbar'
import UserHomepage from './UserHomepage'
import BankHomepage from './BankHomepage'

const Homepage = () => {
    return (
        <div className='relative'>
            <Navbar />
            <div className='pt-16 flex flex-col items-center justify-center'>
                {
                    localStorage.getItem("category") === "customer"
                        ? <UserHomepage />
                        : <BankHomepage />
                }
            </div>
        </div>
    )
}

export default Homepage