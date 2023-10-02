"use client";
import React,{useEffect, useState} from 'react'
import { useSession } from 'next-auth/react';
import {useRouter} from 'next/navigation'



interface ProtectedProps{
    children:React.ReactNode
}

const ProtectedPage:React.FC<ProtectedProps> = ({children}) => {
    const {data:session,status}=useSession();
    const router=useRouter();
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
      if(status==='loading'){
        return ;
       }
       setLoading(false);
       if(!session?.user?.username){
        router.push('/auth');
     }
    },[session,status]);
 
 if (loading){
  return <h1>Loading...</h1>
 }
  return (
    <>
        {children}
    </>
  )
}

export default ProtectedPage