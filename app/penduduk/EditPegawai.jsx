'use client';
import React, { useState } from 'react';
import ModalEditPegawai from './ModalEditPegawai';
import { FiEdit } from 'react-icons/fi';

const EditPegawai = ({pegawai, jabatan}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <FiEdit color="#FFC107" size={25} style={{ cursor: "pointer" }} onClick={() => setOpen(true)}/>

      <ModalEditPegawai open={open} setOpen={setOpen} pegawai={pegawai} jabatan={jabatan}/>
    </>
  )
}

export default EditPegawai;