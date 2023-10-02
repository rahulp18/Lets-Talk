 
import ProtectedPage from '@/components/ProtectedPage'
import React from 'react'
 
const HomePage = () => {
 
  return (
    <ProtectedPage>
      <div className="">
        <h1 className="">Hello I am The chat page</h1>
      </div>
    </ProtectedPage>
  )
}

export default HomePage