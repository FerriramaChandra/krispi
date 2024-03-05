'use client'
import React, { useState } from 'react'
const { RangePicker } = DatePicker;
import { Form, Select, DatePicker, Button } from 'antd'
import { SaveOutlined } from '@ant-design/icons';
import TabelLaporan from './TabelLaporan';
import dayjs from 'dayjs';

const FormLaporan = ({allPegawai, allKehadiran}) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [namaPegawai, setNamaPegawai] = useState('');
  
  const styles = {
    formItemStyle: {
      marginBottom: "2.5rem",
      fontWeight: "600",
    },
  }

  const onFinish = (values) => {
    console.log(values);
  };

  const options = allPegawai?.map((pegawai) => (
    { 
      value: pegawai.nama, 
      label: `${pegawai.nama} - ${pegawai.jabatan.nama_jabatan}`
    }
  ))

  const handleRangePicker = (date, dateString) => {
    setStartDate(dateString[0]);
    setEndDate(dateString[1])
  }

  const handleSelectChange = (value) => {
    setNamaPegawai(value);
  }

  return (
    <Form
      layout='horizontal'
      style={{margin: "2rem 0"}}
      size='large'
      labelCol={{span: 4}}
      wrapperCol={{span: 24}}
      labelAlign='left'
      onFinish={onFinish}
      >
      <Form.Item 
        label="Pegawai" 
        name="pegawai" 
        style={styles.formItemStyle}
        rules={[
          {
            required: true,
            message: 'Pegawai tidak boleh kosong!',
          },
        ]}
        >
        <Select 
          onChange={handleSelectChange}
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
            message: 'Rentan Waktu tidak boleh kosong!',
          },
        ]}
        >
        <RangePicker style={{width: "100%"}} onChange={handleRangePicker} format={'DD/MM/YYYY'}/>
      </Form.Item>
      <TabelLaporan allKehadiran={allKehadiran} pegawai={namaPegawai} startDate={startDate} endDate={endDate}/>
    </Form>
  )
}

export default FormLaporan