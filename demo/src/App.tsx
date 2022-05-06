import { useEffect, useState } from 'react';
import './app.css';

function App() {

  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isMicrophoneOn, setIsMicrophoneOn] = useState(false);

  const enableCamera = async () => {
    const mediaStream = await navigator.mediaDevices.getUserMedia({
      video: true
    });
    const videoElement = document.querySelector('video');
    if (!videoElement) return;
    videoElement.srcObject = mediaStream;
  };
  const enableMicrophone = async () => {
    const mediaStream = await navigator.mediaDevices.getUserMedia({
      audio: true
    });
    const videoElement = document.querySelector('video');
    if (!videoElement) return;
    videoElement.srcObject = mediaStream;
    console.log('mediaStream', mediaStream);
  };

  const download = (url: string) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = 'photo';
    a.click();
    a.remove();
  };

  const onSave = () => {
    const canvas = document.createElement('canvas');
    const videoPlay = document.querySelector('#video-play');
    const ctx = canvas.getContext('2d');
    canvas.width = 200;
    canvas.height = 200;
    ctx?.drawImage(videoPlay as HTMLVideoElement, 0, 0, canvas.width, canvas.height);
    download(canvas.toDataURL());
  };

  useEffect(() => {
    if (isCameraOn) enableCamera();
  }, [isCameraOn]);

  useEffect(() => {
    if (isMicrophoneOn) enableMicrophone();
  }, [isMicrophoneOn]);

  return (
    <div className="app">
      <h1>webRTC demo</h1>
      <div className="video-container">
        <video playsInline autoPlay width={500} id="video-play"/>
      </div>
      <div className="buttons">
        <button onClick={() => setIsCameraOn(!isCameraOn)}>
          {isCameraOn ? '关闭' : '开启'}摄像头
        </button>
        <button onClick={() => setIsMicrophoneOn(!isMicrophoneOn)}>
          {isMicrophoneOn ? '关闭' : '开启'}麦克风
        </button>
        <button onClick={onSave}>
          保存
        </button>
      </div>
    </div>
  );
}

export default App;
