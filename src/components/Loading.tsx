import { useEffect, useState } from "react";
import "../styles/Loading.css";

interface LoadingProps {
  onComplete: () => void;
}

const Loading = ({ onComplete }: LoadingProps) => {
  const [percent, setPercent] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [clicked, setClicked] = useState(false);

  // 1. Loading Simulation
  useEffect(() => {
    let percentVal = 0;
    const interval = setInterval(() => {
      if (percentVal <= 50) {
        const rand = Math.round(Math.random() * 5) + 2;
        percentVal = Math.min(50, percentVal + rand);
        setPercent(percentVal);
      } else {
        clearInterval(interval);
        const slowInterval = setInterval(() => {
          percentVal = percentVal + Math.round(Math.random() * 2);
          if (percentVal >= 100) {
            percentVal = 100;
            setPercent(100);
            clearInterval(slowInterval);
          } else {
            setPercent(percentVal);
          }
        }, 80);
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // 2. Loading complete transitions
  useEffect(() => {
    if (percent >= 100) {
      const t1 = setTimeout(() => {
        setLoaded(true);
        const t2 = setTimeout(() => {
          setIsLoaded(true);
        }, 1000);
        return () => clearTimeout(t2);
      }, 600);
      return () => clearTimeout(t1);
    }
  }, [percent]);

  // 3. Welcome clicked / page transition trigger
  useEffect(() => {
    if (isLoaded) {
      setClicked(true);
      const timer = setTimeout(() => {
        onComplete();
      }, 900);
      return () => clearTimeout(timer);
    }
  }, [isLoaded, onComplete]);

  // 4. Mouse movement tracking for spotlight radial glow
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const { currentTarget: target } = e;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <>
      {/* Header bar of loading screen */}
      <div className="loading-header">
        <a href="/#" className="loader-title font-heading uppercase font-extrabold tracking-widest" data-cursor="disable">
          SP
        </a>
        
        {/* Pong game visualizer */}
        <div className={`loaderGame ${clicked ? "loader-out" : ""}`}>
          <div className="loaderGame-container">
            <div className="loaderGame-in">
              {[...Array(27)].map((_, index) => (
                <div className="loaderGame-line" key={index}></div>
              ))}
            </div>
            <div className="loaderGame-ball"></div>
          </div>
        </div>
      </div>

      <div className="loading-screen select-none pointer-events-none">
        {/* Scrolling text marquee */}
        <div className="loading-marquee font-heading">
          <div className="flex whitespace-nowrap animate-marquee">
            <span> A Creative Developer</span> <span>A Creative Designer</span>
            <span> A Creative Developer</span> <span>A Creative Designer</span>
            <span> A Creative Developer</span> <span>A Creative Designer</span>
            <span> A Creative Developer</span> <span>A Creative Designer</span>
          </div>
        </div>

        {/* Center Pill Button Container */}
        <div
          className={`loading-wrap pointer-events-auto ${clicked ? "loading-clicked" : ""}`}
          onMouseMove={handleMouseMove}
        >
          <div className="loading-hover"></div>
          <div className={`loading-button ${loaded ? "loading-complete" : ""}`}>
            {/* Loading text/percent element */}
            <div className="loading-container">
              <div className="loading-content font-heading font-bold text-white uppercase">
                <div className="loading-content-in">
                  Loading <span className="font-mono text-[#00D4FF]">{percent}%</span>
                </div>
              </div>
              <div className="loading-box"></div>
            </div>

            {/* Welcome transition text */}
            <div className="loading-content2 font-heading font-black text-white">
              <span>Welcome</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loading;
