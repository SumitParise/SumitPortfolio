import { useState, useMemo } from 'react';
import useScrollReveal from '../../hooks/useScrollReveal';
import { PORTFOLIO } from '../../data/portfolio';

const TechStack = () => {
  const containerRef = useScrollReveal<HTMLDivElement>();
  const [isNight, setIsNight] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState(1); // 1 = Normal, 1.5 = Fast, 0.5 = Slow

  const skills = PORTFOLIO.skills;

  // Classify skills into categories for the sign boards
  const skillCategories: Record<string, 'DEVELOP' | 'DESIGN'> = {
    'React': 'DEVELOP',
    'TypeScript': 'DEVELOP',
    'Node.js': 'DEVELOP',
    'Python': 'DEVELOP',
    'Three.js': 'DESIGN',
    'GSAP': 'DESIGN',
    'REST APIs': 'DEVELOP',
    'Git': 'DEVELOP',
    'Docker': 'DEVELOP',
    'Tailwind CSS': 'DESIGN',
    'HTML5/CSS3': 'DESIGN',
    'FastAPI': 'DEVELOP',
    'Next.js': 'DEVELOP',
    'MongoDB': 'DEVELOP',
    'PostgreSQL': 'DEVELOP',
    'AWS': 'DEVELOP',
    'Express': 'DEVELOP',
    'GraphQL': 'DEVELOP',
  };

  // Staggered delay for each billboard to pass sequentially
  const billboardDuration = 18; // total loop seconds
  const billboards = useMemo(() => {
    return skills.map((skill, idx) => ({
      name: skill,
      category: skillCategories[skill] || 'DEVELOP',
      delay: (idx * (billboardDuration / skills.length))
    }));
  }, [skills]);

  // Handle speed and pause play states
  const animationStyle = {
    animationPlayState: isPaused ? 'paused' : 'running',
    // Scale duration based on selected speed
    '--speed-multiplier': `${1 / speed}`,
  } as React.CSSProperties;

  return (
    <section
      id="techstack"
      ref={containerRef}
      className="py-20 md:py-36 px-6 md:px-12 max-w-6xl mx-auto overflow-hidden relative select-none"
    >
      {/* Scoped CSS Styles for Parallax Scenery and Scrolling */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scroll-bg {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        @keyframes billboard-pass {
          0% { transform: translate3d(600px, 0, 0); opacity: 0; }
          5% { opacity: 1; }
          95% { opacity: 1; }
          100% { transform: translate3d(-1000px, 0, 0); opacity: 0; }
        }
        @keyframes car-bob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        @keyframes cloud-float {
          0% { transform: translate3d(100%, 0, 0); }
          100% { transform: translate3d(-150%, 0, 0); }
        }

        .animate-scroll-clouds {
          animation: scroll-bg calc(45s * var(--speed-multiplier)) linear infinite;
        }
        .animate-scroll-hills-far {
          animation: scroll-bg calc(24s * var(--speed-multiplier)) linear infinite;
        }
        .animate-scroll-hills-near {
          animation: scroll-bg calc(14s * var(--speed-multiplier)) linear infinite;
        }
        .animate-scroll-road {
          animation: scroll-bg calc(1.8s * var(--speed-multiplier)) linear infinite;
        }
        .animate-car-bob {
          animation: car-bob 0.15s linear infinite;
        }
        .animate-billboard {
          animation: billboard-pass calc(${billboardDuration}s * var(--speed-multiplier)) linear infinite;
        }
      `}} />

      {/* Title */}
      <div className="flex flex-col items-center text-center mb-10 relative z-10">
        <div className="flex items-center gap-2 mb-4 justify-center">
          <span className="w-10 h-[2px] bg-[#00D4FF]"></span>
          <span className="font-mono text-sm tracking-widest text-[#00D4FF] uppercase font-semibold">
            Skills
          </span>
          <span className="w-10 h-[2px] bg-[#00D4FF]"></span>
        </div>
        
        <h3 className="text-3xl md:text-5xl font-heading font-extrabold text-white mb-4">
          Tech Highway
        </h3>
        
        <p className="text-[#6B6B80] max-w-lg font-sans text-xs md:text-sm">
          Sumit is driving down Earth's technology highway. Toggle between Day/Night, adjust the speed, or hover over the signs to inspect the skills!
        </p>
      </div>

      {/* 2D Landscape Viewport */}
      <div
        className={`reveal-item w-full h-[40vh] md:h-[50vh] border border-[#1E1E2E]/60 rounded-2xl relative overflow-hidden flex flex-col justify-end shadow-2xl transition-all duration-700 ${
          isNight
            ? 'bg-gradient-to-b from-indigo-950 via-purple-900 to-orange-800'
            : 'bg-gradient-to-b from-sky-400 to-sky-100'
        }`}
      >
        {/* Sun / Moon Horizon Element */}
        <div
          className={`absolute w-20 h-20 md:w-28 md:h-28 rounded-full left-[15%] transition-all duration-1000 ease-in-out ${
            isNight
              ? 'bg-yellow-100 shadow-[0_0_40px_rgba(255,255,255,0.4)] top-[15%]'
              : 'bg-yellow-300 shadow-[0_0_50px_rgba(253,224,71,0.6)] top-[22%]'
          }`}
        ></div>

        {/* Clouds Layer (Parallax 1) */}
        <div
          className="absolute inset-x-0 top-8 h-20 opacity-40 pointer-events-none flex whitespace-nowrap animate-scroll-clouds"
          style={animationStyle}
        >
          <div className="flex gap-40 shrink-0 w-full justify-around">
            <div className="w-20 h-6 bg-white rounded-full filter blur-[1px]"></div>
            <div className="w-32 h-10 bg-white rounded-full filter blur-[2px]"></div>
            <div className="w-24 h-8 bg-white rounded-full filter blur-[1px]"></div>
          </div>
          <div className="flex gap-40 shrink-0 w-full justify-around">
            <div className="w-20 h-6 bg-white rounded-full filter blur-[1px]"></div>
            <div className="w-32 h-10 bg-white rounded-full filter blur-[2px]"></div>
            <div className="w-24 h-8 bg-white rounded-full filter blur-[1px]"></div>
          </div>
        </div>

        {/* Mountains / Far Hills (Parallax 2) */}
        <div
          className="absolute inset-x-0 bottom-[60px] h-32 flex whitespace-nowrap pointer-events-none opacity-85 animate-scroll-hills-far"
          style={animationStyle}
        >
          <div className="flex shrink-0 w-full" style={{ color: isNight ? '#2e1b4e' : '#4ade80' }}>
            <svg className="w-full h-full fill-current" viewBox="0 0 100 10" preserveAspectRatio="none">
              <path d="M0,10 Q15,4 35,8 T70,5 T100,10 L100,10 L0,10 Z" />
            </svg>
          </div>
          <div className="flex shrink-0 w-full" style={{ color: isNight ? '#2e1b4e' : '#4ade80' }}>
            <svg className="w-full h-full fill-current" viewBox="0 0 100 10" preserveAspectRatio="none">
              <path d="M0,10 Q15,4 35,8 T70,5 T100,10 L100,10 L0,10 Z" />
            </svg>
          </div>
        </div>

        {/* Near Hills & Forest Trees (Parallax 3) */}
        <div
          className="absolute inset-x-0 bottom-[55px] h-20 flex whitespace-nowrap pointer-events-none z-10 animate-scroll-hills-near"
          style={animationStyle}
        >
          <div className="flex shrink-0 w-full" style={{ color: isNight ? '#1e1136' : '#22c55e' }}>
            <svg className="w-full h-full fill-current" viewBox="0 0 100 10" preserveAspectRatio="none">
              <path d="M0,10 Q20,3 45,7 T80,4 T100,10 L100,10 L0,10 Z" />
            </svg>
          </div>
          <div className="flex shrink-0 w-full" style={{ color: isNight ? '#1e1136' : '#22c55e' }}>
            <svg className="w-full h-full fill-current" viewBox="0 0 100 10" preserveAspectRatio="none">
              <path d="M0,10 Q20,3 45,7 T80,4 T100,10 L100,10 L0,10 Z" />
            </svg>
          </div>
        </div>

        {/* Highway Exit Billboards Layer */}
        <div className="absolute inset-x-0 bottom-[60px] h-40 z-20 pointer-events-none">
          {billboards.map((b, idx) => {
            const isDevelop = b.category === 'DEVELOP';
            return (
              <div
                key={idx}
                className="absolute bottom-0 left-0 w-44 pointer-events-auto cursor-pointer animate-billboard flex flex-col items-center select-none"
                style={{
                  ...animationStyle,
                  animationDelay: `${b.delay * (1 / speed)}s`,
                }}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                {/* Green/Blue Highway Exit Sign Board */}
                <div
                  className={`w-full p-2.5 rounded-lg border-2 border-white/95 text-center shadow-lg font-sans text-white hover:scale-105 transition-transform duration-300 relative`}
                  style={{
                    backgroundColor: isDevelop ? '#056b3b' : '#005a9c', // Highway Green or Exit Blue
                  }}
                >
                  <div className="flex items-center justify-between border-b border-white/20 pb-1 mb-1">
                    <span className="text-[7px] font-bold tracking-widest uppercase">EXIT {idx + 1}</span>
                    <span className="text-[7px] font-bold">{isDevelop ? 'DEV ↗' : 'DSN ↗'}</span>
                  </div>
                  <div className="text-sm font-black tracking-wide font-heading truncate">
                    {b.name.toUpperCase()}
                  </div>
                  <div className="text-[7px] font-mono opacity-80 mt-0.5">
                    {isDevelop ? 'DEVELOP / CODE' : 'DESIGN / STYLE'}
                  </div>
                </div>
                {/* Billboard Metal Poles */}
                <div className="w-1.5 h-16 bg-neutral-500/80 border-r border-neutral-700/50"></div>
              </div>
            );
          })}
        </div>

        {/* Road surface (Parallax 4 - Fastest) */}
        <div
          className="w-[200%] h-[60px] bg-[#2d2d3a] border-t-2 border-[#1E1E2E] shrink-0 z-30 flex whitespace-nowrap animate-scroll-road"
          style={animationStyle}
        >
          <div className="w-full flex items-center justify-around">
            {[...Array(6)].map((_, idx) => (
              <div key={idx} className="w-16 h-1.5 bg-yellow-400 rounded-full opacity-60"></div>
            ))}
          </div>
          <div className="w-full flex items-center justify-around">
            {[...Array(6)].map((_, idx) => (
              <div key={idx} className="w-16 h-1.5 bg-yellow-400 rounded-full opacity-60"></div>
            ))}
          </div>
        </div>

        {/* Dynamic Vector SVG Car (Low-poly modern hatchback) */}
        <div
          className={`absolute left-[15%] bottom-[20px] w-28 md:w-36 z-40 transition-all duration-300 select-none ${
            !isPaused && 'animate-car-bob'
          }`}
        >
          <svg className="w-full h-auto drop-shadow-lg" viewBox="0 0 160 70" fill="none">
            {/* Car body - sleek red shell */}
            <path d="M5 45 C5 35 15 35 25 35 L40 22 C45 15 55 12 75 12 L120 12 C135 12 142 22 148 30 C155 35 156 42 156 50 C156 54 150 56 142 56 L18 56 C10 56 5 52 5 45 Z" fill={isNight ? "#8b1a1a" : "#dc2626"} />
            
            {/* Glass windows */}
            <path d="M48 24 L72 16 L112 16 L124 24 L115 35 L48 35 Z" fill="#00D4FF" fillOpacity="0.4" />
            
            {/* Driver model silhouette */}
            <circle cx="68" cy="26" r="5" fill="#111118" />
            <path d="M64 35 C64 31 72 31 72 35 Z" fill="#111118" />

            {/* Glowing tail/headlights */}
            <rect x="2" y="42" width="6" height="4" rx="2" fill={isNight ? "#ff3366" : "#ef4444"} />
            <rect x="151" y="42" width="8" height="5" rx="2" fill="#ffffff" />
            {/* Tail light beam */}
            {isNight && (
              <path d="M156 44 L200 35 L200 55 Z" fill="url(#headlight-gradient)" fillOpacity="0.2" />
            )}

            {/* Spinning Wheels */}
            <g className={`${!isPaused && 'animate-spin'}`} style={{ transformOrigin: '36px 52px', animationDuration: `${0.3 * (1 / speed)}s` }}>
              <circle cx="36" cy="52" r="13" fill="#1e1b1b" stroke="#333" strokeWidth="2" />
              <circle cx="36" cy="52" r="6" fill="#fff" />
              <rect x="35" y="39" width="2" height="26" fill="#fff" />
              <rect x="23" y="51" width="26" height="2" fill="#fff" />
            </g>
            <g className={`${!isPaused && 'animate-spin'}`} style={{ transformOrigin: '124px 52px', animationDuration: `${0.3 * (1 / speed)}s` }}>
              <circle cx="124" cy="52" r="13" fill="#1e1b1b" stroke="#333" strokeWidth="2" />
              <circle cx="124" cy="52" r="6" fill="#fff" />
              <rect x="123" y="39" width="2" height="26" fill="#fff" />
              <rect x="111" y="51" width="26" height="2" fill="#fff" />
            </g>

            {/* Gradients */}
            <defs>
              <linearGradient id="headlight-gradient" x1="156" y1="44" x2="200" y2="45" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#fff" />
                <stop offset="100%" stopColor="#fff" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Interactive Controls Panel */}
      <div className="reveal-item max-w-lg mx-auto mt-8 p-6 bg-[#111118]/70 border border-[#1E1E2E] rounded-xl flex flex-col md:flex-row items-center justify-between gap-6 z-10 relative">
        
        {/* Drive & Pause Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="px-5 py-2.5 rounded-lg bg-[#6C63FF] hover:bg-[#6C63FF]/90 text-white font-heading font-semibold text-xs tracking-wider transition-all shadow-[0_0_15px_rgba(108,99,255,0.2)]"
          >
            {isPaused ? 'RESUME DRIVE' : 'PAUSE DRIVE'}
          </button>
          
          <button
            onClick={() => setIsNight(!isNight)}
            className="px-5 py-2.5 rounded-lg bg-[#00D4FF]/20 border border-[#00D4FF]/40 text-[#00D4FF] hover:bg-[#00D4FF]/30 font-heading font-semibold text-xs tracking-wider transition-all"
          >
            {isNight ? 'DAY MODE ☀️' : 'NIGHT DRIVE 🌙'}
          </button>
        </div>

        {/* Speed Controller Slider */}
        <div className="flex flex-col w-full md:w-fit items-start gap-1">
          <span className="font-mono text-[10px] text-[#6B6B80] uppercase tracking-wider">Speed: {speed}x</span>
          <input
            type="range"
            min="0.5"
            max="2.0"
            step="0.25"
            value={speed}
            onChange={(e) => setSpeed(parseFloat(e.target.value))}
            className="w-full md:w-36 h-1 bg-[#1E1E2E] rounded-lg appearance-none cursor-pointer accent-[#6C63FF]"
          />
        </div>

      </div>
    </section>
  );
};

export default TechStack;
