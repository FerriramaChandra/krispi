import React, { Suspense } from 'react'
import TitleBar from '../components/atoms/TitleBar'
import { db } from '../lib/db'
import UserTable from './UserTable'
import Loading from './loading'

const getUsers = async () => {
  const res = await db.user.findMany({
   select: {
     id: true,
     name: true,
     username: true,
     email: true,
     status: true,
     password: true,
     createdAt: true,
   }
 })
//  await new Promise((resolve) => setTimeout(resolve, 3000));
 return res;
}

const User = async () => {
  const users =  await getUsers();
  return (
    <section id='user'>
      <TitleBar title={"Manajemen Pengguna"}/>
      
      <Suspense fallback={<Loading />}>
        <UserTable users={users}/>
      </Suspense>
    </section>
  )
}

export default User