import React, { useRef } from 'react'
import SidebarList from '../molecules/SidebarList';
import { usePathname } from 'next/navigation';
import { useOutsideClick } from '@/app/hooks/useOutsideClick';
import Logo from '../atoms/Logo';

const Sidebar = ({ sidebarMini, setSidebarMini, isMobile, setIsMobile }) => {
  const pathName = usePathname();
  const boxRef = useRef(null);

  const handleCloseMenu = () => {
    setSidebarMini(false)
  }

  useOutsideClick(boxRef, handleCloseMenu);
  return (
    <>
    <aside id='sidebar' className={`bg-[#F9F9F9] fixed min-h-screen hidden shadow-md shadow-gray-400 transition-all duration-500 ${sidebarMini ? "md:w-20 lg:w-20 xl:w-20 p-2 md:block" : "w-0 lg:w-64 xl:w-72 lg:p-4 md:hidden min-[1100px]:block xl:block"}`}>
      <Logo sidebarMini={sidebarMini} isMobile={isMobile}/>
      <SidebarList containerStyle={sidebarMini && "justify-center"} iconStyle={sidebarMini ? "24" : "22"} textStyle={sidebarMini && "hidden opacity-0 translate-x-28 overflow-hidden"} pathName={pathName} tooltip={sidebarMini && true}/>
    </aside>
    {
      isMobile && (
        <aside ref={boxRef} className={`bg-[#F9F9F9] ${sidebarMini ? "left-0 top-0" : "-left-full top-0"} fixed z-10 transition-all ease-in duration-600 shadow-md shadow-gray-400`}>
          <div className='w-64 p-4 min-h-screen'>
            <Logo sidebarMini={sidebarMini} isMobile={isMobile} />
            <SidebarList iconStyle={"20"} pathName={pathName} tooltip={false}/>
          </div>
        </aside>
      )
    }
    </>
  )
}

export default Sidebar