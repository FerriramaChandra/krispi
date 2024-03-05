'use client';
import React, { useState } from 'react'
import { Button, Form, Input, Radio, Modal} from "antd";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const ModalEditUser = ({open, setOpen, user}) => {
  const [form] = Form.useForm();
  const router = useRouter();
  const [status, setStatus] = useState(user?.status);

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
  };

  const onFinish = async (values) => {
    try {
      const response = await fetch(`/api/user/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          username: values.username,
          email: values.email,
          status: values.status,
        }),
      });
      if (response.ok) {
        console.log(response);
        await Swal.fire("Success", "Data Pengguna Berhasil Diupdate!", "success");
        router.refresh();
        setOpen(false);
      } else {
        await Swal.fire("Oops", "Terjadi Kesalahan", "error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleCancel = () => {
    setOpen(false);
  }
  
  return (
    <Modal
    centered
    styles={{padding: "50px"}}
    open={open}
    onCancel={handleCancel}
    width={1000}
    footer={null}
    >
      <h1 className="section-title">Edit Pengguna</h1>
      <p>Silahkan isi form dibawah ini untuk mengedit data pengguna</p>
      <Form
        form={form}
        layout="horizontal"
        labelCol={{ span: 6 }}
        labelWrap
        initialValues={{
          name: user?.name,
          username: user?.username,
          email: user?.email,
          status: user?.status,
        }}
        labelAlign="left"
        size="large"
        style={{ margin: "2rem 0" }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Nama Lengkap"
          name="name"
          style={styles.formItemStyle}
          rules={[
            {
              required: true,
              message: "Nama tidak boleh kosong!",
            },
          ]}
        >
          <Input style={styles.inputStyle}/>
        </Form.Item>
        <Form.Item
          label="Username"
          name="username"
          style={styles.formItemStyle}
          rules={[
            {
              required: true,
              message: "Username tidak boleh kosong!",
            },
          ]}
        >
          <Input style={styles.inputStyle} />
        </Form.Item>
        <Form.Item
          label="E-mail"
          name="email"
          style={styles.formItemStyle}
          rules={[
            {
              type: "email",
              message: "Format Email tidak valid!",
            },
            {
              required: true,
              message: "E-mail tidak boleh kosong!",
            },
          ]}
        >
          <Input style={styles.inputStyle} />
        </Form.Item>
        <Form.Item 
          label="Status" 
          name="status" 
          style={styles.formItemStyle}
        >
          <Radio.Group onChange={handleStatusChange} value={status} defaultValue={status}>
            <Radio value={"Aktif"}>Aktif</Radio>
            <Radio value={"Nonaktif"}>Nonaktif</Radio>
          </Radio.Group>
        </Form.Item>
        <div className="flex justify-end items-end gap-3">
          <Button htmlType="submit" type="primary">
            Simpan data
          </Button>
          <Button htmlType="reset" type="default" style={{ background: "#F0F5FD", fontWeight: 500 }}>
            Reset
          </Button>
        </div>
      </Form>
    </Modal>
  )
}

export default ModalEditUser