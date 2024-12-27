import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [danmakuList, setDanmakuList] = useState<any[]>([]);
  const [activeDanmaku, setActiveDanmaku] = useState<any[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);


  // 添加播放控制函数
  const togglePlay = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isPlaying; // 切换静音状态
      if (!isPlaying) {
        videoRef.current.play(); // 播放视频
      }
      setIsPlaying(!isPlaying);
    }
  };

  // 播放视频到canvas
  useEffect(() => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      videoRef.current.loop = true;
      videoRef.current.play();

      // 设置canvas的宽高与视频一致
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;

      const draw = () => {
        if (context && videoRef.current && canvasRef.current) {
          context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
        }
        requestAnimationFrame(draw);
      };

      draw();
    }
  }, []);

  // 动画结束后清理弹幕
  const handleAnimationEnd = (id: number) => {
    setActiveDanmaku((prev) => prev.filter((item) => item.id !== id));
  };

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
      
      <canvas ref={canvasRef} style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "100%", height: "100%" }} />
      <video ref={videoRef} src="https://jumpheart.oss-cn-heyuan.aliyuncs.com/video.mp4" muted crossOrigin="anonymous" style={{ display: "none" }} />

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
