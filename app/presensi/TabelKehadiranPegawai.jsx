'use client';
import React, { useState } from 'react'
import Link from 'next/link'
import { Badge, Table } from 'antd'
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

const TabelKehadiranPegawai = ({allKehadiran, allPegawai}) => {
  const router = useRouter();

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
  ];

  return (
    <div className='py-10 px-8'>
      <div className='flex justify-between items-center flex-wrap gap-4 mb-8'>
        <h1 className="section-title">Daftar Presensi Pegawai</h1>
      </div>
      <Table
        columns={columnsDataKehadiran}
        dataSource={dataSource}
        bordered
        // scroll={{
        //   x: 900,
        // }}
        // tableLayout='auto'
        // scroll={{x: "100vw"}}
        // style={{width: "100%  "}}
      />
    </div>
  )
}

export default TabelKehadiranPegawai