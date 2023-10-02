"use client";
import React from 'react'
import { SessionProvider } from 'next-auth/react'
import { ApolloWrapper } from '@/lib/apollo-wraper';
const Provider = ({children}:{children:React.ReactNode}) => {
  return (
    <SessionProvider>
    <ApolloWrapper>
    {children}
    </ApolloWrapper>
  </SessionProvider>
  )
}

export default Provider