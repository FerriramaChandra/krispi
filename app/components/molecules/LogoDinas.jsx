'use client';
import React, { useRef, useState } from 'react'
import { EditOutlined } from '@ant-design/icons';
import { storage } from '@/app/Firebase/firebase';
import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useRouter } from 'next/navigation';
import { Image, Spin } from 'antd';

const LogoDinas = ({ profile }) => {
  const imageRef = useRef();
  const [loadingImage, setLoadingImage] = useState(false);
  const router = useRouter();

  const uploadImageHandler = async (e) => {
    setLoadingImage(true);
    const files = imageRef.current.files;
    const file = files[0];
    const fileRef = ref(storage, `profile-img/${uuidv4()}`);
    await uploadBytes(fileRef, file)
      .then((res) => {})
      .catch((err) => {
        setLoadingImage(false);
      })
      .then(() => {
        getDownloadURL(fileRef).then( async (url) => {
          const response = await fetch(`/api/profile/${profile.id}`, {
            method: "PATCH",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              logo: url
            }),
          });
          if (response.ok) {
            router.refresh();
          }
        });
        setLoadingImage(false);
      });
      imageRef.current.files = e.target.files;
      e.target.files = files;
  };

  return (
    <div className="logo-dinas">
      <h1 className='section-title'>Logo Dinas</h1>

      {loadingImage ? (
        <Spin size='large' className='my-12' />
      ) : (
        <Image src={profile.logo} width={250} height={250} alt="logo"/>
      )}

      <label className="flex items-center justify-center gap-2 px-4 py-2 text-white rounded-lg shadow-lg bg-primary cursor-pointer">
        <EditOutlined />
        <span className="text-sm">Ubah Logo</span>
        <input 
          type='file' 
          className="hidden"
          ref={imageRef}
          onChange={uploadImageHandler}
          required
          accept="png, jpg"
        />
      </label>
    </div>
  )
}

export default LogoDinas