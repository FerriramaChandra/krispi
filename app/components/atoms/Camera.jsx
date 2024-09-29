'use client';
import uploadToCloudinary, { uploadImageHandler } from '@/app/lib/uploadImage';
import { Button, message } from 'antd';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Webcam from 'react-webcam';
import * as faceapi from 'face-api.js';

const Camera = ({ nama, idPenduduk }) => {
  let continueDetecting = true;
  const [messageApi, contextHolder] = message.useMessage();
  const canvasRef = useRef(null);
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [warningMessage, setWarningMessage] = useState(true);
  const [webcamEnabled, setWebcamEnabled] = useState(false)
  const router = useRouter();

  useEffect(() => {
    loadModels();
    detectFace();
  }, [])

  const loadModels = async () => {
    await faceapi.nets.mtcnn.loadFromUri('/models');
    await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
  };

  const eyeThreshold = 12;
  const mouthThreshold = 30;

  const detectFace = async () => {
    if (!continueDetecting) return;
    if (webcamRef.current && webcamRef.current.video.readyState === 4) {
      const video = webcamRef.current.video;

      const detections = await faceapi
        .detectSingleFace(video, new faceapi.MtcnnOptions())
        .withFaceLandmarks()


      console.log(detections);

      if (detections) {
        const leftEye = detections.landmarks.getLeftEye();
        const rightEye = detections.landmarks.getRightEye();
        const mouth = detections.landmarks.getMouth();
        const landmarks = detections.landmarks;

        console.log(landmarks);

        // Mendapatkan titik landmark kelopak mata
        const upperLeftEyelid = leftEye[1]; // Poin atas pada kelopak mata kiri
        const lowerLeftEyelid = leftEye[4]; // Poin bawah pada kelopak mata kiri
        const upperRightEyelid = rightEye[1]; // Poin atas pada kelopak mata kanan
        const lowerRightEyelid = rightEye[4]; // Poin bawah pada kelopak mata kanan

        // Mengukur jarak vertikal antara kelopak mata kiri
        const leftEyeVerticalDistance = lowerLeftEyelid.y - upperLeftEyelid.y;

        // Mengukur jarak vertikal antara kelopak mata kanan
        const rightEyeVerticalDistance = lowerRightEyelid.y - upperRightEyelid.y;

        // Menentukan apakah mata kiri dan mata kanan tertutup berdasarkan jarak vertikal
        const isLeftEyeClosed = leftEyeVerticalDistance < eyeThreshold;
        const isRightEyeClosed = rightEyeVerticalDistance < eyeThreshold;

        // Mengidentifikasi apakah setidaknya satu mata tertutup
        const areEyesClosed = isLeftEyeClosed || isRightEyeClosed;

        const topLip = mouth[14].y;
        const bottomLip = mouth[18].y;

        const mouthOpen = bottomLip - topLip > mouthThreshold;

        const headTilt = Math.abs(detections.landmarks.getLeftEye()[0].y - detections.landmarks.getRightEye()[0].y);

        // Calculate the head pose
        const noseTip = landmarks.positions[30];
        const leftEyeCorner = landmarks.positions[36];
        const rightEyeCorner = landmarks.positions[45];

        console.log("noseTip", noseTip);
        console.log("leftEyeCorner", leftEyeCorner);
        console.log("rightEyeCorner", rightEyeCorner);

        const noseToLeftEye = Math.sqrt(Math.pow(noseTip?.x - leftEyeCorner?.x, 2) + Math.pow(noseTip?.y - leftEyeCorner?.y, 2));
        const noseToRightEye = Math.sqrt(Math.pow(noseTip?.x - rightEyeCorner?.x, 2) + Math.pow(noseTip?.y - rightEyeCorner?.y, 2));

        const headPoseAngle = Math.abs(noseToLeftEye - noseToRightEye);

        console.log(headPoseAngle);
        // Determine if the head is facing the camera directly based on the head pose angle threshold
        const headFacingCamera = headPoseAngle < 30;

        console.log(`Head facing camera: ${headFacingCamera ? 'yes' : 'no'}`);

        canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(video);

        faceapi.matchDimensions(canvasRef.current, {
          width: 432,
          height: 324,
        })

        const resized = faceapi.resizeResults(detections, {
          width: 432,
          height: 324,
        })

        // console.log("detections", detections);
        // console.log("Are Mouth Open:", mouthOpen);
        // console.log("Left Eye Vertical Distance:", leftEyeVerticalDistance);
        // console.log("Right Eye Vertical Distance:", rightEyeVerticalDistance);
        // console.log("Are Eyes Closed:", areEyesClosed);

        const drawBox = new faceapi.draw.DrawBox(resized.detection.box);
        drawBox.draw(canvasRef.current ? canvasRef.current : { width: 1, height: 1 });

        const drawLandmarks = new faceapi.draw.DrawFaceLandmarks(resized.landmarks);
        drawLandmarks.draw(canvasRef.current);

        if(mouthOpen) {
          setWarningMessage('Harap Menutup Mulut');
        } else if (!headFacingCamera) {
          setWarningMessage("Harap Menghadap Kamera")
        } else if (areEyesClosed) {
          setWarningMessage("Harap Membuka Mata")
        } else {
          setWarningMessage(null);
        }
      } else {
        const canvas = canvasRef.current;
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
      }
    }
    setTimeout(detectFace, 1000);
  };

  if (webcamEnabled) {
    continueDetecting = true
    detectFace();
  };

  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Foto Berhasil Diupload!',
    });
    handleStopCamera();
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

  const retake = () => {
    setImgSrc(null);
  };

  const handleStopCamera = () => {
    setWebcamEnabled((prev) => !prev)
    setImgSrc(null)
  };

  const uploadPhoto = async () => {
    if (imgSrc) {
      const image = await uploadToCloudinary(imgSrc)
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
          <div className="my-8">
            {imgSrc ? (
              <img src={imgSrc} alt="webcam" />
            ) : (
              <>
              <h2 className='text-center text-lg font-semibold my-4 text-red-500'>{warningMessage}</h2>
              <div className="border-2 border-blue-500 relative rounded-md">
                <Webcam ref={webcamRef} mirrored={false} screenshotFormat='image/jpeg' screenshotQuality={1} />
                <canvas ref={canvasRef} width={432} height={324} />
              </div>
              </>
            )}
          </div>
        ) : (
          <div className='my-8 border-2 h-72 border-primary rounded-md'>
            <canvas ref={canvasRef} width={432} height={324} className='hidden' />
          </div>
        )
      }
      <div className='flex flex-row gap-2 justify-between'>
        { !imgSrc && webcamEnabled && <Button type='primary' className='flex-1' onClick={capture} disabled={warningMessage ? true : false} >Capture Photo</Button>}
        { imgSrc && <Button type='primary' className='flex-1' onClick={retake}>Retake Photo</Button>}

        {imgSrc && <Button type='default' className='flex-1 text-white' style={{ backgroundColor: "#87d068", color: "#fff" }} onClick={uploadPhoto}>Upload Photo</Button>}

        {
          webcamEnabled ? (
            <Button type='primary' danger className='flex-1 text-white' onClick={handleStopCamera}>Stop Camera</Button>
          ) : (
            <Button type='default' className='flex-1 text-white' style={{ backgroundColor: "#001f3f", color: "#fff" }} onClick={() => setWebcamEnabled((prev) => !prev)}>Start Camera</Button>
          )
        }
      </div>
    </>
  )
}

export default Camera