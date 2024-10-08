import React, { useState, useRef } from 'react'
import { Button, DatePicker, Form, Input, Modal, Radio, Select, Steps, Divider, Space } from 'antd'
import { useRouter } from 'next/navigation';
const { TextArea } = Input;
import Swal from 'sweetalert2'
import Camera from '@/app/components/atoms/Camera';
import { dataAgama, dataPekerjaan, dataWargaNegara, golonganDarah, statusPerkawinan } from '@/app/constant';
import { PlusOutlined } from '@ant-design/icons';

const ModalAddPegawai = ({ open, setOpen }) => {
  const inputRef = useRef(null);
  const [jenisKelamin, setJenisKelamin] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState("");
  const [current, setCurrent] = useState(0);
  const router = useRouter()
  const [namaPegawai, setNamaPegawai] = useState("");
  const [idPenduduk, setIdPenduduk] = useState("");
  const [pekerjaanBaru, setPekerjaanBaru] = useState("");
  const [pekerjaan, setPekerjaan] = useState(dataPekerjaan)

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const addPekerjaanLainnya = (e) => {
    e.preventDefault();
    setPekerjaan([...pekerjaan, pekerjaanBaru || `New item ${index++}`]);
    setPekerjaanBaru('');
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
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

  const options = dataAgama.map((agama) => (
    {
      value: agama.value,
      label: agama.label
    }
  ));

  const optionsGolonganDarah = golonganDarah.map((darah) => (
    {
      value: darah.value,
      label: darah.label
    }
  ));

  const optionsStatus = statusPerkawinan.map((statusHubungan) => (
    {
      value: statusHubungan.value,
      label: statusHubungan.label
    }
  ));

  const dataWN = dataWargaNegara.map((statusWNI) => (
    {
      value: statusWNI.value,
      label: statusWNI.label
    }
  ));

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
  };

  const onFinish = async (values) => {
    const {
      agama,
      alamat,
      berlaku,
      golDarah,
      jenis_kelamin,
      kecamatan,
      kel,
      kewarganegaraan,
      nama,
      nik,
      pekerjaan,
      rw_rt,
      status,
      tempat_lahir,
    } = values;
    setNamaPegawai(nama);
    try {
      const response = await fetch("/api/penduduk", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          agama,
          alamat,
          berlaku_hingga: berlaku,
          golongan_darah: golDarah,
          jenis_kelamin,
          kecamatan,
          kelurahan_desa: kel,
          warga_negara: kewarganegaraan,
          nama,
          nik,
          pekerjaan,
          rt_rw: rw_rt,
          status_perkawinan: status,
          tempat_lahir,
          tanggal_lahir: tanggalLahir
        }),
      });
      const body = await response.json();
      setIdPenduduk(body.newPenduduk.id);

      if (response.ok) {
        await Swal.fire("Success", "Data Penduduk Berhasil Ditambahkan!", "success");
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
    setTanggalLahir(dateString);
  };

  const handleJenisKelaminChange = (e) => {
    setJenisKelamin(e.target.value);
  };

  const onPekerjaanBaruChange = (event) => {
    setPekerjaanBaru(event.target.value);
  };

  const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  const handleCancel = () => {
    setOpen(false);
    prev();
  };

  return (
    <Modal
      centered
      styles={{ padding: "50px" }}
      open={open}
      onCancel={handleCancel}
      width={1000}
      footer={null}
    >
      <h1 className="section-title">Tambah Data Penduduk</h1>
      <p>Silahkan isi form dibawah sesuai data penduduk</p>
      <Steps current={current} items={items} style={{ marginTop: "2rem", paddingRight: "4rem" }} />
      {
        current == 0 && (
          <Form
            initialValues={{
              berlaku: 'SEUMUR HIDUP'
            }}
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
                <Form.Item
                  label="Gol. Darah"
                  name="golDarah"
                >
                  <Select
                    showSearch
                    placeholder="-- Pilih Golongan Darah --"
                    style={styles.inputStyle}
                    options={optionsGolonganDarah}
                    filterOption={filterOption}
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
                    options={optionsStatus}
                  />
                </Form.Item>

                <Form.Item
                  label="Pekerjaan"
                  name="pekerjaan"
                  style={styles.formItemStyle}
                >
                  <Select
                    style={
                      styles.inputStyle
                    }
                    placeholder="-- Pilih Pekerjaan --"
                    options={pekerjaan.map((item) => ({
                      label: item,
                      value: item,
                    }))}
                    dropdownRender={(menu) => (
                      <>
                        {menu}
                        <Divider
                          style={{
                            margin: '8px 0',
                          }}
                        />
                        <Space
                          style={{
                            padding: '0 8px 4px',
                          }}
                        >
                          <Input
                            placeholder="Please enter item"
                            ref={inputRef}
                            value={pekerjaanBaru}
                            onChange={onPekerjaanBaruChange}
                            onKeyDown={(e) => e.stopPropagation()}
                          />
                          <Button type="text" icon={<PlusOutlined />} onClick={addPekerjaanLainnya}>
                            Add item
                          </Button>
                        </Space>
                      </>
                    )}

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
                    options={dataWN}
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
                  <Input disabled style={styles.inputStyle} />
                </Form.Item>

                <Form.Item
                  label="RT/RW"
                  name="rw_rt"
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
                  name="kel"
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
            <Camera nama={namaPegawai} idPenduduk={idPenduduk} />
            {/* </div> */}
          </div>
        )
      }
    </Modal>
  )
}

export default ModalAddPegawai