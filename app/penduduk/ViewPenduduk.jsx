import React, { useState } from 'react'
import PendudukModal from './PendudukModal';
import { RiInformationFill } from 'react-icons/ri';

const ViewPenduduk = ({ penduduk }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <RiInformationFill color="#1677ff" size={25} style={{ cursor: "pointer" }} onClick={() => {
        setOpen(true);
      }}
      />
      <PendudukModal open={open} setOpen={setOpen} penduduk={penduduk} />
    </>
  )
}

export default ViewPenduduk