import { Button, Form, Input, TimePicker, Select, DatePicker, Modal } from 'antd'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import dayjs from 'dayjs';

const ModalEditKehadiran = ({open, setOpen, kehadiran, allPegawai}) => {
  const [jamMasuk, setJamMasuk] = useState(kehadiran.jam_masuk)
  const [jamKeluar, setJamKeluar] = useState(kehadiran.jam_keluar)
  const [tanggal, setTanggal] = useState(kehadiran.tanggal)

  const router = useRouter()
  
  // const tanggal = new Date().toLocaleDateString("id-ID");
  const styles = {
    inputStyle: {
      fontWeight: "500", 
      color: "black", 
      fontFamily: "montserrat",
      width: "100%",
      border: "1px solid black",
      fontSize: "14px",
      borderRadius: "8px"
    },
    formItemStyle: {
      marginBottom: "2.5rem",
      fontWeight: "600",
    },
  }

  const options = allPegawai?.map((pegawai) => (
    { 
      value: pegawai.id, 
      label: `${pegawai.nama} - ${pegawai.jabatan.nama_jabatan}`
    }
  ))

  const onFinish = async (values) => {
    console.log(values)
    const { pegawaiId, status, dataKehadiran, keterangan } = values;

    try {
      const response = await fetch(`/api/presensi/${kehadiran.id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          pegawaiId, tanggal, jam_masuk: jamMasuk, jam_keluar: jamKeluar, status, kehadiran: dataKehadiran, keterangan, 
        }),
      });
      if (response.ok) {
        await Swal.fire("Success", "Data Kehadiran Berhasil Diedit!", "success");
        router.refresh();
        setOpen(false);
      } else {
        console.log(response)
        await Swal.fire("Oops", "Something went wrong", "error");
      }
    } catch (error) {
      console.log(error);
    }
  }


  const handleDateChange = (date, dateString) => {
    console.log(date, dateString);
    setTanggal(dateString);
  };

  const handleJamMasukChange = (time, timeString) => {
    console.log(time, timeString);
    setJamMasuk(timeString);
  };

  const handleJamKeluarChange = (time, timeString) => {
    console.log(time, timeString);
    setJamKeluar(timeString);
  };

  const handleStatusChange = (value) => console.log(`selected ${value}`);

  const handleKehadiranChange = (value) => console.log(`selected ${value}`);

  return (
    <Modal
      centered
      styles={{padding: "50px"}}
      open={open}
      onCancel={() => setOpen(false)}
      width={1000}
      footer={null}
    >
      <h1 className="section-title">Edit Kehadiran</h1>
      <p>Silahkan isi form dibawah ini untuk mengedit data kehadiran pegawai</p>
      <Form
        layout='horizontal'
        labelCol={{span: 5}}
        labelWrap
        labelAlign='left'
        size='large'
        style={{margin: '2rem 0'}}
        onFinish={onFinish}
        initialValues={{
          pegawaiId: Number(kehadiran.pegawaiId),
          tanggal: dayjs(kehadiran.tanggal, "DD/MM/YYYY"),
          jamMasuk: dayjs(kehadiran.jam_masuk, "HH:mm:ss"),
          jamKeluar: dayjs(kehadiran.jam_keluar, "HH:mm:ss"),
          status: kehadiran.status,
          dataKehadiran: kehadiran.kehadiran,
          keterangan: kehadiran.keterangan,
        }}
      >
        <Form.Item 
          label="Nama Pegawai" 
          name="pegawaiId" 
          style={styles.formItemStyle} 
          rules={[
            {
              required: true,
              message: "Nama Pegawai harus diisi!"
            }
          ]}
          >
          <Select
            defaultValue="-- Nama Pegawai --"
            style={styles.inputStyle}
            onChange={handleStatusChange}
            options={options}
          />
        </Form.Item>

        <Form.Item 
          label="Tanggal" 
          name="tanggal" 
          style={styles.formItemStyle} 
          rules={[
            {
              required: true,
              message: "Tanggal harus diisi!"
            }
          ]}
        >
          <DatePicker onChange={handleDateChange} style={styles.inputStyle} format="DD/MM/YYYY"/>
        </Form.Item>

        <Form.Item 
          label="Jam Masuk" 
          name="jamMasuk" 
          style={styles.formItemStyle} 
          rules={[
            {
              required: true,
              message: "Jam Masuk harus diisi!"
            }
          ]}
        >
            <TimePicker onChange={handleJamMasukChange} style={styles.inputStyle} format="HH:mm:ss"/>
        </Form.Item>

        <Form.Item 
          label="Jam Keluar" 
          name="jamKeluar" 
          style={styles.formItemStyle} 
        >
            <TimePicker onChange={handleJamKeluarChange} style={styles.inputStyle} format="HH:mm:ss"/>
        </Form.Item>

        <Form.Item 
          label="Status" 
          name="status" 
          style={styles.formItemStyle} 
          rules={[
            {
              required: true,
              message: "Status harus diisi!"
            }
          ]}
        >
          <Select
            defaultValue="-- Pilih Status --"
            style={styles.inputStyle}
            onChange={handleStatusChange}
            options={[
              {
                value: '-- Pilih Status --"',
                label: '-- Pilih Status --"',
                disabled: true,
              },
              {
                value: 'Masuk',
                label: 'Masuk',
              },
              {
                value: 'Pulang',
                label: 'Pulang',
              },
              {
                value: 'Tidak Hadir',
                label: 'Tidak Hadir',
              },
            ]}
          />
        </Form.Item>

        <Form.Item 
          label="Kehadiran" 
          name="dataKehadiran" 
          style={styles.formItemStyle} 
          rules={[
            {
              required: true,
              message: "Kehadiran harus diisi!"
            }
          ]}
        >
          <Select
            defaultValue="-- Pilih Kehadiran --"
            style={styles.inputStyle}
            onChange={handleKehadiranChange}
            options={[
              {
                value: '-- Pilih Kehadiran --"',
                label: '-- Pilih Kehadiran --"',
                disabled: true,
              },
              {
                value: 'Hadir',
                label: 'Hadir',
              },
              {
                value: 'Sakit',
                label: 'Sakit',
              },
              {
                value: 'Izin',
                label: 'Izin',
              },
              {
                value: 'Alpa',
                label: 'Alpa',
              },
              {
                value: 'Lepas/Off',
                label: 'Lepas/Off',
              },
            ]}
          />
        </Form.Item>

        <Form.Item 
          label="Keterangan" 
          name="keterangan" 
          style={styles.formItemStyle} >
          <Input style={styles.inputStyle}/>
        </Form.Item>

        <div className="flex justify-end items-end gap-3">
          <Button htmlType='reset' type='default' style={{background: "#F0F5FD", fontWeight: 500}}>Reset</Button>
          <Button htmlType='submit' type='primary'>Simpan data</Button>
        </div>
      </Form>
    </Modal>
  )
}

export default ModalEditKehadiran