import React from 'react';
// import Image from 'next/image';

const Logo = ({ sidebarMini, isMobile, color }) => {
  return (
    <header className={`py-2 flex ${sidebarMini ? "justify-center" : "justify-start items-center gap-3"} border-b-2 border-primary`}>
      <img src="/logo.png" width={50} height={45} alt='logo' className={`object-contain ${sidebarMini && "flex justify-center items-center text-center"}`} />
      {!sidebarMini && <h1 className={`font-semibold ${color}`}>Dinas <br /> Kota Palu</h1>}
      {isMobile && <h1 className={`font-semibold ${color}`}>Dinas Kota Palu</h1>}
    </header>
  )
}

export default Logo