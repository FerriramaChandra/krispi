'use client';
import React, { useState } from 'react'
import { Button, Input, Select, Table } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { showEntriesOption } from "../constant/index"
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import ModalAddPegawai from './ModalAddPegawai';
import EditPegawai from './EditPegawai';
import ViewPegawai from './ViewPegawai';

const { Search } = Input;

const PegawaiTable = ({ allPegawai, allJabatan }) => {
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [entryData, setEntryData] = useState("10");

  const router = useRouter();

  const handleChange = (value) => setEntryData(value);;

  const onSearch = (value) => console.log(value);

  const dataSource = allPegawai.map((pegawai, i) => ({
    key: i,
    no: `${i + 1}`,
    id: pegawai.id,
    nama: pegawai.nama,
    nip: pegawai.nip,
    telepon: pegawai.telepon,
    jenis_kelamin: pegawai.jenis_kelamin,
    jabatan: pegawai.jabatan.nama_jabatan,
    jabatanId: pegawai.jabatan.id,
    pangkat: pegawai.pangkat,
    tanggal_lahir: pegawai.tanggal_lahir,
    tempat_lahir: pegawai.tempat_lahir,
    alamat: pegawai.alamat,
  }))

  const columnsDataPegawai = [
    {
      title: "No",
      dataIndex: "no",
      fixed: "left",
      key: "no",
    },
    {
      title: "Nama",
      dataIndex: "nama",
      fixed: "left",
      key: "nama",
    },
    {
      title: "Nomor Induk Pegawai",
      dataIndex: "nip",
      width: 250,
      key: "nip",
    },
    {
      title: "Jabatan",
      dataIndex: "jabatan",
      key: "jabatan",
    },
    {
      title: "Pangkat",
      dataIndex: "pangkat",
      key: "pangkat",
      responsive: ["lg"],
    },
    {
      title: "L/P",
      dataIndex: "jenis_kelamin",
      key: "jenis_kelamin",
    },
    {
      title: "Telepon",
      dataIndex: "telepon",
      key: "telepon",
      responsive: ["md"],
    },
    {
      title: "Aksi",
      fixed: "right",
      dataIndex: "aksi",
      key: "aksi",
      width: 100,
      render: (_ , record) => (
        <div className="flex justify-center items-center gap-2">
          <ViewPegawai pegawai={record}/>
          <EditPegawai pegawai={record} jabatan={allJabatan}/>
          <RiDeleteBin6Line color="#DC3545" size={20} style={{ cursor: "pointer" }} onClick={() => handleDeletePegawai(record.id)}/>
        </div>
      ),
    },
  ];

  const handleDeletePegawai = async (idPegawai) => {
    await Swal.fire({
      title: 'Apakah anda yakin?',
      text: 'Ingin Menghapus Data Pegawai?',
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: 'Hapus',
      cancelButtonText: 'Batal',
      confirmButtonColor: '#14a7a0',
      cancelButtonColor: 'red',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await fetch(`/api/pegawai/${idPegawai}`, {
          method: "DELETE",
          cache: 'no-store',
          next: {
            revalidate: 10
          }
        })
        await Swal.fire("Success", "Data Pegawai Berhasil Dihapus!", "success");
        router.refresh();
      }
    })
  }

  return (
    <div className="pegawai">
      <div className='flex justify-between items-center flex-wrap gap-4'>
        <h1 className="section-title">Daftar Pegawai</h1>
        <Button icon={<PlusOutlined />} type='primary' size='large' onClick={() => setOpenModalAdd(true)}>Tambah Pegawai</Button>
      </div>
      <div className='flex flex-wrap gap-4 justify-between items-center my-10'>
        <div>Show 
        <Select
          defaultValue="10"
          style={{
            width: 60,
            margin: "0 10px"
          }}
          onChange={handleChange}
          options={showEntriesOption}
        />
          Entries  
        </div>
        <Search
          placeholder="Cari Pegawai"
          allowClear
          enterButton
          size="large"
          onSearch={onSearch}
          style={{width: "280px"}}
        />
      </div>
      <Table
        columns={columnsDataPegawai}
        dataSource={dataSource}
        bordered
        pagination={{
          pageSize: entryData
        }}
        // scroll={{
        //   x: 900,
        // }}
        // tableLayout='auto'
        // scroll={{x: "100vw"}}
        // style={{width: "100%  "}}
      />
      
      <ModalAddPegawai open={openModalAdd} setOpen={setOpenModalAdd}/>
    </div>
  )
}

export default PegawaiTable