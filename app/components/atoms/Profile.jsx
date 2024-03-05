'use client';
import { DownOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Space } from "antd";
import { signOut, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Button from "./Button";
import { MdLogout } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import Link from "next/link";

const Profile = () => {
  const { data: session } = useSession();
  const [user, setUser] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      if (session) {
        try {
          const response = await fetch(`/api/user/${session.user.id}`);
          const data = await response.json();
          setUser(data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUser();

  }, [session]);

  const items = [
    {
      key: "1",
      label: (
        <div className="flex gap-4 justify-center items-center border-b-2 border-gray-300">
          <Avatar
            size={75}
            src={user?.foto}
            style={{
              margin: "8px 0"
            }}
          />
          <div className="text-start">
            <p className="font-semibold text-lg">{user?.name}</p>
            <p className="font-semibold text-blue-600">{user?.email}</p>
          </div>
        </div>
      ),
      align: "center"
    },
    {
      key: "2",
      label: (
        <Link href={"/user/profile"}>
          <Button
            name="Profile"
            className="bg-primary w-full text-start tracking-wider"
            icon={CgProfile}
            iconStyle="20px"
          />
        </Link>
      ),
    },
    {
      key: "3",
      label: (
        <Button
          onClick={() =>
            signOut({
              redirect: true,
              callbackUrl: `${window.location.origin}/login`,
            })
          }
          name="Logout"
          className="bg-red-500 w-full"
          icon={MdLogout}
          iconStyle="20px"
        />
      ),
    },
  ];
  return (
    <div className={`flex items-center gap-2 cursor-pointer text-[#F9F9F9] text-sm sm:text-base`}>
      {user.foto ? (<Avatar size={40} src={user?.foto} />) : (<Avatar size={40} icon={<UserOutlined />} />)}

      <Dropdown
        menu={{
          items,
        }}
        placement="bottomRight"
        className="flex justify-center"
        arrow
      >
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            {user?.name && `Hai, ${user?.name}`}
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    </div>
  );
};

export default Profile;
