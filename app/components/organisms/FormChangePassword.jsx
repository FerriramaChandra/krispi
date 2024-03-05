'use client'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { useRouter } from 'next/navigation';
import React from 'react'
import Swal from 'sweetalert2';

const FormChangePassword = ({session}) => {
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
      const response = await fetch(`/api/user/${session?.user?.id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          passwordLama: values.passwordLama,
          passwordBaru: values.passwordBaru,
        }),
      });
      if (response.ok) {
        console.log(response);
        await Swal.fire("Success", "Password Berhasil Diubah!", "success");
        router.refresh();
      } else if (response.status == 409) {
        await Swal.fire("Oops", "Password Lama Tidak Sesuai!", "error");
      } else {
        await Swal.fire("Oops", "Something Went Wrong", "error");
      }
    } catch (error) {
      console.log(error);
    }

    console.log(values);
  };

  return (
    <Form
      layout="horizontal"
      labelCol={{ span: 6 }}
      labelWrap
      // wrapperCol={{span: 10}}
      labelAlign="left"
      size="large"
      style={{ margin: "2rem 0" }}
      onFinish={onFinish}
    >
      <Form.Item
        label="Password Lama"
        name="passwordLama"
        style={styles.formItemStyle}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Password Lama harus diisi !",
          },
        ]}
      >
        <Input.Password placeholder="Password Lama" style={styles.inputStyle} iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}/>
      </Form.Item>
      
      <Form.Item
        label="Password"
        name="passwordBaru"
        style={styles.formItemStyle}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Password Baru harus diisi!",
          },
        ]}
      >
        <Input.Password placeholder="Password Baru" style={styles.inputStyle} iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
      </Form.Item>

      <Form.Item
        label="Confirm Password"
        name="confirm"
        dependencies={["passwordBaru"]}
        hasFeedback
        style={styles.formItemStyle}
        rules={[
          {
            required: true,
            message: "Confirm Password harus diisi !",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("passwordBaru") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Password baru yang anda masukkan tidak sesuai!"));
            },
          }),
        ]}
      >
        <Input.Password placeholder="Confirm Password" style={styles.inputStyle} iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
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

export default FormChangePassword