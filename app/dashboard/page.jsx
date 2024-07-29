import React from "react";
import Image from "next/image";
import TitleBar from "../components/atoms/TitleBar";
import DashboardInfo from "../components/atoms/DashboardInfo";
import { db } from "../lib/db";
import { FaFileInvoice, FaUserTie } from "react-icons/fa";
import { PiToolboxFill } from "react-icons/pi";

const getPenduduk = async () => {
  const res = await db.penduduk.findMany();
  console.log(res);
  return res;
}

const Dashboard = async () => {
  const penduduk = await getPenduduk();

  return (
    <section id="dashboard">
      <TitleBar title={"Dashboard"} />
      <div className="flex items-center justify-between my-6 gap-4 flex-wrap w-full">
        <DashboardInfo title={"Total Pegawai"} value={penduduk.length} icon={<FaUserTie size={50} />} />
        <DashboardInfo title={"Total Jabatan"} value={2} icon={<PiToolboxFill size={60} />} />
        <DashboardInfo title={"Total Kehadiran"} value={3} icon={<FaFileInvoice size={50} />} />
      </div>
      <div className="bg-[#F9F9F9] p-8 text-center rounded-lg shadow-md shadow-gray-300">
        <div className="my-10">
          <h1 className="font-semibold text-xl md:text-2xl xl:text-3xl my-4">SELAMAT DATANG</h1>
          <h2 className="text-lg md:text-xl xl:text-2xl leading-8">DUKCAPIL KOTA PALU</h2>
          <Image src="/logo.png" width={250} height={250} className="object-contain mx-auto my-5" alt="logo" />
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
