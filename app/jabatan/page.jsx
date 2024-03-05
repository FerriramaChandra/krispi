import React from 'react'
import TitleBar from '../components/atoms/TitleBar'
import JabatanTable from './JabatanTable'
import { db } from '../lib/db'

const getJabatan = async () => {
  const res = await db.jabatan.findMany()
  return res;
}

const getLastJabatan = async () => {
  const res = await db.jabatan.findFirst({
    orderBy: {
      id: "desc"
    }
  })
  return res;
}

const Jabatan = async () => {
  const allJabatan = await getJabatan();
  const lastJabatan = await getLastJabatan();
  return (
    <section id='jabatan'>
      <TitleBar title={"Data Jabatan"}/>
      <JabatanTable allJabatan={allJabatan} lastJabatan={lastJabatan}/>
    </section>
  )
}

export default Jabatan