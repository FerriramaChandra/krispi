import React from 'react'
import { BiCopyright } from 'react-icons/bi'

const Footer = () => {
  return (
    <footer className='bg-[#F9F9F9] h-fit flex justify-start items-center gap-3 p-4 shadow-md shadow-gray-400'>
      <BiCopyright size="20px" />
      <p className='text-[14px] md:text-[16px]'>2024 Dinas DUKCAPIL Kota Palu | All rights Reserved.</p>
    </footer>
  )
}

export default Footer