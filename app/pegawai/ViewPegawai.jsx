import React, { useState } from 'react'
import PegawaiModal from './PegawaiModal';
import { RiInformationFill } from 'react-icons/ri';

const ViewPegawai = ({pegawai}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <RiInformationFill color="#1677ff" size={25} style={{ cursor: "pointer" }} onClick={() => {
        setOpen(true);
      }}
      />
      <PegawaiModal open={open} setOpen={setOpen} pegawai={pegawai}/>
    </>
  )
}

export default ViewPegawai