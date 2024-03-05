'use client';
import React, { useState } from 'react'
import Link from 'next/link'
import { Badge, Button, Input, Select, Table } from 'antd'
import { DownloadOutlined, PlusOutlined } from '@ant-design/icons'
import { showEntriesOption } from "../constant/index"
import { RiDeleteBin6Line } from 'react-icons/ri';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import ModalAddKehadiran from './ModalAddKehadiran';
import EditKehadiran from './EditKehadiran';
import * as XLSX from 'xlsx';
const { Search } = Input;

const TabelKehadiran = ({allKehadiran, allPegawai}) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [filteredUser, setFilteredUser] = useState("");
  const [entryData, setEntryData] = useState("10");

  const handleChange = (value) => setEntryData(value);

  const onSearch = (value) => {
    const filterUser = allKehadiran.filter(kehadiran => kehadiran.pegawai.nama.toLowerCase().includes(value.toLowerCase()) || kehadiran.status.toLowerCase().includes(value.toLowerCase()))
    setFilteredUser(filterUser.map((kehadiran, i) => ({
      key: i,
      no: `${i + 1}`,
      id: kehadiran.id,
      tanggal: kehadiran.tanggal,
      jam_keluar: kehadiran.jam_keluar,
      jam_masuk: kehadiran.jam_masuk,
      kehadiran: kehadiran.kehadiran,
      keterangan: kehadiran.keterangan,
      status: kehadiran.status,
      pegawai: kehadiran.pegawai.nama,
      jabatan: kehadiran.pegawai.jabatan.nama_jabatan,
      pegawaiId: kehadiran.pegawai.id,
   })))
  };

  const dataSource = allKehadiran.map((kehadiran, i) => ({
    key: i,
    no: `${i + 1}`,
    id: kehadiran.id,
    tanggal: kehadiran.tanggal,
    jam_keluar: kehadiran.jam_keluar,
    jam_masuk: kehadiran.jam_masuk,
    kehadiran: kehadiran.kehadiran,
    keterangan: kehadiran.keterangan,
    status: kehadiran.status,
    pegawai: kehadiran.pegawai.nama,
    jabatan: kehadiran.pegawai.jabatan.nama_jabatan,
    pegawaiId: kehadiran.pegawai.id,
  }))

  const columnsDataKehadiran = [
    {
      title: "No",
      dataIndex: "no",
      fixed: "left",
      key: "no",
    },
    {
      title: "Nama",
      dataIndex: "pegawai",
      // width: 200,
      fixed: "left",
      key: "pegawai",
    },
    {
      title: "Tanggal",
      dataIndex: "tanggal",
      key: "tanggal",
    },
    {
      title: "Jam Masuk",
      dataIndex: "jam_masuk",
      key: "jam_masuk",
      responsive: ["md"],
    },
    {
      title: "Jam Keluar",
      dataIndex: "jam_keluar",
      key: "jam_keluar",
      render: (_, record) => (
        <span>{record.jam_keluar ? record.jam_keluar : "--  "}</span>
      ),
      responsive: ["md"],
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, record) => (
        record.status == "Masuk" ? (
          <Badge status="success" text={record.status} />
          ) : (
          <Badge status="error" text={record.status} />
        )
      ),
      responsive: ["md"],
    },
    {
      title: "Kehadiran",
      dataIndex: "kehadiran",
      key: "kehadiran",
    },
    {
      title: "Keterangan",
      dataIndex: "keterangan",
      key: "keterangan",
      render: (_, record) => (
        <span>{record.keterangan ? record.keterangan : "--  "}</span>
      ),
      responsive: ["xl"],
    },
    {
      title: "Aksi",
      fixed: "right",
      dataIndex: "aksi",
      key: "aksi",
      width: 100,
      render: (_, record) => (
        <div className="flex justify-center items-center gap-2">
          <EditKehadiran kehadiran={record} allPegawai={allPegawai}/>
          <RiDeleteBin6Line color="#DC3545" size={20} style={{ cursor: "pointer" }} onClick={() => handleDeletePresensi(record.id)}/>
        </div>
      ),
    },
  ];

  const handleDeletePresensi = async (idPresensi) => {
    await Swal.fire({
      title: 'Apakah anda yakin?',
      text: 'Ingin Menghapus Data Kehadiran?',
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: 'Hapus',
      cancelButtonText: 'Batal',
      confirmButtonColor: '#14a7a0',
      cancelButtonColor: 'red',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await fetch(`/api/presensi/${idPresensi}`, {
          method: "DELETE",
          cache: 'no-store',
          next: {
            revalidate: 10
          }
        })
        await Swal.fire('Success', 'Data Kehadiran berhasil dihapus!', 'success')
        router.refresh();
      }
    })
  }

  const handleOnExport = () => {
    console.log(dataSource);
    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(dataSource);
    XLSX.utils.book_append_sheet(wb, ws, 'MySheet1')
    XLSX.writeFile(wb, 'RekapKehadiran.xlsx')
  }

  return (
    <div className="kehadiran">
      <div className='flex justify-between items-center flex-wrap gap-4'>
        <h1 className="section-title">Daftar Presensi Pegawai</h1>
        <Button icon={<PlusOutlined />} type='primary' size='large' onClick={() => setOpen(true)}>Tambah Kehadiran</Button>
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
        columns={columnsDataKehadiran}
        dataSource={filteredUser ? filteredUser : dataSource}
        bordered
        pagination={{
          pageSize: entryData
        }}
        footer={() => <Button icon={<DownloadOutlined />} type='primary' size='large' onClick={() => handleOnExport()}>Ekspor xls</Button>}
        // scroll={{
        //   x: 900,
        // }}
        // tableLayout='auto'
        // scroll={{x: "100vw"}}
        // style={{width: "100%  "}}
      />

      <ModalAddKehadiran open={open} setOpen={setOpen} allPegawai={allPegawai}/>
    </div>
  )
}

export default TabelKehadiran