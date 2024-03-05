import React, { useState } from 'react'
import { Button, Form, Input, TimePicker, Select, DatePicker, Modal } from 'antd'
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

const ModalAddKehadiran = ({open, setOpen, allPegawai}) => {
  const [jamMasuk, setJamMasuk] = useState("")
  const [jamKeluar, setJamKeluar] = useState("")
  const [tanggal, setTanggal] = useState("")
  const router = useRouter()
  
  const styles = {
    inputStyle: {
      fontWeight: "500", 
      color: "black", 
      fontFamily: "montserrat",
      width: "95%",
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
    values.jamMasuk = jamMasuk;
    values.jamKeluar = jamKeluar;
    values.tanggal = tanggal;

    const {pegawaiId, status, kehadiran, keterangan} = values;
    try {
      const response = await fetch("/api/presensi", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          pegawaiId,
          tanggal,
          jam_masuk: jamMasuk, 
          jam_keluar: jamKeluar,
          status,
          kehadiran,
          keterangan
        }),
      });
      if (response.ok) {
        await Swal.fire("Success", "Data Presensi Berhasil Ditambahkan!", "success");
        router.refresh();
        setOpen(false);
      } else {
        console.log(response)
        await Swal.fire("Oops", "Terjadi Kesalahan", "error");
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
      <h1 className="section-title">Tambah Kehadiran</h1>
      <p>Silahkan isi form dibawah ini untuk menambahkan data kehadiran pegawai</p>
      <Form
        layout='horizontal'
        labelCol={{span: 5}}
        labelWrap
        labelAlign='left'
        size='large'
        style={{margin: '2rem 0'}}
        onFinish={onFinish}
      >
        <div className='flex w-full flex-col xl:flex-row'>
          <div className='flex-1'>
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
                style={styles.inputStyle}
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
                <TimePicker onChange={handleJamMasukChange} style={styles.inputStyle} />
            </Form.Item>
            <Form.Item 
              label="Jam Keluar" 
              name="jamKeluar" 
              style={styles.formItemStyle} 
            >
                <TimePicker onChange={handleJamKeluarChange} style={styles.inputStyle} />
            </Form.Item>
          </div>
          <div className='flex-1'>
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
              name="kehadiran" 
              style={styles.formItemStyle} 
              rules={[
                {
                  required: true,
                  message: "Kehadiran harus diisi!"
                }
              ]}
            >
              <Select
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
          </div>
        </div>
        <div className="flex justify-end items-end gap-3">
          <Button htmlType='reset' type='default' style={{background: "#F0F5FD", fontWeight: 500}}>Reset</Button>
          <Button htmlType='submit' type='primary'>Simpan data</Button>
        </div>
      </Form>
    </Modal>
  )
}

export default ModalAddKehadiran