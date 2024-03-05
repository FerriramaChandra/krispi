"use client";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Form, Input, Modal } from "antd";
const { TextArea } = Input;
import { useRouter } from "next/navigation";
import React from "react";
import Swal from "sweetalert2";

const ModalAddUser = ({ open, setOpen }) => {

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

  const router = useRouter();

  const onFinish = async (values) => {
    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          username: values.username,
          email: values.email,
          password: values.password,
        }),
      });
      if (response.ok) {
        console.log(response);
        await Swal.fire("Success", "Pengguna Baru Berhasil Ditambahkan!", "success");
        router.refresh();
        setOpen(false);
      } else if (response.status == 409) {
        console.log(response)
        await Swal.fire("Oops", "Username already exists!", "error");
      } else {
        console.log(response)
        await Swal.fire("Oops", "Something Went Wrong", "error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      // title="Tambah Pengguna"
      centered
      styles={{ padding: "50px" }}
      open={open}
      onCancel={() => setOpen(false)}
      width={1000}
      footer={null}
    >
      <h1 className="section-title mb-2">Tambah Pengguna</h1>
      <p>Silahkan isi form dibawah ini untuk menambahkan pengguna baru</p>
      <Form
        layout="horizontal"
        labelCol={{ span: 5 }}
        labelWrap
        // wrapperCol={{span: 10}}
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
          <Input style={styles.inputStyle} placeholder="Nama Anda" />
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
          <Input style={styles.inputStyle} placeholder="username" />
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
          <Input style={styles.inputStyle} placeholder="E-mail" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          style={styles.formItemStyle}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Password tidak boleh kosong!",
            },
          ]}
        >
          <Input.Password placeholder="Password" style={styles.inputStyle} iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
        </Form.Item>
        <Form.Item
          label="Confirm Password"
          name="confirm"
          dependencies={["password"]}
          hasFeedback
          style={styles.formItemStyle}
          rules={[
            {
              required: true,
              message: "Confirm Password tidak boleh kosong!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("The new password that you entered do not match!"));
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirm Password" style={styles.inputStyle} iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
        </Form.Item>
        <div className="flex justify-end items-end gap-3">
          <Button htmlType="reset" type="default" style={{ background: "#F0F5FD", fontWeight: 500 }}>
            Reset
          </Button>
          <Button htmlType="submit" type="primary">
            Simpan data
          </Button>
        </div>
      </Form>
    </Modal>
  )
}

export default ModalAddUser