'use client';
import { LoadingOutlined } from '@ant-design/icons';
import { Popconfirm, Spin } from 'antd';
import { useRouter } from 'next/navigation';
import React from 'react'
import Swal from 'sweetalert2';

const ListAvatar = ({session, listAvatars}) => {
  const router = useRouter();

  const handleUpdateAvatar = async (url) => {
    // message.info(url)
    try {
      const response = await fetch(`/api/user/${session?.user?.id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          foto: url,
        }),
      });
      if (response.ok) {
        await Swal.fire("Success", "Avatar Berhasil Diupdate!", "success");
        router.refresh();
      } else {
        await Swal.fire("Oops", "Terjadi Kesalahan", "error");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      {
        listAvatars?.length == 0 ? (
          <div className='flex justify-center my-32'>
            <Spin indicator={<LoadingOutlined style={{ fontSize: 86 }} spin />} />
          </div>
        ) : (
          <div className='flex flex-wrap gap-x-24 gap-y-8 my-8 justify-center'>
            {listAvatars?.map((avatar, i) => (
              <Popconfirm
                key={avatar.id}
                title="Ubah Avatar"
                description="Apakah anda yakin ingin mengubah avatar ?"
                okText="Ya"
                cancelText="Batal"
                placement='bottom'
                onConfirm={() => handleUpdateAvatar(avatar?.url)}
              >
                <img src={avatar?.url} width={90} className='rounded-full cursor-pointer border-white border-2' key={i} alt='avatar'/>
              </Popconfirm>
            ))}
          </div>
        )
      }
    </>
  )

}

export default ListAvatar