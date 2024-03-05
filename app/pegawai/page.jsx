import React, { Suspense } from 'react'
import TitleBar from '../components/atoms/TitleBar'
import PegawaiTable from './PegawaiTable';
import { db } from '../lib/db';
import Loading from './loading';

const getPegawai = async () => {
  const res = await db.pegawai.findMany({
    include: {
      jabatan: {
        select: {
          id: true,
          nama_jabatan: true,
        }
      }
    }
  })
 return res;
}

const getAllJabatan = async () => {
  const res = await db.jabatan.findMany({
    select: {
      id: true,
      kode_jabatan: true,
      nama_jabatan: true,
    }
  });
  return res;
}

const Pegawai = async () => {
  const allPegawai = await getPegawai();
  const allJabatan = await getAllJabatan();

  return (
    <Suspense fallback={<Loading />}>
      <section id='pegawai'>
        <TitleBar title={"Data Pegawai"}/>
        <PegawaiTable 
          allPegawai={allPegawai}
          allJabatan={allJabatan}
        />
      </section>
    </Suspense>
  )
}

export default Pegawai