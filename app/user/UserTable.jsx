'use client';
import React, { Suspense, useState } from 'react'
import { Select, Input, Table, Button } from "antd"
import { showEntriesOption } from "../constant/index"
import { RiDeleteBin6Line } from 'react-icons/ri'
import { PlusOutlined } from '@ant-design/icons'
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import ModalAddUser from './ModalAddUser';
import EditUser from './EditUser';
import Loading from './loading';

const { Search } = Input;

const UserTable = ({users}) => {
  const router = useRouter();

  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [filteredUser, setFilteredUser] = useState("");

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const dataSource = users.map((user, i) => ({
    key: i,
    no: `${i + 1}`,
    id: user.id,
    name: user.name,
    username: user.username,
    email: user.email,
    password: user.password,
    status: user.status,
    createdAt: format(new Date(user.createdAt),("dd-MM-yyyy"))
  }))

  const columnsUsers = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
      align: "center",
      // width: 100,
      responsive: ["md"],
    },
    {
      title: "Nama Lengkap",
      dataIndex: "name",
      align: "center",
      key: "name",
    },
    {
      title: "Username",
      dataIndex: "username",
      align: "center",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "center",
      responsive: ["md"],
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center",
      responsive: ["lg"],
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      responsive: ["lg"],
    },
    {
      title: "Aksi",
      fixed: "right",
      dataIndex: "aksi",
      align: "center",
      key: "aksi",
      width: 100,
      render: (_, record) => (
        <div className="flex justify-center items-center gap-2">
          <EditUser user={record}/>
          <RiDeleteBin6Line color="#DC3545" size={25} style={{ cursor: "pointer" }} onClick={() => handleDeleteUser(record.id)}/>
        </div>
      ),
    },
  ];

  const handleDeleteUser = async (userId) => {
    await Swal.fire({
      title: 'Are you sure want to delete?',
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: 'Delete',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await fetch(`/api/user/${userId}`, {
          method: "DELETE",
          cache: 'no-store',
          next: {
            revalidate: 10
          }
        })
        await Swal.fire('User Deleted!', '', 'success')
        router.refresh();
      }
    })
  }

  const onSearch = (value) => {
    const filterUser = users.filter(user => user.name.toLowerCase().includes(value.toLowerCase()))
    setFilteredUser(filterUser.map((user, i) => ({
     no: `${i + 1}`,
     id: user.id,
     name: user.name,
     username: user.username,
     email: user.email,
     password: user.password,
     status: user.status,
     createdAt: format(new Date(user.createdAt),("dd-MM-yyyy"))
   })))
  }

  return (
    <div className="user">
      <div className='flex justify-between items-center flex-wrap gap-4'>
        <h1 className="section-title">Daftar Pengguna</h1>
        <Button icon={<PlusOutlined />} type='primary' size='large' onClick={() => setOpenModalAdd(true)}>Tambah Pengguna</Button>
      </div>

      <div className='flex flex-wrap gap-4 justify-between items-center my-10'>
        <div>Show 
        <Select
          defaultValue="10"
          style={{
            width: 60,
            margin: "0 10px"
          }}
          onChange={handleChange}
          options={showEntriesOption}
        />
          Entries  
        </div>
        <Search
          placeholder="Cari Pengguna"
          allowClear
          enterButton
          size="large"
          onSearch={onSearch}
          style={{width: "280px"}}
        />
      </div>
      
      {/* <Suspense fallback={<Loading />}> */}
        <Table
          columns={columnsUsers}
          dataSource={filteredUser ? filteredUser : dataSource}
          bordered 
          // pagination={{
          //   pageSize: 10,
          // }}
          // tableLayout='auto'
          // scroll={{x: "100vw"}}
          // style={{border: "1px solid red"}}
        />
      {/* </Suspense> */}

      <ModalAddUser open={openModalAdd} setOpen={setOpenModalAdd}/>  
    </div>
  )
}

export default UserTable