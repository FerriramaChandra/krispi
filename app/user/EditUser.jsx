import React, { useState } from 'react'
import { FiEdit } from 'react-icons/fi';
import ModalEditUser from './ModalEditUser';

const EditUser = ({user}) => {
  const [openModalEdit, setOpenModalEdit] = useState(false);
  return (
    <>
      <FiEdit color="#FFC107" size={25} style={{ cursor: "pointer"}} onClick={ () => setOpenModalEdit(true)}/>
      <ModalEditUser open={openModalEdit} setOpen={setOpenModalEdit} user={user}/> 
    </>
  )
}

export default EditUser