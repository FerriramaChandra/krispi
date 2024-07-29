'use client';
import React, { useState } from 'react'
import { Button, Input, Select, Table } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { showEntriesOption } from "../constant/index"
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import ModalAddPegawai from './ModalAddPenduduk';
import EditPenduduk from './EditPenduduk';
import ViewPegawai from './ViewPenduduk';

const { Search } = Input;

const PendudukTable = ({ allPenduduk }) => {
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [entryData, setEntryData] = useState("10");

  const router = useRouter();

  const handleChange = (value) => setEntryData(value);;

  const onSearch = (value) => console.log(value);

  const dataSource = allPenduduk.map((penduduk, i) => ({
    key: i,
    no: `${i + 1}`,
    id: penduduk.id,
    nama: penduduk.nama,
    nik: penduduk.nik,
    agama: penduduk.agama,
    tempat_lahir: penduduk.tempat_lahir,
    tanggal_lahir: penduduk.tanggal_lahir,
    jenis_kelamin: penduduk.jenis_kelamin,
    alamat: penduduk.alamat,
    status_perkawinan: penduduk.status_perkawinan,
    pekerjaan: penduduk.pekerjaan,
    warga_negara: penduduk.warga_negara,
    kecamatan: penduduk.kecamatan,
    rt_rw: penduduk.rt_rw,
    kel: penduduk.kelurahan_desa,
    golDarah: penduduk.golongan_darah
  }))

  const columnsDataPenduduk = [
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
      title: "NIK",
      dataIndex: "nik",
      width: 200,
      key: "nik",
    },
    {
      title: "Tempat Lahir",
      dataIndex: "tempat_lahir",
      key: "tempat_lahir",
    },
    {
      title: "Agama",
      dataIndex: "agama",
      key: "agama",
      responsive: ["lg"],
    },
    {
      title: "L/P",
      dataIndex: "jenis_kelamin",
      key: "jenis_kelamin",
    },
    {
      title: "Pekerjaan",
      dataIndex: "pekerjaan",
      key: "pekerjaan",
      responsive: ["md"],
    },
    {
      title: "Aksi",
      fixed: "right",
      dataIndex: "aksi",
      key: "aksi",
      width: 100,
      render: (_, record) => (
        <div className="flex justify-center items-center gap-2">
          <ViewPegawai pegawai={record} />
          <EditPenduduk penduduk={record} />
          <RiDeleteBin6Line color="#DC3545" size={20} style={{ cursor: "pointer" }} onClick={() => handleDeletePenduduk(record.id)} />
        </div>
      ),
    },
  ];

  const handleDeletePenduduk = async (idPenduduk) => {
    await Swal.fire({
      title: 'Apakah anda yakin?',
      text: 'Ingin Menghapus Data Penduduk?',
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: 'Hapus',
      cancelButtonText: 'Batal',
      confirmButtonColor: '#14a7a0',
      cancelButtonColor: 'red',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await fetch(`/api/penduduk/${idPenduduk}`, {
          method: "DELETE",
          cache: 'no-store',
          next: {
            revalidate: 10
          }
        })
        await Swal.fire("Success", "Data Penduduk Berhasil Dihapus!", "success");
        router.refresh();
      }
    })
  }

  return (
    <div className="pegawai">
      <div className='flex justify-between items-center flex-wrap gap-4'>
        <h1 className="section-title">Daftar Penduduk</h1>
        <Button icon={<PlusOutlined />} type='primary' size='large' onClick={() => setOpenModalAdd(true)}>Tambah Penduduk</Button>
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
          style={{ width: "280px" }}
        />
      </div>
      <Table
        columns={columnsDataPenduduk}
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

      <ModalAddPegawai open={openModalAdd} setOpen={setOpenModalAdd} />
    </div>
  )
}

export default PendudukTable