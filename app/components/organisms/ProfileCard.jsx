import { authOptions } from '@/app/lib/auth';
import { Image } from 'antd';
import { getServerSession } from 'next-auth';
import React from 'react'

const ProfileCard = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className='card-user'>
      <Image src={session?.user?.image} className='rounded-full' alt='avatar' width={150} />
      <div className='text-start  mt-8 border-t-2 pt-8'>
        <p className='text-[#999] font-medium'>Name</p>
        <h2 className='my-3 font-semibold'>{session?.user?.name}</h2>
        <p className='text-[#999] font-medium'>Username</p>
        <h2 className='my-3 font-semibold'>{session?.user?.username}</h2>
        <p className='text-[#999] font-medium'>Email</p>
        <h2 className='my-3 font-semibold'>{session?.user?.email}</h2>
        <p className='text-[#999] font-medium'>Status</p>
        <h2 className='my-3 font-semibold'>{session?.user?.status}</h2>
      </div>
    </div>
  )
}

export default ProfileCard