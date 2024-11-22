import React from 'react'
import { Outlet } from 'react-router-dom'
import UserSidebar from '../components/user/UserSidebar'
import UserHeader from '../components/user/UserHeader'

function UserLayout() {
  return (
    <div>
      
      <div className='flex bg-neutral-100 h-screen w-screen overflow-hidden'>
        <UserSidebar/>
        <div className='flex flex-col flex-1'>
          <UserHeader/>
       <div className='flex-1 p-2 min-h-0 overflow-auto'>
        <Outlet/>
       </div>
        </div>
      </div>
    </div>
  )
}

export default UserLayout