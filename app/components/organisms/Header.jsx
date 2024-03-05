import React from 'react'
import { BiMenu } from "react-icons/bi";
import DateTime from '../atoms/DateTime';
import Profile from '../atoms/Profile';

const Header =  ({ setSidebarMini }) => {
  return (
    <header className='bg-primary h-16 flex items-center justify-between p-6 text-[#F9F9F9]'>
      <BiMenu size={24} color='#F9F9F9' onClick={ () => setSidebarMini(prev => !prev)} className='cursor-pointer' />
      <div className='flex items-center gap-5'>
        <DateTime />
        <Profile/>
      </div>
    </header>
  )
}

export default Header