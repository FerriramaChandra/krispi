import TitleBar from '@/app/components/atoms/TitleBar'
import ProfileCard from '@/app/components/organisms/ProfileCard'
import ProfileData from '@/app/components/organisms/ProfileData'
import React from 'react'

const ProfileUser = () => {
  return (
    <section id="profile-user">
      <TitleBar title={"Profil Pengguna"}/>
      <div className='profil-user'>
        <ProfileCard />
        <ProfileData />
      </div>
    </section>
  )
}

export default ProfileUser