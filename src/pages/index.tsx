// @ts-nocheck
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // 添加播放控制函数
  const togglePlay = () => {
    if (videoRef.current) {
      videoRef.current.muted = isPlaying; // 切换静音状态
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.loop = true;
      videoRef.current.preload = "auto";
      videoRef.current.playsInline = true;
      videoRef.current.muted = true;
      videoRef.current.crossOrigin = "anonymous";
      videoRef.current.style.display = "block";
      videoRef.current.style.width = "100%";
      videoRef.current.style.height = "100%";
      videoRef.current.style.objectFit = "cover";
      

      videoRef.current.play();
    }
  }, []);

  // @ts-ignore
  return (
    <div
      id="gyroContain"
      style={{
        position: "relative",
      }}
    >
      <script src="https://res.wx.qq.com/open/js/jweixin-1.2.0.js" type="text/javascript" charSet="utf-8"></script>
      <script dangerouslySetInnerHTML={{__html: `
        document.addEventListener("WeixinJSBridgeReady", function() { 
          document.getElementById('video1').play(); 
        }, false);
        document.addEventListener("DOMContentLoaded", function() {
          document.getElementById('video1').muted = true;
          document.getElementById('video1').play();
        }, false);
        document.addEventListener("touchstart", function() {
          document.getElementById('video1').play();
        }, false);

      `}} />
      <div
        onClick={togglePlay}
        style={{
          position: "fixed",
          top: "10px",
          right: "20px",
          cursor: "pointer",
          zIndex: 1000,
          width: "30px",
          height: "30px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <img
          src={isPlaying ? "/pause.svg" : "/play.svg"}
          alt={isPlaying ? "暂停" : "播放"}
          width="24"
          height="24"
        />
      </div>

      <video ref={videoRef}
        id="video1"
        muted 
        crossOrigin="anonymous"
        style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }}
        preload="auto"
        webkit-playsinline="true"
        x-webkit-airplay="true"
        loop
        playsinline="true"
        x5-video-player-type="h5"
        x5-video-orientation="h5"
        x5-video-player-fullscreen="true"
        
        autoPlay 
        
        x5-playsinline
        >
        <source src="https://img.heimao.icu/RickRoll" type="video/mp4" />
      </video>

      <style jsx global>{`
        @media screen and (orientation: portrait) {
          html {
            width: 100vmin;
            height: 100vmax;
          }
          body {
            width: 100vmin;
            height: 100vmax;
            margin: 0;
            padding: 0;
          }
          #gyroContain {
            width: 100vmax;
            height: 100vmin;
            transform-origin: top left;
            transform: rotate(90deg) translateY(-100vmin);
          }
        }
        
        @media screen and (orientation: landscape) {
          html {
            width: 100vmax;
            height: 100vmin;
          }
          body {
            width: 100vmax;
            height: 100vmin;
            margin: 0;
            padding: 0;
          }
          #gyroContain {
            width: 100vmax;
            height: 100vmin;
          }
        }
      `}</style>
    </div>
  );
}
