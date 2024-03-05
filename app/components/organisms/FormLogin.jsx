"use client";
import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const FormLogin = () => {
  const router = useRouter();

  const onFinish = async (values) => {
    const signInData = await signIn("credentials", {
      username: values.username,
      password: values.password,
      redirect: false,
    });
    if (signInData.error) {
      console.log(signInData)
      await Swal.fire("Oops", "Username atau password salah!", "error");
    } else {
      console.log(signInData)
      await Swal.fire("Success", "Login Berhasil!", "success");
      router.push("/dashboard");
      router.refresh();
    }
  };

  return (
    <div className="flex justify-evenly">
      <Form
        name="normal_login"
        autoComplete="on"
        className=""
        layout="vertical"
        initialValues={{
          remember: false,
        }}
        onFinish={onFinish}
        style={{ padding: "1.3rem" }}
        size="large"
      >
        <h1 className="mb-4 text-lg font-semibold">Login</h1>
        <Form.Item
          label="Username"
          style={{ fontWeight: "500" }}
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          style={{ fontWeight: "500" }}
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
        </Form.Item>

        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button w-full"
            style={{ color: "#fff", background: "#006400", borderColor: "#006400", height: "3rem" }}>
            Log in
          </Button>
        </Form.Item>
      </Form>
      <div className="flex items-center">
        <Form >
          <Form.Item>
            <Link href={"/presensi"}>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                style={{ color: "#FFF", background: "#001f3f", borderColor: "#001f3f", height: "3rem", width: "16rem" }}>
                Pengenalan Wajah
              </Button>
            </Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default FormLogin;
