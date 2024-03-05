'use client';
import React, { useState } from 'react'
import { Button, DatePicker, Form, Input, Radio, Select, Steps, Modal } from 'antd'
import { useRouter } from 'next/navigation';
const { TextArea } = Input;
import Swal from 'sweetalert2'
import Camera from '@/app/components/atoms/Camera';
import { dataPangkat } from '@/app/constant';
import dayjs from 'dayjs';

const ModalEditPegawai = ({pegawai, jabatan, setOpen, open}) => {
  const [jenisKelamin, setJenisKelamin] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState(pegawai?.tanggal_lahir);
  const [current, setCurrent] = useState(0);
  const router = useRouter();

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const steps = [
    {
      title: 'First',
      content: 'First-content',
    },
    {
      title: 'Second',
      content: 'Second-content',
    },
  ];

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  const styles = {
    inputStyle: {
      fontWeight: "500", 
      color: "black", 
      fontFamily: "montserrat",
      width: "90%",
      border: "1px solid black",
      fontSize: "14px",
      borderRadius: "8px"
    },
    formItemStyle: {
      marginBottom: "2.5rem",
      fontWeight: "600",
      
    },
  }

  const options = jabatan?.map((jabatan) => (
    { 
      value: jabatan.id, 
      label: jabatan.nama_jabatan 
    }
  ))

  const onFinish = async (values) => {
    console.log(values)
    const {nama, nip, telepon, tempat_lahir, jenis_kelamin, jabatanId, pangkat, alamat} = values;
    console.log(tanggalLahir);
    try {
      const response = await fetch(`/api/pegawai/${pegawai.id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          nama, nip, telepon, tanggal_lahir: tanggalLahir, tempat_lahir, jenis_kelamin, jabatanId, pangkat, alamat
        }),
      });
      if (response.ok) {
        await Swal.fire("Success", "Data Pegawai Berhasil Diedit!", "success");
        router.refresh();
        next();
      } else {
        console.log(response)
        await Swal.fire("Oops", "Something went wrong", "error");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const onDateChange = (date, dateString) => {
    console.log(date, dateString);
    setTanggalLahir(dateString);
  };

  const handleJabatanChange = (value) => {
    console.log(`selected ${value}`);
  };

  const handlePangkatChange = (value) => {
    console.log(`selected ${value}`);
  };

  const handleJenisKelaminChange = (e) => {
    setJenisKelamin(e.target.value);
  };

  const filterOption = (input, option) =>
  (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  const closeModal = () => {
    if(current == 1){
      setCurrent(current - 1);
    }
    setOpen(false);
  }

  return (
    <Modal
      centered
      styles={{padding: "50px"}}
      open={open}
      onCancel={() => closeModal()}
      width={1000}
      footer={null}
    >
      <h1 className="section-title">Edit Pegawai</h1>
      <p>Silahkan isi form dibawah ini untuk mengedit data pegawai</p>
      <Steps current={current} items={items} style={{marginTop: "2rem", paddingRight: "4rem"}}/>
      {
        current == 0 && (
          <Form
            layout='horizontal'
            labelCol={{span: 6}}
            labelWrap
            labelAlign='left'
            size='large'
            style={{margin: '2rem 0'}}
            onFinish={onFinish}
            initialValues={{
              nama: pegawai.nama,
              nip: pegawai.nip,
              telepon: pegawai.telepon,
              tanggal_lahir: dayjs(pegawai.tanggal_lahir, "DD/MM/YYYY"),
              tempat_lahir: pegawai.tempat_lahir,
              alamat: pegawai.alamat,
              jenis_kelamin: pegawai.jenis_kelamin,
              jabatanId: Number(pegawai.jabatanId),
              pangkat: pegawai.pangkat
            }}
          >
            <div className='flex w-full flex-col xl:flex-row'>
              <div className='flex-1'>
                <Form.Item 
                  label="Nama Lengkap" 
                  name="nama" 
                  style={styles.formItemStyle} 
                  rules={[
                    {
                      required: true,
                      message: "Nama Lengkap tidak boleh kosong!"
                    }
                  ]}
                  >
                  <Input style={styles.inputStyle} placeholder='Muhammad Fajar'/>
                </Form.Item>
                <Form.Item 
                  label="NIP" 
                  name="nip" 
                  style={styles.formItemStyle} 
                  rules={[
                    {
                      required: true,
                      message: "NIP tidak boleh kosong!"
                    }
                  ]}
                  >
                  <Input style={styles.inputStyle} placeholder='1234567890'/>
                </Form.Item>

                <Form.Item 
                  label="Tanggal Lahir" 
                  name="tanggal_lahir" 
                  style={styles.formItemStyle} 
                  rules={[
                    {
                      required: true,
                      message: "Tanggal Lahir tidak boleh kosong!"
                    }
                  ]}
                >
                  <DatePicker onChange={onDateChange} style={styles.inputStyle} format="DD/MM/YYYY"/>
                </Form.Item>

                <Form.Item 
                  label="Tempat Lahir" 
                  name="tempat_lahir" 
                  style={styles.formItemStyle} 
                  rules={[
                    {
                      required: true,
                      message: "Tempat Lahir tidak boleh kosong!"
                    }
                  ]}
                >
                  <Input style={styles.inputStyle} placeholder='Palu'/>
                </Form.Item>

                <Form.Item 
                  label="Jenis Kelamin" 
                  name="jenis_kelamin" 
                  style={styles.formItemStyle}
                  rules={[
                    {
                      required: true,
                      message: "Jenis Kelamin tidak boleh kosong!"
                    }
                  ]} 
                >
                  <Radio.Group onChange={handleJenisKelaminChange} value={jenisKelamin}>
                    <Radio value={"L"}>Laki-laki</Radio>
                    <Radio value={"P"}>Perempuan</Radio>
                  </Radio.Group>
                </Form.Item>
              </div>
              <div className='flex-1'>
                <Form.Item 
                  label="No. HP" 
                  name="telepon" 
                  style={styles.formItemStyle} 
                  rules={[
                    {
                      required: true,
                      message: "No HP tidak boleh kosong!"
                    }
                  ]}
                  >
                  <Input style={styles.inputStyle} placeholder='081234567890'/>
                </Form.Item>
                
                <Form.Item 
                  label="Jabatan" 
                  name="jabatanId" 
                  style={styles.formItemStyle} 
                >
                  <Select
                    showSearch
                    placeholder="-- Pilih Jabatan --"
                    style={styles.inputStyle}
                    onChange={handleJabatanChange}
                    options={options}
                    filterOption={filterOption}
                  />
                </Form.Item>

                <Form.Item 
                  label="Pangkat / Gol" 
                  name="pangkat" 
                  style={styles.formItemStyle} 
                >
                  <Select
                    placeholder="-- Pilih Pangkat --"
                    style={styles.inputStyle}
                    onChange={handlePangkatChange}
                    options={dataPangkat}
                  />
                </Form.Item>
                
                <Form.Item 
                  label="Alamat" 
                  name="alamat" 
                  style={styles.formItemStyle} 
                >
                  <TextArea
                    placeholder="Jl. Soekarno Hatta No. 1"
                    style={styles.inputStyle}
                    autoSize={{
                      minRows: 4,
                      maxRows: 6,
                    }}
                  />
                </Form.Item>
              </div>
            </div>
            <div className="flex justify-end items-end gap-3 mr-0 xl:mr-8">
              <Button htmlType='reset' type='default' style={{background: "#F0F5FD", fontWeight: 500}}>Reset</Button>
              <Button htmlType='submit' type='primary'>Simpan data</Button>
            </div>
          </Form>
        )
      }
      {
        current == 1 && (
          <div className='max-w-[500px] m-auto p-8'>
            <h2 className='font-semibold text-xl text-center'>Pratinjau Kamera</h2>
            {/* <div className='max-w-[480px] h-[300px] border m-auto my-12'> */}
              <Camera nama={pegawai?.nama}/>
            {/* </div> */}
            
          </div>
        )
      }
    </Modal>
  )
}

export default ModalEditPegawai