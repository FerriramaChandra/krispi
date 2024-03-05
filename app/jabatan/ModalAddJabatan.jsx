import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import { Button, Form, Input, Modal } from 'antd'
const { TextArea } = Input;

const ModalAddJabatan = ({ open, setOpen, kodeJabatan }) => {
  const router = useRouter()
  const [form] = Form.useForm();
  const [initialKodeJabatan, setInitialKodeJabatan] = useState(`JAB-${kodeJabatan.toString().padStart(4, "0")}`);

  useEffect(() => {
    // Update the initial values when kodeJabatan changes
    setInitialKodeJabatan(`JAB-${kodeJabatan.toString().padStart(4, "0")}`);
    form.setFieldsValue({
      kode_jabatan: `JAB-${kodeJabatan.toString().padStart(4, "0")}`,
      nama_jabatan: '',
      keterangan: '',
    });
  }, [kodeJabatan]);

  const styles = {
    inputStyle: {
      fontWeight: "500",
      color: "black",
      fontFamily: "montserrat",
      width: "100%",
      border: "1px solid black",
      fontSize: "14px",
    },
    formItemStyle: {
      marginBottom: "2.5rem",
      fontWeight: "600",

    },
  }

  const onFinish = async (values) => {
    const { kode_jabatan, nama_jabatan, keterangan } = values;
    console.log(values);
    try {
      const response = await fetch("/api/jabatan", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          kode_jabatan: kode_jabatan.toString(),
          nama_jabatan,
          keterangan
        }),
      });
      if (response.ok) {
        await Swal.fire("Success", "Data Jabatan Berhasil Ditambahkan!", "success");
        router.refresh();
        setOpen(false);
      } else {
        await Swal.fire("Oops", "Data Jabatan Telah Ada", "error");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Modal
      centered
      styles={{ padding: "50px" }}
      open={open}
      onCancel={() => setOpen(false)}
      width={1000}
      footer={null}
    >
      <h1 className="section-title mb-2">Tambah Jabatan</h1>
      <p>Silahkan isi form dibawah ini untuk menambahkan data jabatan baru</p>
      <Form
        form={form}
        layout='horizontal'
        labelCol={{ span: 7 }}
        labelWrap
        labelAlign='left'
        size='large'
        style={{ margin: '2rem 0' }}
        onFinish={onFinish}
        initialValues={{
          kode_jabatan: initialKodeJabatan,
          nama_jabatan: "",
          keterangan: "",
        }}
      >
        <Form.Item
          label="Kode Jabatan"
          name="kode_jabatan"
          style={styles.formItemStyle}
        >
          <Input style={styles.inputStyle} disabled />
        </Form.Item>
        <Form.Item
          label="Nama Jabatan"
          name="nama_jabatan"
          style={styles.formItemStyle}
          rules={[
            {
              required: true,
              message: "Nama Jabatan tidak boleh kosong!"
            }
          ]}
        >
          <Input style={styles.inputStyle} placeholder='Sekretaris Dinas' />
        </Form.Item>
        <Form.Item
          label="Keterangan (Opsional)"
          name="keterangan"
          style={styles.formItemStyle} >
          <TextArea
            placeholder="Keterangan"
            style={styles.inputStyle}
            autoSize={{
              minRows: 3,
              maxRows: 4,
            }}
          />
        </Form.Item>
        <div className="flex justify-end items-end gap-3">
          <Button htmlType='submit' type='primary'>Simpan data</Button>
          <Button htmlType='reset' type='default' style={{ background: "#F0F5FD", fontWeight: 500 }}>Reset</Button>
        </div>
      </Form>
    </Modal >
  )
}

export default ModalAddJabatan