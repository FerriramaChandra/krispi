'use client';
import { Form, Input, Modal } from 'antd'
import dayjs from 'dayjs';
import React from 'react'
const { TextArea } = Input;

const PegawaiModal = ({open, setOpen, pegawai}) => {
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
      title="Detail Pegawai"
      centered
      open={open}
      onOk={() => setOpen(false)}
      onCancel={() => setOpen(false)}
      width={1000}
    >
      <Form
        layout='horizontal'
        labelCol={{span: 6}}
        labelWrap
        initialValues={{
          nama: pegawai.nama,
          nip: pegawai.nip,
          telepon: pegawai.telepon,
          tempat_lahir: pegawai.tempat_lahir,
          tanggal_lahir:pegawai.tanggal_lahir, 
          pangkat: pegawai.pangkat,
          jabatan: pegawai.jabatan,
          jenis_kelamin: pegawai.jenis_kelamin == "L" ? "Laki-laki" : "Perempuan",
          alamat: pegawai.alamat,
        }}
        labelAlign='left'
        size='large'
        style={{margin: '2rem 0'}}
        disabled
      >
        <div className='flex w-full flex-col xl:flex-row'>
          <div className='flex-1'>
            <Form.Item 
              label="Nama Lengkap" 
              name="nama" 
              style={styles.formItemStyle} 
              >
              <Input style={styles.inputStyle}/>
            </Form.Item>
            
            <Form.Item 
              label="Jabatan" 
              name="jabatan" 
              style={styles.formItemStyle} 
            >
              <Input style={styles.inputStyle}/>
            </Form.Item>

            <Form.Item 
              label="No. HP" 
              name="telepon" 
              style={styles.formItemStyle} 
              >
              <Input style={styles.inputStyle}/>
            </Form.Item>
            <Form.Item 
              label="Tempat Lahir" 
              name="tempat_lahir" 
              style={styles.formItemStyle} 
            >
              <Input style={styles.inputStyle}/>
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
              <Input style={styles.inputStyle}/>
            </Form.Item>

            <Form.Item 
              label="Pangkat / Gol" 
              name="pangkat" 
              style={styles.formItemStyle} 
            >
              <Input style={styles.inputStyle}/>  
            </Form.Item>
            
            <Form.Item 
              label="Jenis Kelamin" 
              name="jenis_kelamin" 
              style={styles.formItemStyle}
            >
              <Input style={styles.inputStyle}/>  
            </Form.Item>
            <Form.Item 
              label="Tanggal Lahir" 
              name="tanggal_lahir" 
              style={styles.formItemStyle} 
            >
              <Input style={styles.inputStyle}/>
            </Form.Item>
          </div>
        </div>
      </Form>
    </Modal>
  )
}

export default PegawaiModal