'use client';
import { Form, Input, Modal } from 'antd'
import React from 'react'
const { TextArea } = Input;

const PendudukModal = ({ open, setOpen, penduduk }) => {
  const styles = {
    inputStyle: {
      fontWeight: "500",
      color: "black",
      fontFamily: "montserrat",
      width: "90%",
    },
    formItemStyle: {
      marginBottom: "2.5rem",
      fontWeight: "600",

    },
  }

  return (
    <Modal
      title="Detail Penduduk"
      centered
      open={open}
      onOk={() => setOpen(false)}
      onCancel={() => setOpen(false)}
      width={1000}
    >
      <Form
        layout='horizontal'
        labelCol={{ span: 6 }}
        labelWrap
        initialValues={{
          nama: penduduk.nama,
          nip: penduduk.nip,
          telepon: penduduk.telepon,
          tempat_lahir: penduduk.tempat_lahir,
          tanggal_lahir: penduduk.tanggal_lahir,
          pangkat: penduduk.pangkat,
          jabatan: penduduk.jabatan,
          jenis_kelamin: penduduk.jenis_kelamin == "L" ? "Laki-laki" : "Perempuan",
          alamat: penduduk.alamat,
        }}
        labelAlign='left'
        size='large'
        style={{ margin: '2rem 0' }}
        disabled
      >
        <div className='flex w-full flex-col xl:flex-row'>
          <div className='flex-1'>
            <Form.Item
              label="Nama Lengkap"
              name="nama"
              style={styles.formItemStyle}
            >
              <Input style={styles.inputStyle} />
            </Form.Item>

            <Form.Item
              label="Jabatan"
              name="jabatan"
              style={styles.formItemStyle}
            >
              <Input style={styles.inputStyle} />
            </Form.Item>

            <Form.Item
              label="No. HP"
              name="telepon"
              style={styles.formItemStyle}
            >
              <Input style={styles.inputStyle} />
            </Form.Item>
            <Form.Item
              label="Tempat Lahir"
              name="tempat_lahir"
              style={styles.formItemStyle}
            >
              <Input style={styles.inputStyle} />
            </Form.Item>

            <Form.Item
              label="Alamat"
              name="alamat"
              style={styles.formItemStyle}
            >
              <TextArea
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
              label="NIP"
              name="nip"
              style={styles.formItemStyle}
            >
              <Input style={styles.inputStyle} />
            </Form.Item>

            <Form.Item
              label="Pangkat / Gol"
              name="pangkat"
              style={styles.formItemStyle}
            >
              <Input style={styles.inputStyle} />
            </Form.Item>

            <Form.Item
              label="Jenis Kelamin"
              name="jenis_kelamin"
              style={styles.formItemStyle}
            >
              <Input style={styles.inputStyle} />
            </Form.Item>
            <Form.Item
              label="Tanggal Lahir"
              name="tanggal_lahir"
              style={styles.formItemStyle}
            >
              <Input style={styles.inputStyle} />
            </Form.Item>

            <img alt='image' src={penduduk.foto} width={300} height={200} />
            <p>Id : {penduduk.id}</p>
          </div>
        </div>
      </Form>
    </Modal>
  )
}

export default PendudukModal