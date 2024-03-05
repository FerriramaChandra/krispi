import React from 'react';
import TitleBar from '../components/atoms/TitleBar'
import { db } from '../lib/db'
import TabelKehadiran from './TabelKehadiran'

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

const Kehadiran = async () => {
  const allKehadiran = await getKehadiran();
  const allPegawai = await getPegawai();
  return (
    <section id='kehadiran'>
      <TitleBar title={"Data Kehadiran"}/>
      <TabelKehadiran allKehadiran={allKehadiran} allPegawai={allPegawai}/>
    </section>
  )
}

export default Kehadiran