"use client";
import React from 'react'
import {signIn} from 'next-auth/react'
import {FcGoogle} from 'react-icons/fc'
const GoogleButton = () => {
  return (
    <button className="px-6 py-3 flex gap-2 items-center justify-center rounded-md drop-shadow-sm border border-gray-700 " onClick={()=>signIn('google')} >
       <FcGoogle size={20} /> 
        Login With google</button>
  )
}

export default GoogleButton