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

  const colorMap: Record<string, string> = {
    'React': '#00d8ff',
    'TypeScript': '#3178c6',
    'Node.js': '#339933',
    'Python': '#3776ab',
    'Three.js': '#fbbf24',
    'GSAP': '#88ce02',
    'REST APIs': '#ff6c37',
    'Git': '#f05032',
    'Docker': '#2496ed',
    'Tailwind CSS': '#38bdf8',
    'HTML5/CSS3': '#e34f26',
    'FastAPI': '#009688',
    'Next.js': '#a855f7',
    'MongoDB': '#10b981',
    'PostgreSQL': '#3b82f6',
    'AWS': '#f97316',
    'Express': '#6b7280',
    'GraphQL': '#ec4899',
  };

  // Double the tech list to achieve a seamless conveyor belt marquee loop
  const doubledSkills = useMemo(() => [...skills, ...skills], [skills]);

  // Birds configuration
  const birds = [
    { top: '12%', size: 'scale-[0.55]', delay: 0, duration: 18 },
    { top: '22%', size: 'scale-[0.45]', delay: 5, duration: 22 },
    { top: '15%', size: 'scale-[0.65]', delay: 10, duration: 15 }
  ];

  // Common play state styling helper
  const getPlayState = (baseDuration: number) => ({
    animationPlayState: isPaused ? 'paused' : 'running',
    animationDuration: `${baseDuration * (1 / speed)}s`,
  });

  return (
    <section
      id="techstack"
      ref={containerRef}
      className="py-20 md:py-36 px-6 md:px-12 max-w-6xl mx-auto overflow-hidden relative select-none"
    >
      {/* Conveyor Marquee, Pedaling, and Bobbing CSS */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scroll-scenery-loop {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        @keyframes wing-flap {
          0%, 100% { transform: scaleY(1.0); }
          50% { transform: scaleY(-0.7); }
        }
        @keyframes bird-fly-across {
          0% { transform: translate3d(600px, 0, 0); }
          100% { transform: translate3d(-1000px, 0, 0); }
        }
        @keyframes motorcycle-idle-vibrate {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(0, -1px, 0); }
        }
        @keyframes shadow-shrink {
          0%, 100% { transform: scale(1.0); opacity: 0.25; }
          50% { transform: scale(0.9); opacity: 0.18; }
        }
        @keyframes spinner-wheel {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }

        .animate-scroll-clouds {
          animation: scroll-scenery-loop linear infinite;
        }
        .animate-scroll-hills {
          animation: scroll-scenery-loop linear infinite;
        }
        .animate-scroll-street-conveyor {
          animation: scroll-scenery-loop linear infinite;
        }
        .animate-scroll-road {
          animation: scroll-scenery-loop linear infinite;
        }
        .animate-motorcycle-rumble {
          animation: motorcycle-idle-vibrate 0.08s ease-in-out infinite;
        }
        .animate-shadow-bob {
          animation: shadow-shrink ease-in-out infinite;
        }
        .animate-wing-flap {
          animation: wing-flap 0.32s ease-in-out infinite;
          transform-origin: center;
        }
        .animate-bird-fly {
          animation: bird-fly-across linear infinite;
        }
        .animate-wheel-spin {
          animation: spinner-wheel linear infinite;
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
          Sumit is cruising along the city street on his motorcycle. Watch the birds fly and inspect the skills listed on passing buildings!
        </p>
      </div>

      {/* 2D Landscape Viewport */}
      <div
        className={`reveal-item w-full h-[45vh] md:h-[55vh] border border-[#1E1E2E]/60 rounded-2xl relative overflow-hidden flex flex-col justify-end shadow-2xl transition-colors duration-700 ${
          isNight
            ? 'bg-gradient-to-b from-indigo-950 via-purple-900 to-orange-800'
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
              top: b.top,
              animationPlayState: isPaused ? 'paused' : 'running',
              animationDelay: `${b.delay * (1 / speed)}s`,
              animationDuration: `${b.duration * (1 / speed)}s`,
            }}
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
          style={getPlayState(46)}
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
          className="absolute inset-x-0 bottom-[65px] h-24 flex whitespace-nowrap pointer-events-none opacity-80 animate-scroll-hills"
          style={getPlayState(28)}
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

        {/* Conveyor Marquee Scenery Layer: Tech Buildings & Roadside Trees with clean gaps */}
        <div
          className="absolute bottom-[60px] h-64 z-20 flex flex-row items-end gap-24 md:gap-32 w-[200%] whitespace-nowrap animate-scroll-street-conveyor px-8"
          style={getPlayState(30)}
        >
          {doubledSkills.map((skill, idx) => {
            const isDevelop = skillCategories[skill] === 'DEVELOP';
            const color = colorMap[skill] || '#6C63FF';
            // Alternate building heights and roof profiles
            const heightClass = idx % 3 === 0 ? 'h-36 md:h-52' : idx % 3 === 1 ? 'h-44 md:h-60' : 'h-52 md:h-72';
            const buildingStyle = idx % 2 === 0 ? 'rounded-t-lg' : 'rounded-t-none';

            return (
              <div
                key={idx}
                className="flex items-end gap-10 shrink-0 select-none pointer-events-auto cursor-pointer"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                {/* Building Frame with Architectural Details */}
                <div
                  className={`w-32 md:w-36 ${heightClass} ${buildingStyle} border-t-2 border-x border-white/10 p-2.5 flex flex-col justify-between relative shadow-lg hover:border-white/30 hover:scale-[1.02] transition-all duration-300`}
                  style={{
                    backgroundColor: isNight ? '#11111a' : '#eae5ec',
                  }}
                >
                  {/* Roof decorations (spires, water towers, HVAC) */}
                  <div className="absolute top-[-16px] left-4 flex items-end gap-2 pointer-events-none">
                    {idx % 3 === 0 && (
                      /* Metal Antenna spire with flashing warning light */
                      <div className="w-[2px] h-4 bg-neutral-500 relative">
                        <div className="absolute top-0 left-[-2px] w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></div>
                      </div>
                    )}
                    {idx % 3 === 1 && (
                      /* Roof water tank */
                      <div className="flex flex-col items-center">
                        <div className="w-5 h-4 bg-neutral-600 rounded border border-white/10"></div>
                        <div className="w-4 h-1 bg-neutral-700"></div>
                      </div>
                    )}
                    {idx % 3 === 2 && (
                      /* HVAC air conditioning unit */
                      <div className="w-6 h-3 bg-neutral-600 rounded border border-white/5"></div>
                    )}
                  </div>

                  {/* Window Grid with Individual Panes */}
                  <div className="grid grid-cols-3 gap-2 w-full opacity-70">
                    {[...Array(6)].map((_, wIdx) => {
                      const isLit = isNight && (idx + wIdx) % 3 !== 0;
                      return (
                        <div
                          key={wIdx}
                          className={`w-3.5 h-4 rounded-sm border transition-all duration-500 relative overflow-hidden ${
                            isLit 
                              ? 'bg-yellow-100 border-yellow-300 shadow-[0_0_8px_rgba(253,224,71,0.4)]' 
                              : 'bg-neutral-800 border-neutral-700'
                          }`}
                        >
                          {/* Inner Pane divider */}
                          <div className="absolute inset-x-0 top-1.5 h-[1px] bg-neutral-600/30"></div>
                          <div className="absolute inset-y-0 left-1.5 w-[1px] bg-neutral-600/30"></div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Shop storefront banner with striped awning */}
                  <div className="w-full relative flex flex-col items-center mt-2">
                    {/* Awning Canopy */}
                    <div 
                      className="w-[108%] h-2.5 rounded-t border-b border-white/20 shadow-md relative z-10"
                      style={{ backgroundColor: color }}
                    ></div>
                    
                    {/* Storefront Signboard */}
                    <div
                      className="w-full py-1.5 rounded-b border-x border-b text-center font-heading font-black text-[9px] md:text-[10px] tracking-wider shadow-md bg-[#0a0a0f]"
                      style={{
                        borderColor: color,
                        color: color,
                        boxShadow: `0 3px 8px ${color}25`
                      }}
                    >
                      {skill.toUpperCase()}
                      <span className="block text-[5px] font-mono opacity-60 tracking-widest mt-0.5">
                        {isDevelop ? 'DEV // BACK' : 'DSN // FRONT'}
                      </span>
                    </div>
                  </div>

                  {/* Storefront Entry Door & Window Pane */}
                  <div className="w-full h-10 border-t border-neutral-600/10 mt-1 flex items-end justify-between px-1 pointer-events-none">
                    {/* Double glass doors */}
                    <div className="w-6 h-9 border border-neutral-600/30 rounded-t flex justify-center items-center">
                      <div className="w-[1px] h-full bg-neutral-600/30"></div>
                    </div>
                    {/* Display window showing OPEN sign */}
                    <div className="w-10 h-7 border border-neutral-600/30 rounded-sm bg-black/10 flex items-center justify-center">
                      <span className="text-[5px] opacity-35 font-mono">OPEN</span>
                    </div>
                  </div>

                  {/* Sidewalk Leafy Plant Pot */}
                  <div className="absolute bottom-0 left-[-8px] w-3 flex flex-col items-center pointer-events-none z-10">
                    <div className={`w-3.5 h-3.5 rounded-full ${isNight ? 'bg-emerald-950' : 'bg-emerald-500'} opacity-80`} />
                    <div className="w-2.5 h-2 bg-amber-700 rounded-b-sm border-t border-amber-600" />
                  </div>
                </div>

                {/* Roadside Green Tree (Spaced between buildings) */}
                <div className="flex flex-col items-center pointer-events-none pb-0.5">
                  {/* Canopy */}
                  <div className={`w-8 h-8 rounded-full border border-white/5 shadow-md ${isNight ? 'bg-green-950' : 'bg-green-500'}`}></div>
                  {/* Trunk */}
                  <div className="w-1 h-3 bg-amber-800"></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Sidewalk & Asphalt Road */}
        <div
          className="w-[200%] h-[60px] bg-[#22222a] border-t-[4px] border-[#3b3b4f] shrink-0 z-30 flex whitespace-nowrap animate-scroll-road"
          style={getPlayState(1.5)}
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

        {/* Dynamic Vector SVG Cruiser Motorcycle (Flipped horizontally via scale-x-[-1] to travel right) */}
        <div
          className={`absolute left-[18%] bottom-[52px] w-24 md:w-28 z-40 transition-all duration-300 select-none scale-x-[-1]`}
        >
          {/* Animated Ground Shadow */}
          <div
            className="absolute bottom-[-2px] left-[15%] w-16 h-1.5 bg-black rounded-full filter blur-[1px]"
            style={{
              animationPlayState: isPaused ? 'paused' : 'running',
              animationDuration: `${0.42 * (1 / speed)}s`,
              animationName: 'shadow-shrink',
              animationIterationCount: 'infinite'
            }}
          ></div>

          {/* Motorcycle rumble frame */}
          <div className={`${!isPaused && 'animate-motorcycle-rumble'}`}>
            <svg className="w-full h-auto drop-shadow-md relative z-10" viewBox="0 0 100 80" fill="none">
              {/* Rear Wheel (Left inside SVG) */}
              <g
                className={`${!isPaused && 'animate-wheel-spin'}`}
                style={{
                  transformOrigin: '25px 62px',
                  animationDuration: `${0.2 * (1 / speed)}s`
                }}
              >
                <circle cx="25" cy="62" r="12" stroke="#1c1917" strokeWidth="4.5" fill="none" />
                <circle cx="25" cy="62" r="9" stroke="#78716c" strokeWidth="1.5" fill="none" />
                {/* Spokes */}
                <line x1="25" y1="50" x2="25" y2="74" stroke="#d6d3d1" strokeWidth="1" />
                <line x1="13" y1="62" x2="37" y2="62" stroke="#d6d3d1" strokeWidth="1" />
              </g>

              {/* Front Wheel (Right inside SVG) */}
              <g
                className={`${!isPaused && 'animate-wheel-spin'}`}
                style={{
                  transformOrigin: '75px 62px',
                  animationDuration: `${0.2 * (1 / speed)}s`
                }}
              >
                <circle cx="75" cy="62" r="12" stroke="#1c1917" strokeWidth="4.5" fill="none" />
                <circle cx="75" cy="62" r="9" stroke="#78716c" strokeWidth="1.5" fill="none" />
                {/* Spokes */}
                <line x1="75" y1="50" x2="75" y2="74" stroke="#d6d3d1" strokeWidth="1" />
                <line x1="63" y1="62" x2="87" y2="62" stroke="#d6d3d1" strokeWidth="1" />
              </g>

              {/* Exhaust Fume Puff Particles (Animates at tailpipe end 20,62) */}
              {!isPaused && (
                <g className="opacity-70">
                  <circle cx="14" cy="62" r="1.5" fill="#a8a29e" className="animate-ping" style={{ animationDuration: '0.8s' }} />
                  <circle cx="9" cy="63" r="2.5" fill="#d6d3d1" className="animate-pulse" style={{ animationDuration: '0.6s' }} />
                </g>
              )}

              {/* Mechanical Engine Block & Chrome Exhaust */}
              <rect x="42" y="52" width="16" height="12" rx="2" fill="#57534e" stroke="#292524" strokeWidth="1" />
              {/* Cooling Fins details */}
              <line x1="42" y1="55" x2="58" y2="55" stroke="#a8a29e" strokeWidth="1" />
              <line x1="42" y1="58" x2="58" y2="58" stroke="#a8a29e" strokeWidth="1" />
              {/* Exhaust Pipe */}
              <path d="M48 60 Q35 64 20 62" stroke="#d6d3d1" strokeWidth="2.5" fill="none" strokeLinecap="round" />

              {/* Chassis Frame & Front Forks */}
              <path d="M25 62 L42 62 M42 54 L65 42 M58 62 L75 62" stroke="#292524" strokeWidth="2.5" fill="none" />
              {/* Front Fork */}
              <line x1="75" y1="62" x2="68" y2="34" stroke="#d6d3d1" strokeWidth="2.5" strokeLinecap="round" />
              {/* Handlebars */}
              <line x1="68" y1="34" x2="62" y2="34" stroke="#1c1917" strokeWidth="2.2" strokeLinecap="round" />

              {/* Curved Sporty Fuel Tank */}
              <path d="M48 44 Q58 38 68 44 L66 50 Q56 50 48 48 Z" fill={isNight ? "#00D4FF" : "#6C63FF"} stroke="#292524" strokeWidth="1" />

              {/* Elongated Leather Cruiser Seat */}
              <path d="M36 48 C40 47 44 47 48 48 C46 51 40 51 36 50 Z" fill="#1c1917" stroke="#292524" strokeWidth="1.2" />

              {/* Front Headlight & Red LED Tail Light */}
              <circle cx="70" cy="38" r="3.5" fill="#fcd34d" />
              <rect x="33" y="47" width="2" height="4" fill="#ef4444" />

              {/* Headlight Beam Cone (in Night Mode) */}
              {isNight && (
                <polygon points="70,38 110,25 110,65" fill="url(#bike-light-cone-motorcycle)" fillOpacity="0.25" />
              )}

              {/* Cruising Motorcycle Rider (Designed to look real: Leather jacket, visor helmet, sporty posture) */}
              <g>
                {/* Torso / Back (Leather riding jacket) */}
                <path d="M44 46 Q54 44 58 32" stroke="#1c1917" strokeWidth="6" strokeLinecap="round" fill="none" />
                {/* Jacket overlay highlight */}
                <path d="M44 46 Q54 44 58 32" stroke={isNight ? "#00D4FF" : "#6C63FF"} strokeWidth="4.5" strokeLinecap="round" fill="none" />
                
                {/* Helmet (Cyan/Violet base with dark visor) */}
                <circle cx="58" cy="22" r="6" fill={isNight ? "#00D4FF" : "#6C63FF"} />
                {/* Dark Visor */}
                <path d="M62 18 A 5 5 0 0 1 63 25" stroke="#1c1917" strokeWidth="2" fill="none" strokeLinecap="round" />
                
                {/* Hands/Arms (Gripping handlebars 68,34) */}
                <path d="M56 30 Q64 32 68 34" stroke="#1c1917" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                
                {/* Legs (Bent around the fuel tank onto the footpegs) */}
                <path d="M44 46 L53 54 L51 60" stroke="#1c1917" strokeWidth="3" fill="none" strokeLinecap="round" />
              </g>

              {/* Gradients */}
              <defs>
                <linearGradient id="bike-light-cone-motorcycle" x1="70" y1="38" x2="110" y2="45" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#ffea75" />
                  <stop offset="100%" stopColor="#ffea75" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>

      {/* Interactive Controls Panel */}
      <div className="reveal-item max-w-lg mx-auto mt-8 p-6 bg-[#111118]/70 border border-[#1E1E2E] rounded-xl flex flex-col md:flex-row items-center justify-between gap-6 z-10 relative">
        
        {/* Commute & Daylight Buttons */}
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
