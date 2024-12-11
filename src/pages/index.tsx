import { useState, useEffect } from "react";

export default function Home() {
  const [scale, setScale] = useState(1);
  const [danmakuList, setDanmakuList] = useState<any[]>([]);
  const [activeDanmaku, setActiveDanmaku] = useState<any[]>([]);

  // 加载弹幕数据
  useEffect(() => {
    fetch('/bulletchat.json')
      .then((res) => res.json())
      .then((data) => {
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
      setActiveDanmaku((prev) => {
        const now = Date.now();

        // 查找未使用的轨道
        const tracks = Array(20).fill(false);
        prev.forEach((d) => {
          const progress = (now - d.startTime) / d.duration;
          if (progress < 1) {
            tracks[d.track] = true;
          }
        });

        const newDanmakus = [];
        for (let i = 0; i < 3; i++) {
          const availableTrack = tracks.findIndex((t) => !t);
          if (availableTrack !== -1) {
            tracks[availableTrack] = true;
            newDanmakus.push({
              ...danmakuList[Math.floor(Math.random() * danmakuList.length)],
              track: availableTrack,
              startTime: now,
              duration: Math.random() * 20000 + 20000, // 随机速度（20s~40s）
            });
          }
        }

        return [...prev, ...newDanmakus];
      });
    };

    const interval = setInterval(addNewDanmaku, 1000);
    return () => clearInterval(interval);
  }, [danmakuList]);

  // 心跳效果
  useEffect(() => {
    const interval = setInterval(() => {
      setScale((prev) => (prev === 1 ? 1.1 : 1));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // 动画结束后清理弹幕
  const handleAnimationEnd = (id: number) => {
    setActiveDanmaku((prev) => prev.filter((item) => item.id !== id));
  };

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
          zIndex: 1,
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
            onAnimationEnd={() => handleAnimationEnd(danmaku.id)}
            style={{
              position: "absolute",
              top: `${danmaku.track * 5}%`,
              left: "100%",
              whiteSpace: "nowrap",
              color: danmaku.color,
              fontSize: `${danmaku.size}px`,
              fontWeight: "bold",
              animation: `scroll ${danmaku.duration}ms linear`,
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
