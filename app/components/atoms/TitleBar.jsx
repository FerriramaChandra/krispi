import React from 'react'

const TitleBar = ({ title}) => {
  return (
    <div className="bg-[#F9F9F9] rounded-lg shadow-md h-16 flex items-center p-6 font-semibold text-lg">{title}</div>
  )
}

export default TitleBar