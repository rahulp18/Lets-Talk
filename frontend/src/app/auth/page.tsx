 
import UserForm from '@/components/UserForm'
import React from 'react'

const Auth = async() => {

  return (
    <div className='h-screen flex justify-center items-center bg-slate-100' >
        <div className="bg-white p-10 rounded-md drop-shadow-sm flex flex-col items-center gap-9 ">
          <h1 className="text-2xl font-semibold text-gray-700">Welcome to MeetUp</h1>
         <UserForm />
        </div>
       
    </div>
  )
}

export default Auth