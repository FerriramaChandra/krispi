import React, { useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js';

const FaceDetection = ({ webcamRef }) => {
  const canvasRef = useRef(null);

  

  return <div ref={canvasRef} />;
};

export default FaceDetection;
