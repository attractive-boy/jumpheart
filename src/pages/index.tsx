import { useState, useEffect, useRef } from "react";

export default function Home() {
  
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);


  // 添加播放控制函数
  const togglePlay = () => {
    if (videoRef.current) {
      if (!isPlaying) {
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
        setIsPlaying(true); // 更新播放状态
      }
    }
  };


  return (
    <div
      id="gyroContain"
      onClick={togglePlay}
      style={{
        position: "relative",

      }}
    >
      <canvas 
        ref={canvasRef} 
        onClick={togglePlay}
        style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "100%", height: "100%" }} 
      />
      <video ref={videoRef} src="https://heartoss.xn--vuqw0e54ixuh2wab7xjjnvyb7x0m.online/video.mp4 " muted crossOrigin="anonymous"  style={{display: "none"}}  loop/>

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
