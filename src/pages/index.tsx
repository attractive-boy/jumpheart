import { useState, useEffect } from "react";

export default function Home() {
  const [scale, setScale] = useState(1);
  const [danmakuList, setDanmakuList] = useState<any[]>([]);
  const [activeDanmaku, setActiveDanmaku] = useState<any[]>([]);

  // 加载弹幕数据
  useEffect(() => {
    fetch('/bulletchat.json')
      .then(res => res.json())
      .then(data => {
        // 随机打乱所有数据
        const shuffledData = data.sort(() => 0.5 - Math.random());
        
        const formattedData = shuffledData.map((item: any) => ({
          id: item.软通工号,
          text: item.对软通动力及RMO组织的祝福与承诺,
          color: getRandomColor(),
          size: item.isBigger ? 32 : getRandomSize(),
        }));
        setDanmakuList(formattedData);
      });
  }, []);

  // 定时添加新弹幕
  useEffect(() => {
    if (danmakuList.length === 0) return;

    const addNewDanmaku = () => {
      setActiveDanmaku(prev => {
        // 移除已经完成动画的弹幕
        const now = Date.now();
        const filtered = prev.filter(d => now - d.startTime < 30000); // 减少动画时间到30秒
        
        // 找到多个合适的轨道
        const tracks = Array(20).fill(false);
        filtered.forEach(d => {
          const progress = (now - d.startTime) / 30000;
          if (progress < 1) {
            tracks[d.track] = true;
            if (d.text.length > 20) {
              if (d.track > 0) tracks[d.track - 1] = true;
              if (d.track < tracks.length - 1) tracks[d.track + 1] = true;
            }
          }
        });
        
        // 每次添加2-3条新弹幕
        const newDanmakus = [];
        const numNewDanmakus = Math.floor(Math.random() * 2) + 2; // 随机2-3条
        
        for(let j = 0; j < numNewDanmakus; j++) {
          // 寻找空闲轨道
          let availableTrack = -1;
          for (let i = 0; i < tracks.length; i++) {
            if (!tracks[i]) {
              availableTrack = i;
              tracks[i] = true; // 标记该轨道已被使用
              break;
            }
          }
          
          if (availableTrack !== -1) {
            const newDanmaku = {
              ...danmakuList[Math.floor(Math.random() * danmakuList.length)],
              track: availableTrack,
              startTime: now
            };
            newDanmakus.push(newDanmaku);
          }
        }
        
        return [...filtered, ...newDanmakus];
      });
    };

    const interval = setInterval(addNewDanmaku, 50); // 减少间隔时间到50ms
    return () => clearInterval(interval);
  }, [danmakuList]);

  // 心跳效果
  useEffect(() => {
    const interval = setInterval(() => {
      setScale((prev) => (prev === 1 ? 1.1 : 1));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
        backgroundImage: "url('/background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* 心跳效果 */}
      <div
        style={{
          backgroundImage: "url('/heart.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: (980 / 1080) * 100 + "vh",
          width: (1180 / 1920) * 100 + "vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transform: `scale(${scale})`,
          transition: "transform 0.5s ease-in-out",
          position: "absolute",
          zIndex: 1
        }}
      >
        <div
          style={{
            backgroundImage: "url('/logo.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: (930 / 1920) * 100 + "vw",
            height: (150 / 1080) * 100 + "vh",
          }}
        />
      </div>

      {/* 弹幕渲染 */}
      <div style={{ position: "absolute", width: "100%", height: "100%", zIndex: 2 }}>
        {activeDanmaku.map((danmaku) => (
          <div
            key={`${danmaku.id}-${danmaku.startTime}`}
            style={{
              position: "absolute",
              top: `${danmaku.track * 5}%`,
              left: "100%",
              whiteSpace: "nowrap",
              color: danmaku.color,
              fontSize: `${danmaku.size}px`,
              fontWeight: "bold",
              animation: `scroll 30s linear`, // 减少动画时间到30秒
              animationFillMode: "forwards",
              textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
            }}
          >
            {danmaku.text}
          </div>
        ))}
      </div>

      {/* 动画样式 */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-200%);
          }
        }
      `}</style>
    </div>
  );
}

// 随机生成颜色
function getRandomColor() {
  const colors = ["#FF69B4", "#FFD700", "#00BFFF", "#ADFF2F", "#FF4500"];
  return colors[Math.floor(Math.random() * colors.length)];
}

// 随机生成字体大小
function getRandomSize() {
  return Math.floor(Math.random() * 16) + 16;
}
