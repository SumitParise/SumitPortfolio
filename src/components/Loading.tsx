import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

interface LoadingProps {
  onComplete: () => void;
}

export const Loading = ({ onComplete }: LoadingProps) => {
  const [percent, setPercent] = useState(0);
  const [isWelcome, setIsWelcome] = useState(false);
  const screenRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Simulate loading progress
    let start = 0;
    const interval = setInterval(() => {
      const step = Math.floor(Math.random() * 5) + 2;
      start += step;
      if (start >= 100) {
        start = 100;
        clearInterval(interval);
        handleLoaded();
      }
      setPercent(start);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const handleLoaded = () => {
    // 2. Transition from loading count to Welcome
    setTimeout(() => {
      setIsWelcome(true);
      // 3. Zoom expand and fade out the entire loader screen
      setTimeout(() => {
        const screen = screenRef.current;
        const pill = pillRef.current;
        if (screen && pill) {
          const tl = gsap.timeline({
            onComplete: onComplete
          });
          
          // Springy scale out of pill, then full screen zoom out
          tl.to(pill, {
            scale: 0.85,
            opacity: 0,
            duration: 0.4,
            ease: 'power3.inOut'
          })
          .to(screen, {
            opacity: 0,
            duration: 0.8,
            ease: 'power2.inOut'
          }, '-=0.2');
        }
      }, 1000);
    }, 500);
  };

  return (
    <div
      ref={screenRef}
      className="fixed inset-0 z-[99999] bg-[#eae5ec] flex flex-col justify-center items-center select-none overflow-hidden"
    >
      {/* Top Header Mockup */}
      <div className="absolute top-0 left-0 w-full px-6 py-6 md:px-12 flex justify-between items-center pointer-events-none">
        <span className="font-heading font-extrabold text-sm md:text-base tracking-widest text-[#0a0a0f]">
          SP
        </span>
        {/* Mock visualizer bars */}
        <div className="flex gap-1 items-end h-5">
          <span className="w-[1.5px] h-3 bg-[#0a0a0f] animate-pulse"></span>
          <span className="w-[1.5px] h-5 bg-[#0a0a0f] animate-pulse delay-75"></span>
          <span className="w-[1.5px] h-4 bg-[#0a0a0f] animate-pulse delay-150"></span>
        </div>
      </div>

      {/* Massive Scrolling Marquee Background */}
      <div className="absolute top-1/2 left-0 w-full overflow-hidden -translate-y-1/2 pointer-events-none select-none">
        <div className="flex whitespace-nowrap animate-marquee font-heading font-black text-6xl md:text-9xl tracking-wider text-[#0a0a0f]/5 uppercase">
          <span>
            CREATIVE DEVELOPER &bull; A CREATIVE DEVELOPER &bull; A CREATIVE DEVELOPER &bull; A CREATIVE DEVELOPER &bull; &nbsp;
          </span>
          <span>
            CREATIVE DEVELOPER &bull; A CREATIVE DEVELOPER &bull; A CREATIVE DEVELOPER &bull; A CREATIVE DEVELOPER &bull; &nbsp;
          </span>
        </div>
      </div>

      {/* Center Black Loading Pill */}
      <div
        ref={pillRef}
        className="relative z-10 px-10 py-5 rounded-full bg-[#0a0a0f] border border-[#1E1E2E] shadow-[0_20px_50px_rgba(0,0,0,0.25)] flex items-center justify-center min-w-[240px] md:min-w-[300px] h-[64px] md:h-[76px] transition-all duration-500 ease-in-out"
      >
        {/* Glow behind pill */}
        <div className="absolute inset-0 rounded-full bg-[#6C63FF]/5 filter blur-md pointer-events-none"></div>

        <div className="relative z-10 font-heading font-semibold text-sm md:text-lg text-white uppercase tracking-wider flex items-center gap-2 select-none">
          {!isWelcome ? (
            <div className="flex items-center justify-center gap-1.5 transition-all duration-300">
              <span>LOADING</span>
              <span className="text-[#00D4FF] font-mono font-medium ml-2">{percent}%</span>
              {/* Blinking terminal cursor block */}
              <span className="inline-block w-2.5 h-4 bg-white animate-pulse ml-0.5"></span>
            </div>
          ) : (
            <div className="flex items-center justify-center animate-fade-in">
              <span className="text-[#6C63FF] font-bold tracking-widest">WELCOME</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Loading;
