import React, { Suspense } from 'react'
import TitleBar from '../components/atoms/TitleBar'
import PendudukTable from './PendudukTable';
import { db } from '../lib/db';
import Loading from './loading';

const getPenduduk = async () => {
  const res = await db.penduduk.findMany()
  return res;
}

const Penduduk = async () => {
  const allPenduduk = await getPenduduk();

  return (
    <Suspense fallback={<Loading />}>
      <section id='pegawai'>
        <TitleBar title={"Data Penduduk"} />
        <PendudukTable
          allPenduduk={allPenduduk}
        />
      </section>
    </Suspense>
  )
}

export default Penduduk