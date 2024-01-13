import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { BrowserRouter, Route, Routes, Link, NavLink, useNavigate  } from 'react-router-dom';
import  Unauthorized  from './Unauthorized'
import 'react-toastify/dist/ReactToastify.css';
import "./KnowCustomer.css"

const KnowCustomer = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const audioRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [videpRecording, setVideoRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [imageData, setImageData] = useState(null); 
  const [isAuthorized, setIsAuthorized] = useState(localStorage.getItem("jwtToken") !== null );


  const captureImage = () => {
    
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (video && canvas) {
      const context = canvas.getContext('2d');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      

      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      const newImageData = canvas.toDataURL('image/png');
      setImageData(newImageData); 
      const imageElement = new Image();
      imageElement.src = newImageData;
      toast.success("Image Captured")
    }
  
  };


  const startRecording = () => {
    const mediaStreamConstraints = { audio: true };

    navigator.mediaDevices
      .getUserMedia(mediaStreamConstraints)
      .then((stream) => {
        audioRef.current.srcObject = stream;
        const mediaRecorder = new MediaRecorder(stream);
        const chunks = [];

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            chunks.push(event.data);
          }
        };

        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(chunks, { type: 'audio/wav' });
          setAudioBlob(audioBlob);
        };

        mediaRecorder.start();
        setRecording(true);

        setTimeout(() => {
          mediaRecorder.stop();
          setRecording(false);
        }, 3000); 
      })
      .catch((error) => {
        console.error('Error accessing microphone:', error);
      });
  };

  const startVideoRecording = () => {
    const mediaStreamConstraints = { video: true };

    navigator.mediaDevices
      .getUserMedia(mediaStreamConstraints)
      .then((stream) => {
        videoRef.current.srcObject = stream;
        setVideoRecording(true);

        setTimeout(() => {
          stopVideoRecording(stream);
        }, 10000);
      })
      .catch((error) => {
        console.error('Error accessing camera:', error);
      });
  };

  const stopVideoRecording = (stream) => {
    const canvas = canvasRef.current;

  // videoRef.current.srcObject = null;
  // stream.getTracks().forEach((track) => track.stop());
  setVideoRecording(false);

  // canvas.style.display = canvasStyle;
  };

  const stopRecording = () => {
    audioRef.current.srcObject.getTracks().forEach((track) => track.stop());
  };

  const sendAudioToServer = async () => {
    console.log('imageData to post::: ', imageData);
    if (audioBlob && imageData) {
      const formData = new FormData();
      formData.append('image', imageData);
      formData.append('audio', audioBlob, 'recorded-audio.wav');

      try {
        const response = await axios.post('http://localhost:4100/api/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        console.log(response.data);
        toast.success("Congratulations... We successfully received your KYC, Our AI will verify and keeps you notified")
        setTimeout(() => {
          navigate('/pagination')
        }, 2000)
      } catch (error) {
        toast.error("You are not authenticated buddy")
        console.error('Error sending audio to server:', error);
      }
    }
  };

  const setupCameraAndAudio = async () => {
    try {
      if(isAuthorized) {
      const videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
      const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });

      videoRef.current.srcObject = videoStream;
      audioRef.current.srcObject = audioStream;
      } else {
        toast.error("You are not authenticated buddy")
      }
    } catch (error) {
      console.error('Error accessing camera or microphone:', error);
    }
  };

  useEffect(() => {
    setupCameraAndAudio();
  }, [isAuthorized]);

  if(!localStorage.getItem("jwtToken")) {
   return <Unauthorized />
   
  } else {

  return (
    <>
    <div className="canvas-container">
    <video ref={videoRef} autoPlay playsInline muted className="media-element" />
    <canvas ref={canvasRef} className="media-element" style={{ display: 'none' }} />
    <audio ref={audioRef} controls className="media-element" />
    <button className="action-button" onClick={captureImage}>Capture Image</button>
    <button className="action-button" onClick={startVideoRecording}>Start Recording Video</button>
    {videpRecording && (
          <button className="action-button" onClick={() => stopVideoRecording(videoRef.current.srcObject)}>
            Stop Recording Video
          </button>
        )}
    <button className="action-button" onClick={recording ? stopRecording : startRecording}>
      {recording ? 'Stop Recording Audio' : 'Start Recording Audio'}
    </button>
    <button className="submit-button" onClick={sendAudioToServer} disabled={!audioBlob}>
      Verify
    </button>
  </div>
  </>
  );
};
}

export default KnowCustomer;
