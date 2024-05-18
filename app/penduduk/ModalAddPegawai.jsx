import React, { useEffect, useState } from 'react'
import { Button, DatePicker, Form, Input, Modal, Radio, Select, Steps } from 'antd'
import { useRouter } from 'next/navigation';
const { TextArea } = Input;
import Swal from 'sweetalert2'
import Camera from '@/app/components/atoms/Camera';
import { dataPangkat } from '@/app/constant';

const ModalAddPegawai = ({ open, setOpen }) => {
  const [jenisKelamin, setJenisKelamin] = useState("");
  const [allJabatan, setAllJabatan] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tanggalLahir, setTanggalLahir] = useState("");
  const [current, setCurrent] = useState(0);
  const router = useRouter()
  const [namaPegawai, setNamaPegawai] = useState("");

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

  const fetchAllJabatan = async () => {
    setLoading(true);
    const response = await fetch("/api/jabatan");
    const data = await response.json();
    setAllJabatan(data.allJabatan);
    setLoading(false);
  }
  useEffect(() => {
    fetchAllJabatan();
  }, [])

  const options = allJabatan.map((jabatan) => (
    {
      value: jabatan.id,
      label: jabatan.nama_jabatan
    }
  ))

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
      marginBottom: "1.5rem",
      fontWeight: "600",

    },
  }

  const onFinish = async (values) => {
    const { nama, nip, telepon, tempat_lahir, jenis_kelamin, jabatanId, pangkat, alamat } = values;
    setNamaPegawai(nama);
    try {
      const response = await fetch("/api/pegawai", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          nama, nip, telepon, tempat_lahir, tanggal_lahir: tanggalLahir, jenis_kelamin, jabatanId, pangkat, alamat
        }),
      });
      if (response.ok) {
        await Swal.fire("Success", "Data Pegawai Berhasil Ditambahkan!", "success");
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

  return (
    <Modal
      centered
      styles={{ padding: "50px" }}
      open={open}
      onCancel={() => setOpen(false)}
      width={1000}
      footer={null}
    >
      <h1 className="section-title">Tambah Data Penduduk</h1>
      <p>Silahkan isi form dibawah sesuai data penduduk</p>
      <Steps current={current} items={items} style={{ marginTop: "2rem", paddingRight: "4rem" }} />
      {
        current == 0 && (
          <Form
            layout='horizontal'
            labelCol={{ span: 6 }}
            labelWrap
            labelAlign='left'
            size='large'
            style={{ margin: '2rem 0' }}
            onFinish={onFinish}
          >
            <div className='flex w-full flex-col xl:flex-row'>
              <div className='flex-1'>
                <Form.Item
                  label="NIK"
                  name="nik"
                  style={styles.formItemStyle}
                  rules={[
                    {
                      required: true,
                      message: "NIP tidak boleh kosong!"
                    }
                  ]}
                >
                  <Input style={styles.inputStyle} placeholder='1234567890' />
                </Form.Item>
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
                  <Input style={styles.inputStyle} placeholder='Isi Nama' />
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
                  <Input style={styles.inputStyle} placeholder='Palu' />
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
                  <DatePicker onChange={onDateChange} style={styles.inputStyle} format="DD/MM/YYYY" />
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

              <div className='flex-1'>
                <Form.Item
                  label="Agama"
                  name="agama"
                  style={styles.formItemStyle}
                >
                  <Select
                    showSearch
                    placeholder="-- Pilih Agama --"
                    style={styles.inputStyle}
                    onChange={handleJabatanChange}
                    options={options}
                    filterOption={filterOption}
                  />
                </Form.Item>
                <Form.Item
                  label="Status Perkawinan"
                  name="status"
                  style={styles.formItemStyle}
                >
                  <Select
                    placeholder="-- Pilih Status Perkawinan --"
                    style={styles.inputStyle}
                    onChange={handlePangkatChange}
                    options={dataPangkat}
                  />
                </Form.Item>
                <Form.Item
                  label="Warga Negara"
                  name="kewarganegaraan"
                  style={styles.formItemStyle}
                >
                  <Select
                    placeholder="-- Pilih Kewarganegaraan --"
                    style={styles.inputStyle}
                    onChange={handlePangkatChange}
                    options={dataPangkat}
                  />
                </Form.Item>

                <Form.Item
                  label="Berlaku Hingga"
                  name="berlaku"
                  style={styles.formItemStyle}
                  rules={[
                    {
                      required: true,
                      message: "Masa berlaku tidak boleh kurang"
                    }
                  ]}
                >
                  <Input style={styles.inputStyle} placeholder='Masukkan masa berlaku' />
                </Form.Item>

                <Form.Item
                  label="RT/RW"
                  name="rw/rt"
                  style={styles.formItemStyle}
                  rules={[
                    {
                      required: true,
                      message: "RT/RW tidak boleh kosong"
                    }
                  ]}
                >
                  <Input style={styles.inputStyle} placeholder='000/000' />
                </Form.Item>
                <Form.Item
                  label="Kel/Desa"
                  name="kel/desa"
                  style={styles.formItemStyle}
                  rules={[
                    {
                      required: true,
                      message: "Kelurahan/Desa tidak boleh kosong"
                    }
                  ]}
                >
                  <Input style={styles.inputStyle} placeholder='Masukkan nama Kelurahan/Desa' />
                </Form.Item>
                <Form.Item
                  label="Kecamatan"
                  name="kecamatan"
                  style={styles.formItemStyle}
                  rules={[
                    {
                      required: true,
                      message: "Kecamatan tidak boleh kosong"
                    }
                  ]}
                >
                  <Input style={styles.inputStyle} placeholder='Masukkan nama Kecamatan' />
                </Form.Item>
              </div>
            </div>
            <div className="flex justify-end items-end gap-3 mr-0 xl:mr-8">
              <Button htmlType='submit' type='primary'>Simpan data</Button>
              <Button htmlType='reset' type='default' style={{ background: "#F0F5FD", fontWeight: 500 }}>Reset</Button>
            </div>
          </Form>
        )
      }
      {
        current == 1 && (
          <div className='max-w-[500px] m-auto p-8'>
            <h2 className='font-semibold text-xl text-center'>Pratinjau Kamera</h2>
            {/* <div className='max-w-[480px] h-[300px] border m-auto my-12'> */}
            <Camera nama={namaPegawai} />
            {/* </div> */}

          </div>
        )
      }
    </Modal>
  )
}

export default ModalAddPegawai