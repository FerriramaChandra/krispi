import React from 'react'

const DashboardInfo = ({ title, value, icon }) => {
  return (
    <div className='p-8 bg-[#F9F9F9] flex items-center flex-1 rounded-lg shadow-md shadow-gray-300 min-w-[18rem]'>
      <div className='flex-1'>
        <h2 className='font-semibold'>{title}</h2>
        <span className='text-3xl font-bold text-primary'>{value}</span>
      </div>
      {icon}
    </div>
  )
}

export default DashboardInfo