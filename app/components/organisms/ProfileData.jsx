import React from 'react'
import ProfileTabs from './ProfileTabs'
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';
import { db } from '@/app/lib/db';

const fetchAvatars = async () => {
  const res = await db.avatar.findMany();
  return res;
}

const ProfileData = async () => {
  const listAvatars = await fetchAvatars();

  const session = await getServerSession(authOptions);
  return (
    <div className='data-user'>
      <ProfileTabs session={session} listAvatars={listAvatars}/>
    </div>
  )
}

export default ProfileData