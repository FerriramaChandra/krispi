'use client';
import React, { useState } from "react";
import Swal from "sweetalert2";
import { Button, Form, Input, Radio } from "antd";
import { useRouter } from "next/navigation";

const FormEditProfile = ({session}) => {
  const [status, setStatus] = useState("");
  const router = useRouter();

  const styles = {
    inputStyle: {
      fontWeight: "500",
      color: "black",
      fontFamily: "montserrat",
      width: "95%",
      border: "1px solid black",
      fontSize: "14px",
    },
    formItemStyle: {
      marginBottom: "2.5rem",
      fontWeight: "600",
    },
  };

  const onFinish = async (values) => {
    // console.log(values)
    try {
      const response = await fetch(`/api/user/${session?.user?.id}`, {
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
        await Swal.fire("Success", "Data Pengguna Berhasil Diupdate!", "success");
        router.refresh();
      } else {
        await Swal.fire("Oops", "Something Went Wrong", "error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };
  
  return (
    <Form
      layout="horizontal"
      labelCol={{ span: 6 }}
      labelWrap
      initialValues={{
        name: session?.user?.name,
        username: session?.user?.username,
        email: session?.user?.email,
        status: session?.user?.status,
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
        <Input style={styles.inputStyle}/>
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
        <Input style={styles.inputStyle}/>
      </Form.Item>
      <Form.Item 
        label="Status" 
        name="status" 
        style={styles.formItemStyle}
      >
        <Radio.Group onChange={handleStatusChange} >
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
  )
}

export default FormEditProfile