'use client'
import { ProfileOutlined, SmileOutlined, UserOutlined } from '@ant-design/icons';
import { Tabs } from 'antd'
import React from 'react'
import FormEditProfile from './FormEditProfile';
import ListAvatar from './ListAvatar';
import FormChangePassword from './FormChangePassword';

const ProfileTabs = ({session, listAvatars}) => {
  const onChange = (key) => {
    console.log(key);
  };

  const items = [
    {
      key: '1',
      label: (
        <span>
          <UserOutlined />
          Edit Profil
        </span>
      ),
      children: (
        <FormEditProfile session={session}/>
      )
    },
    {
      key: '2',
      label: (
        <span>
          <SmileOutlined />
          Ubah Avatar
        </span>
      ),
      children: <ListAvatar session={session} listAvatars={listAvatars}/>,
    },
    {
      key: '3',
      label: (
        <span>
          <ProfileOutlined />
          Ganti Password
        </span>
      ),
      children: <FormChangePassword session={session}/>,
    },
  ];
  return (
    <Tabs defaultActiveKey="1" items={items} onChange={onChange} size='large'/>
  )
}

export default ProfileTabs