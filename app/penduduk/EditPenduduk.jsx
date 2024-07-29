'use client';
import React, { useState } from 'react';
import ModalEditPenduduk from './ModalEditPenduduk';
import { FiEdit } from 'react-icons/fi';

const EditPenduduk = ({ penduduk }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <FiEdit color="#FFC107" size={25} style={{ cursor: "pointer" }} onClick={() => setOpen(true)} />

      <ModalEditPenduduk open={open} setOpen={setOpen} penduduk={penduduk} />
    </>
  )
}

export default EditPenduduk;