import React, { useState } from 'react'
import { FiEdit } from 'react-icons/fi';
import ModalEditKehadiran from './ModalEditKehadiran';

const EditKehadiran = ({kehadiran, allPegawai}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <FiEdit color="#FFC107" size={25} style={{ cursor: "pointer" }} onClick={() => setOpen(true)}/>

      <ModalEditKehadiran open={open} setOpen={setOpen} kehadiran={kehadiran} allPegawai={allPegawai}/>
    </>
  )
}

export default EditKehadiran