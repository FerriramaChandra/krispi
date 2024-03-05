import { DownloadOutlined } from '@ant-design/icons';
import { Badge, Button, Table, message } from 'antd';
import { format } from 'date-fns';
import dayjs from 'dayjs';
import React from 'react';
import * as XLSX from 'xlsx';

const TabelLaporan = ({allKehadiran, pegawai, startDate, endDate}) => {
  const [messageApi, contextHolder] = message.useMessage();

  const filteredDatas = allKehadiran.filter( (kehadiran) => kehadiran.pegawai.nama == pegawai && 
  dayjs(kehadiran.tanggal, 'DD/MM/YYYY').isAfter(dayjs(startDate, 'DD/MM/YYYY'), 'day') &&
  dayjs(kehadiran.tanggal, 'DD/MM/YYYY').isBefore(dayjs(endDate, 'DD/MM/YYYY'), 'day')
  )

  const dataSource = filteredDatas.map((kehadiran, i) => ({
    key: i,
    pegawai: kehadiran.pegawai.nama,
    tanggal: kehadiran.tanggal,
    jam_masuk: kehadiran.jam_masuk,
    jam_keluar: kehadiran.jam_keluar,
    status: kehadiran.status,
    kehadiran: kehadiran.kehadiran,
    keterangan: kehadiran.keterangan,
  }))

  const columnsDataKehadiran = [
    {
      title: "Nama",
      dataIndex: "pegawai",
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

  const handleOnExport = () => {
    console.log(dataSource);
    if(dataSource.length == 0) {
      error();
    } else {
      let wb = XLSX.utils.book_new();
      let ws = XLSX.utils.json_to_sheet(dataSource);
      XLSX.utils.book_append_sheet(wb, ws, 'MySheet1')
      XLSX.writeFile(wb, 'RekapKehadiran.xlsx')
      success();
    }
  }

  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Rekap Kehadiran Berhasil Didownload',
    });
  };

  const error = () => {
    messageApi.open({
      type: 'error',
      content: 'Data masih kosong',
    });
  };

  return (
    <>
      {contextHolder}
      <Table
        columns={columnsDataKehadiran}
        dataSource={dataSource}
        bordered
        footer={() => <Button icon={<DownloadOutlined />} type='primary' size='large' onClick={() => handleOnExport()}>Ekspor xls</Button>}
        // scroll={{
          //   x: 900,
          // }}
        // tableLayout='auto'
        // scroll={{x: "100vw"}}
        // style={{width: "100%  "}}
      />
    </>
  )
}

export default TabelLaporan