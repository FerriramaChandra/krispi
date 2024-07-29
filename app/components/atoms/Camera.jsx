'use client';
import uploadToCloudinary, { uploadImageHandler } from '@/app/lib/uploadImage';
import { Button, message } from 'antd';
import { useRouter } from 'next/navigation';
import React, { useCallback, useRef, useState } from 'react'
import Webcam from 'react-webcam';

const Camera = ({ nama, idPenduduk }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [webcamEnabled, setWebcamEnabled] = useState(true)
  const router = useRouter();

  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Foto Berhasil Diupload!',
    });
  };

  const error = () => {
    messageApi.open({
      type: 'error',
      content: 'Gagal Mengupload Foto!',
    });
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef]);

  // console.log(namaPegawai.toLowerCase().replace(/\s/g, ''))

  const retake = () => {
    setImgSrc(null);
  };

  console.log(imgSrc);

  const stop = () => {
    let stream = Webcam.video.srcObject;
    const tracks = stream.getTracks();

    tracks.forEach(track => track.stop());
    this.webcam.video.srcObject = null;
  };

  const uploadPhoto = async () => {
    if (imgSrc) {

      const image = await uploadToCloudinary(imgSrc)

      console.log(image.secure_url)

      try {
        const response = await fetch(`api/penduduk/${idPenduduk}`, {
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            foto: image.secure_url
          })
        })

        if (response.ok) {
          success();
          router.refresh()
        } else {
          error();
        }
      } catch (error) {
        console.log(error)
      }

      setImgSrc(null);
    }
  };

  return (
    <>
      {contextHolder}
      {
        webcamEnabled ? (
          <div className="my-12 border-2 border-primary">
            {imgSrc ? (
              <img src={imgSrc} alt="webcam" />
            ) : (
              <Webcam ref={webcamRef} mirrored={true} screenshotFormat='image/jpeg' screenshotQuality={1} />
            )}
          </div>
        ) : (
          <div className='my-12 border-2 h-64 border-primary'>

          </div>
        )
      }
      <div className='flex flex-row gap-2 justify-between'>
        {imgSrc ? (
          <Button type='primary' className='flex-1' onClick={retake}>Retake Photo</Button>
        ) : (
          <Button type='primary' className='flex-1' onClick={capture}>Capture Photo</Button>
        )}
        <Button type='default' className='flex-1 text-white' style={{ backgroundColor: "#87d068", color: "#fff" }} onClick={uploadPhoto}>Upload Photo</Button>
        {
          webcamEnabled ? (
            <Button type='primary' danger className='flex-1 text-white' onClick={() => setWebcamEnabled((prev) => !prev)}>Stop Camera</Button>
          ) : (
            <Button type='default' className='flex-1 text-white' style={{ backgroundColor: "#001f3f", color: "#fff" }} onClick={() => setWebcamEnabled((prev) => !prev)}>Start Camera</Button>
          )
        }

      </div>
    </>
  )
}

export default Camera