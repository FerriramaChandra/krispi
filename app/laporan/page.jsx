import React, { Suspense } from 'react'
import TitleBar from '../components/atoms/TitleBar'
import Loading from './loading';
import FormLaporan from './FormLaporan';
import { db } from '../lib/db';

const getPegawai = async () => {
  const res = await db.pegawai.findMany({
    select: {
        id: true, 
        nama: true,
        jabatan: {
          select: {
            nama_jabatan: true,
          }
        }
      }
  });
  return res;
}

const getKehadiran = async () => {
  const res = await db.presensi.findMany({
    include: {
      pegawai: {
        select: {
          id: true,
          nama: true,
          jabatan: {
            select: {
              nama_jabatan: true,
            }
          }
        }
      }
    }
  });

  return res;
}

const Laporan = async () => {
  const allPegawai = await getPegawai();
  const allKehadiran = await getKehadiran();

  return (
    <section id='laporan'>
      <TitleBar title={"Rekap Absensi"}/>
      <Suspense fallback={<Loading />}>
        <div className="laporan">
          <h1 className='section-title'>Cetak Laporan Kehadiran</h1>
          <FormLaporan allPegawai={allPegawai} allKehadiran={allKehadiran}/>
        </div>
      </Suspense>
    </section>
  )
}

export default Laporan