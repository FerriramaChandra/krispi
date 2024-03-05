import React, { useState } from 'react'
import { FiEdit } from 'react-icons/fi'
import ModalEditJabatan from './ModalEditJabatan'

const EditJabatan = ({jabatan}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <FiEdit color="#FFC107" size={25} style={{ cursor: "pointer" }} onClick={() => setOpen(true)}/>
      <ModalEditJabatan open={open} setOpen={setOpen} jabatan={jabatan}/>
    </>
  )
}

export default EditJabatan