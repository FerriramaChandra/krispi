'use client';
import { Button, message } from 'antd';
import React, { useCallback, useRef, useState } from 'react'
import Webcam from 'react-webcam';

const Camera = ({ nama }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [namaPegawai, setNamaPegawai] = useState(nama);
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [webcamEnabled, setWebcamEnabled] = useState(true)

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
  console.log(webcamEnabled);

  const stop = () => {
    let stream = Webcam.video.srcObject;
    const tracks = stream.getTracks();

    tracks.forEach(track => track.stop());
    this.webcam.video.srcObject = null;
  };

  const uploadPhoto = async () => {
    if (imgSrc) {
      // Convert base64 image data to a blob
      // const blob = await fetch(imgSrc).then((res) => res.blob());

      // console.log(blob);

      // Create a FormData object and append the blob
      const formData = new FormData();
      formData.append('photo', imgSrc);
      formData.append('name', namaPegawai)

      // Use fetch to send the FormData to your API endpoint
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      console.log("response", response);
      if (response.ok) {
        success();
      } else {
        error();
      }
      // Optionally, you can reset the image source after uploading
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