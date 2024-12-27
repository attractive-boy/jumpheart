import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // 添加播放控制函数
  const togglePlay = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isPlaying; // 切换静音状态
      setIsPlaying(!isPlaying);
    }
  };

  // 播放视频到canvas
  useEffect(() => {
    try {
      if (videoRef.current) {
        videoRef.current.loop = true;
        videoRef.current.play();
      }
    } catch (error) {
      alert(error);
    }
  }, []);

  return (
    <div
      id="gyroContain"
      style={{
        position: "relative",

      }}
    >
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
          alignItems: "center",
        }}
      >
        <img
          src={isPlaying ? "/pause.svg" : "/play.svg"}
          alt={isPlaying ? "暂停" : "播放"}
          width="24"
          height="24"
        />
      </div>

      <video ref={videoRef} src="https://heartoss.xn--vuqw0e54ixuh2wab7xjjnvyb7x0m.online/video.mp4" muted crossOrigin="anonymous" style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }} preload="auto" loop playsInline autoPlay />

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
