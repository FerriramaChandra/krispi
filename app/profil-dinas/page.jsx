import React, { Suspense } from 'react'
import TitleBar from '../components/atoms/TitleBar'
import FormDataDinas from '../components/organisms/FormDataDinas';
import LogoDinas from '../components/molecules/LogoDinas';
import { db } from '../lib/db';
import Loading from './loading';

const getProfile = async () => {
  const res = await db.profile.findMany()
 return res;
}

const ProfilDinas = async () => {
  const profile = await getProfile();

  return (
    <section id='profil-dinas'>
      <TitleBar title={"Profil Dinas"}/>
      <Suspense fallback={<Loading />}>
        <div className='profil-dinas'>
          <div className="data-dinas">
            <h1 className='section-title'>Data Dinas</h1>
            <FormDataDinas profile={profile[0]}/>
          </div>
        <LogoDinas profile={profile[0]}/>
        </div> 
      </Suspense>
    </section>  
  )
}

export default ProfilDinas