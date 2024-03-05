import React from 'react'
import NavbarPresensi from '../components/organisms/NavbarPresensi'
import CameraPresensi from '../components/atoms/CameraPresensi'
import { db } from '../lib/db'
import TabelKehadiran from '../kehadiran/TabelKehadiran'
import TabelKehadiranPegawai from './TabelKehadiranPegawai'

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
};

const Absensi = async () => {
  const pegawai = await getPegawai()
  const kehadiran = await getKehadiran()

  return (
    <section id='absensi'>
      <NavbarPresensi />
      <div className='py-10 px-8 bg-white rounded-lg shadow-md shadow-gray-300'>
        <div className='max-w-[500px] m-auto p-8'>
          <CameraPresensi allPegawai={pegawai} allKehadiran={kehadiran} />
        </div>
        <TabelKehadiranPegawai allPegawai={pegawai} allKehadiran={kehadiran} />
      </div>
    </section>
  )
}

export default Absensi