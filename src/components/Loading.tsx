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
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Simulate loading progress
    let start = 0;
    const interval = setInterval(() => {
      const step = Math.floor(Math.random() * 4) + 2;
      start += step;
      if (start >= 100) {
        start = 100;
        clearInterval(interval);
        handleLoaded();
      }
      setPercent(start);
    }, 45);

    return () => clearInterval(interval);
  }, []);

  const handleLoaded = () => {
    // 2. Transition from loading count to Welcome
    setTimeout(() => {
      setIsWelcome(true);
      
      // 3. Expand the black pill like a mask to swallow the screen
      setTimeout(() => {
        const pill = pillRef.current;
        const text = textRef.current;
        
        if (pill) {
          const tl = gsap.timeline({
            onComplete: onComplete
          });
          
          // Fade out the welcome text inside the pill first
          if (text) {
            tl.to(text, {
              opacity: 0,
              duration: 0.25,
              ease: 'power2.out'
            });
          }
          
          // Expand the black pill radially to cover the screen
          const size = Math.max(window.innerWidth, window.innerHeight) * 3.0;
          tl.to(pill, {
            width: size,
            height: size,
            borderRadius: '50%',
            duration: 0.95,
            ease: 'power4.in',
          }, '-=0.1');
        }
      }, 1200);
    }, 400);
  };

  return (
    <div
      ref={screenRef}
      className="fixed inset-0 z-[99999] bg-[#eae5ec] flex flex-col justify-center items-center select-none overflow-hidden"
    >
      {/* Top Header Mockup */}
      <div className="absolute top-0 left-0 w-full px-8 py-8 md:px-16 flex justify-between items-center pointer-events-none">
        <span className="font-heading font-black text-lg md:text-xl tracking-widest text-[#0a0a0f]">
          SP
        </span>
        {/* Mock visualizer bars */}
        <div className="flex gap-1.5 items-end h-6">
          <span className="w-[2px] h-3 bg-[#0a0a0f] animate-pulse"></span>
          <span className="w-[2px] h-6 bg-[#0a0a0f] animate-pulse delay-75"></span>
          <span className="w-[2px] h-4 bg-[#0a0a0f] animate-pulse delay-150"></span>
        </div>
      </div>

      {/* Massive Scrolling Marquee Background (Larger size) */}
      <div className="absolute top-1/2 left-0 w-full overflow-hidden -translate-y-1/2 pointer-events-none select-none">
        <div className="flex whitespace-nowrap animate-marquee font-heading font-black text-8xl md:text-[10rem] tracking-widest text-[#0a0a0f]/5 uppercase leading-none">
          <span>
            CREATIVE DEVELOPER &bull; A CREATIVE DEVELOPER &bull; A CREATIVE DEVELOPER &bull; A CREATIVE DEVELOPER &bull; &nbsp;
          </span>
          <span>
            CREATIVE DEVELOPER &bull; A CREATIVE DEVELOPER &bull; A CREATIVE DEVELOPER &bull; A CREATIVE DEVELOPER &bull; &nbsp;
          </span>
        </div>
      </div>

      {/* Center Black Loading Pill (Larger scale with dynamic aura) */}
      <div
        ref={pillRef}
        className="relative z-10 rounded-full bg-[#0a0a0f] border border-[#1E1E2E] shadow-[0_25px_60px_rgba(0,0,0,0.35)] flex items-center justify-center overflow-hidden"
        style={{
          width: '320px',
          height: '76px'
        }}
      >
        {/* Dynamic Growing Glow Aura behind pill contents */}
        <div
          className="absolute inset-0 opacity-25 filter blur-md pointer-events-none transition-all duration-300"
          style={{
            transform: `scale(${1 + (percent / 100) * 0.5})`,
            background: `radial-gradient(circle, ${percent < 50 ? '#6C63FF' : '#00D4FF'} 0%, transparent 80%)`
          }}
        ></div>

        {/* Text container */}
        <div
          ref={textRef}
          className="relative z-10 font-heading font-bold text-base md:text-lg text-white uppercase tracking-wider flex items-center gap-2 select-none"
        >
          {!isWelcome ? (
            <div className="flex items-center justify-center gap-1.5">
              <span>LOADING</span>
              <span className="text-[#00D4FF] font-mono font-semibold ml-2">{percent}%</span>
              {/* Blinking terminal cursor block */}
              <span className="inline-block w-2.5 h-4 bg-white animate-pulse ml-0.5"></span>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-1.5 animate-fade-in">
              <span className="inline-block w-2.5 h-4 bg-white animate-pulse mr-0.5"></span>
              <span className="text-[#6C63FF] font-black tracking-[0.2em]">WELCOME</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Loading;
