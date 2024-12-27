import { useEffect, useState } from 'react';

export default function AnimationPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="container">
      <div className={`animationWrapper ${isVisible ? 'visible' : ''}`}>
        <img 
          src="/12月11日.gif"  
          alt="动画展示"
          className="animationImage"
        />
      </div>

      <style jsx>{`
        .container {
          width: 100vw;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #f5f5f5;
          overflow: hidden;
        }

        .animationWrapper {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s ease-out;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .visible {
          opacity: 1;
          transform: translateY(0);
        }

        .animationImage {
          width: 100%;
          height: 100%;
          object-fit: contain;
          border-radius: 0;
          box-shadow: none;
        }
      `}</style>

      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
        }
      `}</style>
    </div>
  );
} 