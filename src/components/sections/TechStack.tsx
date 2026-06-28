import { useState, useMemo } from 'react';
import useScrollReveal from '../../hooks/useScrollReveal';
import { PORTFOLIO } from '../../data/portfolio';

const TechStack = () => {
  const containerRef = useScrollReveal<HTMLDivElement>();
  const [isNight, setIsNight] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState(1); // 1 = Normal, 1.5 = Fast, 0.5 = Slow

  const skills = PORTFOLIO.skills;

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

  // Staggered delay for each building to pass sequentially
  const scrollDuration = 22; // total loop duration in seconds
  const streetItems = useMemo(() => {
    return skills.map((skill, idx) => {
      const category = skillCategories[skill] || 'DEVELOP';
      // Alternate left/right, heights, and styles
      const heightClass = idx % 3 === 0 ? 'h-32 md:h-48' : idx % 3 === 1 ? 'h-40 md:h-56' : 'h-48 md:h-64';
      const buildingStyle = idx % 2 === 0 ? 'rounded-t-lg' : 'rounded-t-none';
      return {
        name: skill,
        category,
        delay: (idx * (scrollDuration / skills.length)),
        heightClass,
        buildingStyle
      };
    });
  }, [skills]);

  // Birds config with staggered loops
  const birds = [
    { delay: 0, top: '15%', size: 'scale-[0.6]', duration: 16 },
    { delay: 4, top: '25%', size: 'scale-[0.5]', duration: 20 },
    { delay: 9, top: '10%', size: 'scale-[0.7]', duration: 14 }
  ];

  const animationStyle = {
    animationPlayState: isPaused ? 'paused' : 'running',
    '--speed-multiplier': `${1 / speed}`,
  } as React.CSSProperties;

  return (
    <section
      id="techstack"
      ref={containerRef}
      className="py-20 md:py-36 px-6 md:px-12 max-w-6xl mx-auto overflow-hidden relative select-none"
    >
      {/* Scoped Keyframes for Parallax, Flapping, and Pedaling */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scroll-scenery {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        @keyframes building-pass {
          0% { transform: translate3d(600px, 0, 0); opacity: 0; }
          4% { opacity: 1; }
          96% { opacity: 1; }
          100% { transform: translate3d(-1000px, 0, 0); opacity: 0; }
        }
        @keyframes wing-flap {
          0%, 100% { transform: scaleY(1.0); }
          50% { transform: scaleY(-0.7); }
        }
        @keyframes bird-fly {
          0% { transform: translate3d(600px, 0, 0); }
          100% { transform: translate3d(-1000px, 0, 0); }
        }
        @keyframes rider-pedal-bob {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(0, -2.5px, 0); }
        }
        @keyframes spinner {
          from { transform: rotate(0deg); }
          to { transform: rotate(36deg); }
        }

        .animate-scroll-clouds {
          animation: scroll-scenery calc(48s * var(--speed-multiplier)) linear infinite;
        }
        .animate-scroll-hills {
          animation: scroll-scenery calc(28s * var(--speed-multiplier)) linear infinite;
        }
        .animate-scroll-road {
          animation: scroll-scenery calc(1.5s * var(--speed-multiplier)) linear infinite;
        }
        .animate-rider-bob {
          animation: rider-pedal-bob calc(0.4s * var(--speed-multiplier)) ease-in-out infinite;
        }
        .animate-wing-flap {
          animation: wing-flap 0.35s ease-in-out infinite;
          transform-origin: center;
        }
        .animate-bird-fly {
          animation: bird-fly calc(var(--fly-duration) * var(--speed-multiplier)) linear infinite;
        }
        .animate-building {
          animation: building-pass calc(${scrollDuration}s * var(--speed-multiplier)) linear infinite;
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
          Tech Commute
        </h3>
        
        <p className="text-[#6B6B80] max-w-lg font-sans text-xs md:text-sm">
          Sumit is pedaling along the city street on his bicycle. Watch the birds fly and inspect the skills listed on passing buildings!
        </p>
      </div>

      {/* 2D Landscape Viewport */}
      <div
        className={`reveal-item w-full h-[45vh] md:h-[55vh] border border-[#1E1E2E]/60 rounded-2xl relative overflow-hidden flex flex-col justify-end shadow-2xl transition-all duration-700 ${
          isNight
            ? 'bg-gradient-to-b from-indigo-950 via-purple-900 to-orange-850'
            : 'bg-gradient-to-b from-sky-400 to-sky-100'
        }`}
      >
        {/* Sun / Moon */}
        <div
          className={`absolute w-16 h-16 md:w-24 md:h-24 rounded-full left-[18%] transition-all duration-1000 ease-in-out ${
            isNight
              ? 'bg-yellow-100 shadow-[0_0_40px_rgba(255,255,255,0.4)] top-[12%]'
              : 'bg-yellow-300 shadow-[0_0_45px_rgba(253,224,71,0.5)] top-[18%]'
          }`}
        ></div>

        {/* Flapping Birds Layer */}
        {birds.map((b, idx) => (
          <div
            key={idx}
            className={`absolute z-10 w-8 h-4 animate-bird-fly pointer-events-none select-none ${b.size}`}
            style={{
              ...animationStyle,
              top: b.top,
              animationDelay: `${b.delay * (1 / speed)}s`,
              '--fly-duration': `${b.duration}s`,
            } as React.CSSProperties}
          >
            <svg viewBox="0 0 32 16" className="w-full h-full fill-current text-neutral-800 opacity-60">
              <path
                className={`${!isPaused && 'animate-wing-flap'}`}
                d="M 0,8 Q 8,0 16,8 Q 24,0 32,8"
                stroke={isNight ? "#eae5ec" : "#000000"}
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          </div>
        ))}

        {/* Clouds (Parallax 1) */}
        <div
          className="absolute inset-x-0 top-8 h-20 opacity-30 pointer-events-none flex whitespace-nowrap animate-scroll-clouds"
          style={animationStyle}
        >
          <div className="flex gap-48 shrink-0 w-full justify-around">
            <div className="w-20 h-6 bg-white rounded-full filter blur-[1px]"></div>
            <div className="w-36 h-12 bg-white rounded-full filter blur-[2px]"></div>
          </div>
          <div className="flex gap-48 shrink-0 w-full justify-around">
            <div className="w-20 h-6 bg-white rounded-full filter blur-[1px]"></div>
            <div className="w-36 h-12 bg-white rounded-full filter blur-[2px]"></div>
          </div>
        </div>

        {/* Green Hills (Parallax 2) */}
        <div
          className="absolute inset-x-0 bottom-[65px] h-24 flex whitespace-nowrap pointer-events-none opacity-80 animate-scroll-hills animate-scroll-hills"
          style={animationStyle}
        >
          <div className="flex shrink-0 w-full" style={{ color: isNight ? '#241442' : '#34d399' }}>
            <svg className="w-full h-full fill-current" viewBox="0 0 100 10" preserveAspectRatio="none">
              <path d="M0,10 Q25,3 50,7 T100,10 L100,10 L0,10 Z" />
            </svg>
          </div>
          <div className="flex shrink-0 w-full" style={{ color: isNight ? '#241442' : '#34d399' }}>
            <svg className="w-full h-full fill-current" viewBox="0 0 100 10" preserveAspectRatio="none">
              <path d="M0,10 Q25,3 50,7 T100,10 L100,10 L0,10 Z" />
            </svg>
          </div>
        </div>

        {/* Scenery Layer: Tech Buildings & Roadside Trees */}
        <div className="absolute inset-x-0 bottom-[60px] h-64 z-20 pointer-events-none">
          {streetItems.map((b, idx) => {
            const isDevelop = b.category === 'DEVELOP';
            return (
              <div
                key={idx}
                className="absolute bottom-0 left-0 w-40 pointer-events-auto cursor-pointer animate-building flex flex-col justify-end items-center select-none"
                style={{
                  ...animationStyle,
                  animationDelay: `${b.delay * (1 / speed)}s`,
                }}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                <div className="flex items-end justify-center w-full relative">
                  {/* Building Block */}
                  <div
                    className={`w-28 md:w-32 ${b.heightClass} ${b.buildingStyle} border-t-2 border-x border-white/10 p-3 flex flex-col justify-between relative shadow-lg group transition-all duration-300`}
                    style={{
                      backgroundColor: isNight ? '#11111a' : '#eae5ec', // Dark building at night, light building at day
                    }}
                  >
                    {/* Skyscraper Lit Window Grids */}
                    <div className="grid grid-cols-3 gap-2 w-full opacity-60">
                      {[...Array(6)].map((_, wIdx) => (
                        <div
                          key={wIdx}
                          className={`w-3.5 h-2.5 rounded-sm transition-all duration-500 ${
                            isNight 
                              ? (idx + wIdx) % 3 === 0 ? 'bg-yellow-200 shadow-md' : 'bg-neutral-800'
                              : 'bg-white border border-neutral-300'
                          }`}
                        ></div>
                      ))}
                    </div>

                    {/* Storefront / Billboard Neon Sign Banner */}
                    <div
                      className="w-full py-1.5 rounded border text-center font-heading font-black text-[10px] md:text-xs tracking-wider shadow-md transition-colors"
                      style={{
                        backgroundColor: '#0a0a0f',
                        borderColor: isDevelop ? '#6C63FF' : '#00D4FF',
                        color: isDevelop ? '#6C63FF' : '#00D4FF',
                      }}
                    >
                      {b.name.toUpperCase()}
                      <span className="block text-[6px] font-mono opacity-60 tracking-widest mt-0.5">
                        {isDevelop ? 'DEV // BACK' : 'DSN // FRONT'}
                      </span>
                    </div>
                  </div>

                  {/* Roadside Green Tree positioned next to building */}
                  <div className="absolute bottom-0 right-[-16px] w-6 flex flex-col items-center pointer-events-none">
                    {/* Tree Canopy */}
                    <div className={`w-8 h-8 rounded-full border border-white/5 shadow-md ${isNight ? 'bg-green-950' : 'bg-green-500'}`}></div>
                    {/* Tree Trunk */}
                    <div className="w-1 h-3 bg-amber-800"></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Sidewalk & Asphalt Road */}
        <div
          className="w-[200%] h-[60px] bg-[#22222a] border-t-[4px] border-[#3b3b4f] shrink-0 z-30 flex whitespace-nowrap animate-scroll-road"
          style={animationStyle}
        >
          <div className="w-full flex items-center justify-around">
            {[...Array(8)].map((_, idx) => (
              <div key={idx} className="w-12 h-1 bg-yellow-500/50 rounded-full"></div>
            ))}
          </div>
          <div className="w-full flex items-center justify-around">
            {[...Array(8)].map((_, idx) => (
              <div key={idx} className="w-12 h-1 bg-yellow-500/50 rounded-full"></div>
            ))}
          </div>
        </div>

        {/* Dynamic Vector SVG Cyclist (Smiling pedaling rider) */}
        <div
          className={`absolute left-[18%] bottom-[22px] w-24 md:w-28 z-40 transition-all duration-300 select-none`}
        >
          <svg className="w-full h-auto drop-shadow-md" viewBox="0 0 100 80" fill="none">
            {/* Front Wheel (Spinning) */}
            <g style={{
              transformOrigin: '25px 65px',
              animation: !isPaused ? `spinner ${0.35 * (1 / speed)}s linear infinite` : 'none'
            }}>
              <circle cx="25" cy="65" r="11" stroke={isNight ? "#E8E8F0" : "#111118"} strokeWidth="2.2" fill="none" />
              <line x1="25" y1="54" x2="25" y2="76" stroke="#6B6B80" strokeWidth="0.8" />
              <line x1="14" y1="65" x2="36" y2="65" stroke="#6B6B80" strokeWidth="0.8" />
              <line x1="17.2" y1="57.2" x2="32.8" y2="72.8" stroke="#6B6B80" strokeWidth="0.8" />
              <line x1="17.2" y1="72.8" x2="32.8" y2="57.2" stroke="#6B6B80" strokeWidth="0.8" />
            </g>

            {/* Back Wheel (Spinning) */}
            <g style={{
              transformOrigin: '75px 65px',
              animation: !isPaused ? `spinner ${0.35 * (1 / speed)}s linear infinite` : 'none'
            }}>
              <circle cx="75" cy="65" r="11" stroke={isNight ? "#E8E8F0" : "#111118"} strokeWidth="2.2" fill="none" />
              <line x1="75" y1="54" x2="75" y2="76" stroke="#6B6B80" strokeWidth="0.8" />
              <line x1="64" y1="65" x2="86" y2="65" stroke="#6B6B80" strokeWidth="0.8" />
              <line x1="67.2" y1="57.2" x2="82.8" y2="72.8" stroke="#6B6B80" strokeWidth="0.8" />
              <line x1="67.2" y1="72.8" x2="82.8" y2="57.2" stroke="#6B6B80" strokeWidth="0.8" />
            </g>

            {/* Bicycle Frame */}
            <path
              d="M25 65 L45 65 L60 45 L75 65 M45 65 L50 40 L60 45 M50 40 L38 28"
              stroke={isNight ? "#00D4FF" : "#6C63FF"}
              strokeWidth="2.2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Handlebars & Seat */}
            <path d="M38 28 L32 28 M50 40 L45 40" stroke={isNight ? "#00D4FF" : "#6C63FF"} strokeWidth="2.0" fill="none" strokeLinecap="round" />

            {/* Pedal Crank Center */}
            <circle cx="45" cy="65" r="2.5" fill="#888" />

            {/* Pedaling Smiling Rider (Bobs up/down to simulate pedal cadence) */}
            <g className={`${!isPaused && 'animate-rider-bob'}`}>
              {/* Torso/Body */}
              <line x1="49" y1="40" x2="52" y2="25" stroke={isNight ? "#E8E8F0" : "#111118"} strokeWidth="5.0" strokeLinecap="round" />
              
              {/* Face/Head (Smiling!) */}
              <circle cx="53.5" cy="18" r="5.0" fill="#fcd34d" />
              {/* Smiling details */}
              <circle cx="52.0" cy="17" r="0.6" fill="#000" />
              <circle cx="55.0" cy="17" r="0.6" fill="#000" />
              <path d="M51.5 19.5 Q53.5 21.2 55.5 19.5" stroke="#000" strokeWidth="0.75" fill="none" strokeLinecap="round" />

              {/* Arms holding handlebars */}
              <path d="M50 30 L40 33 L35 28" stroke={isNight ? "#E8E8F0" : "#111118"} strokeWidth="1.8" fill="none" strokeLinecap="round" />
              
              {/* Leg / Pedals */}
              <path d="M49 40 L44 51 L45 65" stroke={isNight ? "#E8E8F0" : "#111118"} strokeWidth="2.2" fill="none" strokeLinecap="round" />
            </g>
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
            {isPaused ? 'RESUME COMMUTE' : 'PAUSE COMMUTE'}
          </button>
          
          <button
            onClick={() => setIsNight(!isNight)}
            className="px-5 py-2.5 rounded-lg bg-[#00D4FF]/20 border border-[#00D4FF]/40 text-[#00D4FF] hover:bg-[#00D4FF]/30 font-heading font-semibold text-xs tracking-wider transition-all"
          >
            {isNight ? 'DAYLIGHT ☀️' : 'NIGHT RIDE 🌙'}
          </button>
        </div>

        {/* Speed Controller Slider */}
        <div className="flex flex-col w-full md:w-fit items-start gap-1">
          <span className="font-mono text-[10px] text-[#6B6B80] uppercase tracking-wider">Cadence: {speed}x</span>
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
