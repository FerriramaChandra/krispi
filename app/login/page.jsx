import React from "react";
import FormLogin from "../components/organisms/FormLogin";

export const metadata = {
  title: "Login Page",
  description: "Absensi Pegawai Menggunakan Face Recognition",
};

const Login = async () => {

  return (
    <div id="login" className="h-[100dvh] flex flex-col justify-center items-center">
      <div className="flex flex-col items-center justify-center">
        <h1 className="login-header_title my-4">DINAS DUKCAPIL KOTA PALU</h1>
        <img src="/logo.png" alt="logo" className="login-header_img my-2" />
      </div>
      <FormLogin />
    </div>
  );
};

export default Login;
