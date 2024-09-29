"use client";
import React from "react";
import { sidebarMenus } from "@/app/constant";
import { Tooltip } from "antd";
import { useRouter } from "next/navigation";

const SidebarList = ({ containerStyle, iconStyle, textStyle, pathName, tooltip }) => {
  const router = useRouter();

  // const handleRoutingSidebar = (link) => {
  //   router.push(link)
  // };

  return (
    <div className="mt-10 flex flex-col gap-4">
      {sidebarMenus?.map((menu, i) => (
        <div key={i}>
          {tooltip ? (
            <Tooltip title={menu.name} placement="right" color='#F15b26'>
              <div onClick={() => router.push(menu.link)} key={menu.name} className={`${containerStyle} ${pathName.includes(menu.link) && "active"} group flex items-center text-sm gap-3.5 font-medium p-3 rounded-md hover:bg-primary hover:text-[#F9F9F9] cursor-pointer`}>
                <div>{React.createElement(menu?.icon, { size: `${iconStyle}`, className: "duration-500" })}</div>
                <h2 className={`whitespace-pre duration-500 ${textStyle}`}>{menu.name}</h2>
              </div>
            </Tooltip>
          ) : (
            <div>
              <div onClick={() => router.push(menu.link)} key={menu.name} className={`${containerStyle} ${pathName.includes(menu.link) && "active"} group flex items-center text-sm gap-3.5 font-medium p-3 rounded-md hover:bg-primary hover:text-[#F9F9F9] cursor-pointer`}>
                <div>{React.createElement(menu?.icon, { size: `${iconStyle}`, className: "duration-500" })}</div>
                {/* {menu?.icon} */}
                <h2 className={`whitespace-pre duration-500 ${textStyle}`}>{menu.name}</h2>
              </div>
            </div>
          )}
        </div>
      ))}
      {/* <Button type='primary' size='middle' style={{display: "flex"}}>Logout</Button> */}
    </div>
  );
};

export default SidebarList;
