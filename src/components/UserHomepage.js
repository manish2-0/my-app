import React from 'react'
import Navbar from './Navbar'

const UserHomepage = () => {
  return (

    <div className=' sm:container relative w-full p-2 px-3 mx-auto border'>

      <article class="flex flex-col gap-4 rounded-lg border border-gray-100 bg-white p-6">



        <div>
          <strong class="block text-sm font-medium text-gray-500"> Welcome, {localStorage.getItem("name")} </strong>

          <p>
            {
              localStorage.getItem("balance") == 0
                ? <span class="text-2xl font-medium text-gray-900"> ₹0 </span>
                : <span class="text-2xl font-medium text-green-600"> ₹{localStorage.getItem("balance")} </span>

            }


            {/* <span class="text-xs text-gray-500"> from $240.94 </span> */}
          </p>
        </div>
      </article>

    </div>

  )
}

export default UserHomepage