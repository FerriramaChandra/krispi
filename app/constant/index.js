import { BiSolidDashboard } from "react-icons/bi";
import { PiToolboxFill } from "react-icons/pi";
import { FaUser, FaUsers } from "react-icons/fa";
import { AiFillFolderOpen } from "react-icons/ai";
import { BsFillFileEarmarkTextFill } from "react-icons/bs";
import { HiBuildingOffice2 } from "react-icons/hi2";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";

export const sidebarMenus = [
  {
    name: "Dashboard",
    link: "/dashboard",
    icon: BiSolidDashboard,
  },
  {
    name: "Data Jabatan",
    link: "/jabatan",
    icon: PiToolboxFill,
  },
  {
    name: "Data Penduduk",
    link: "/pegawai",
    icon: FaUser,
  },
  {
    name: "Data Kehadiran",
    link: "/kehadiran",
    icon: BsFillFileEarmarkTextFill,
  },
  {
    name: "Rekap Absensi",
    link: "/laporan",
    icon: AiFillFolderOpen,
  },
  {
    name: "Manajemen Pengguna",
    link: "/user",
    icon: FaUsers,
  },
  {
    name: "Profil Dinas",
    link: "/profil-dinas",
    icon: HiBuildingOffice2,
  },
];

export const dataPangkat = [
  {
    value: '-- Pilih Pangkat --"',
    label: '-- Pilih Pangkat --"',
    disabled: true,
  },
  {
    value: 'Pembina Madya - IV/d',
    label: 'Pembina Madya - IV/d',
  },
  {
    value: 'Pembina Utama Muda - IV/c',
    label: 'Pembina Utama Muda - IV/c',
  },
  {
    value: 'Pembina Tkt. I - IV/b',
    label: 'Pembina Tkt. I - IV/b',
  },
  {
    value: 'Pembina - IV/a',
    label: 'Pembina - IV/a',
  },
  {
    value: 'Penata Tkt. I - III/d',
    label: 'Penata Tkt. I - III/d',
  },
  {
    value: 'Penata - III/c',
    label: 'Penata - III/c',
  },
  {
    value: 'Penata Muda Tkt. I - III/b',
    label: 'Penata Muda Tkt. I - III/b',
  },
  {
    value: 'Penata Muda - III/a',
    label: 'Penata Muda - III/a',
  },
  {
    value: 'Pengatur Tkt. I - II/d',
    label: 'Pengatur Tkt. I - II/d',
  },
  {
    value: 'Pengatur - II/c',
    label: 'Pengatur - II/c',
  },
  {
    value: 'Pengatur Muda Tkt. I - II/b',
    label: 'Pengatur Muda Tkt. I - II/b',
  },
  {
    value: 'Pengatur Muda - II/a',
    label: 'Pengatur Muda - II/a',
  },
  {
    value: 'Juru Tkt. I - I/d',
    label: 'Juru Tkt. I - I/d',
  },
  {
    value: 'Juru - I/c',
    label: 'Juru - I/c',
  },
  {
    value: 'Juru Muda Tkt. I - I/b',
    label: 'Juru Muda Tkt. I - I/b',
  },
  {
    value: 'Juru Muda - I/a',
    label: 'Juru Muda - I/a',
  },
]

export const showEntriesOption = [
  {
    value: "6",
    label: "6",
  },
  {
    value: "7",
    label: "7",
  },
  {
    value: "8",
    label: "8",
  },
  {
    value: "9",
    label: "9",
  },
  {
    value: "10",
    label: "10",
  },
];
