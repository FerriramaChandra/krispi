"use client";
import { DatePicker, Form, Image, Input, Modal } from "antd";
import dayjs from "dayjs";
import React from "react";
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
  };

  return (
    <Modal
      title={`Detail Penduduk ${penduduk.id}`}
      centered
      open={open}
      onOk={() => setOpen(false)}
      onCancel={() => setOpen(false)}
      width={1000}
    >
      <Form
        layout="horizontal"
        labelCol={{ span: 6 }}
        labelWrap
        initialValues={{
          nama: penduduk.nama,
          nik: penduduk.nik,
          agama: penduduk.agama,
          alamat: penduduk.alamat,
          berlaku: penduduk.berlaku,
          golDarah: penduduk.golDarah,
          jenis_kelamin: penduduk.jenis_kelamin == "L" ? "Laki-laki" : "Perempuan",
          kecamatan: penduduk.kecamatan,
          kel: penduduk.kel,
          kewarganegaraan: penduduk.warga_negara,
          pekerjaan: penduduk.pekerjaan,
          rt_rw: penduduk.rt_rw,
          status: penduduk.status_perkawinan,
          tempat_lahir: penduduk.tempat_lahir,
          tanggal_lahir: dayjs(penduduk.tanggal_lahir, "DD/MM/YYYY"),
          berlaku: "SEUMUR HIDUP",
        }}
        labelAlign="left"
        size="large"
        style={{ margin: "2rem 0" }}
        disabled
      >
        <div className="flex w-full flex-col xl:flex-row">
          <div className="flex-1">
            <Form.Item label="NIK" name="nik" style={styles.formItemStyle}>
              <Input style={styles.inputStyle} />
            </Form.Item>

            <Form.Item label="Nama Lengkap" name="nama" style={styles.formItemStyle}>
              <Input style={styles.inputStyle} />
            </Form.Item>

            <Form.Item label="Tempat Lahir" name="tempat_lahir" style={styles.formItemStyle}>
              <Input style={styles.inputStyle} />
            </Form.Item>

            <Form.Item label="Tanggal Lahir" name="tanggal_lahir" style={styles.formItemStyle}>
              <DatePicker style={styles.inputStyle} format="DD/MM/YYYY" />
            </Form.Item>

            <Form.Item label="Jenis Kelamin" name="jenis_kelamin" style={styles.formItemStyle}>
              <Input style={styles.inputStyle} />
            </Form.Item>

            <Form.Item label="Alamat" name="alamat" style={styles.formItemStyle}>
              <TextArea
                style={styles.inputStyle}
                autoSize={{
                  minRows: 3,
                  maxRows: 5,
                }}
              />
            </Form.Item>

            <Form.Item label="Golongan Darah" name="golDarah" style={styles.formItemStyle}>
              <Input style={styles.inputStyle} />
            </Form.Item>

            <Form.Item label="Agama" name="agama" style={styles.formItemStyle}>
              <Input style={styles.inputStyle} />
            </Form.Item>
          </div>

          <div className="flex-1">
            <Form.Item label="Status Perkawinan" name="status" style={styles.formItemStyle}>
              <Input style={styles.inputStyle} />
            </Form.Item>

            <Form.Item label="Pekerjaan" name="pekerjaan" style={styles.formItemStyle}>
              <Input style={styles.inputStyle} />
            </Form.Item>

            <Form.Item label="Warna Negara" name="kewarganegaraan" style={styles.formItemStyle}>
              <Input style={styles.inputStyle} />
            </Form.Item>

            <Form.Item label="Berlaku Hingga" name="berlaku" style={styles.formItemStyle}>
              <Input style={styles.inputStyle} />
            </Form.Item>

            <Form.Item label="RT/RW" name="rt_rw" style={styles.formItemStyle}>
              <Input style={styles.inputStyle} />
            </Form.Item>

            <Form.Item label="Kel/Desa" name="kel" style={styles.formItemStyle}>
              <Input style={styles.inputStyle} />
            </Form.Item>

            <Form.Item label="Kecamatan" name="kecamatan" style={styles.formItemStyle}>
              <Input style={styles.inputStyle} />
            </Form.Item>

            <Form.Item label="Foto" name="foto" style={{marginBottom: "0", fontWeight: "600",}}>
              <Image width={250} src={penduduk.foto} style={{ borderRadius: "8px" }} />
            </Form.Item>
          </div>
        </div>
      </Form>
    </Modal>
  );
};

export default PendudukModal;
