import useScrollReveal from '../../hooks/useScrollReveal';
import CharacterModel from '../Character';

const Skills = () => {
  const containerRef = useScrollReveal<HTMLDivElement>();

  return (
    <section
      id="skills"
      ref={containerRef}
      className="whatIDO py-20 md:py-32 px-6 md:px-12 max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 md:gap-16 items-center justify-between overflow-hidden"
    >
      {/* Title & 3D Character Column (Left/Center) */}
      <div className="reveal-item w-full lg:w-1/2 flex items-center justify-center relative min-h-[380px] md:min-h-[480px]">
        {/* Background "WHAT I DO" text */}
        <div className="absolute left-0 top-[22%] z-0 font-heading font-black text-6xl md:text-[7.5rem] leading-[0.8] uppercase select-none text-white/5 flex flex-col items-start">
          <span>WHAT</span>
          <span className="text-[#6C63FF]/10">I DO</span>
        </div>
        
        {/* 3D Character (Desktop) */}
        <div className="hidden lg:block absolute inset-0 z-10 w-full h-full">
          <CharacterModel />
        </div>

        {/* Overlapping 3D developer character (mobile only backup) */}
        <div className="lg:hidden relative z-10 w-[280px] md:w-[390px] h-auto pointer-events-none translate-x-[50px] md:translate-x-[70px] translate-y-[10px]">
          <img
            src="/developer_3d.png"
            alt="3D Developer at desk"
            className="w-full h-auto object-contain drop-shadow-[0_10px_35px_rgba(0,0,0,0.6)]"
          />
        </div>
      </div>

      {/* Skills details column (Right) */}
      <div className="what-box-in reveal-item w-full lg:w-[45%] flex flex-col gap-6 relative z-20">
        
        {/* DEVELOP Card */}
        <div className="relative w-full p-8 border border-dashed border-[#1E1E2E]/80 rounded bg-transparent group">
          {/* Corner Brackets */}
          <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white transition-all group-hover:w-4 group-hover:h-4"></span>
          <span className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-white transition-all group-hover:w-4 group-hover:h-4"></span>
          <span className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-white transition-all group-hover:w-4 group-hover:h-4"></span>
          <span className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white transition-all group-hover:w-4 group-hover:h-4"></span>

          <div className="text-left pr-10">
            <h4 className="font-heading font-black text-2xl md:text-3xl text-white uppercase tracking-widest mb-1">
              DEVELOP
            </h4>
            <p className="font-mono text-[9px] text-[#6B6B80] uppercase tracking-wider mb-4">
              Description
            </p>
            <p className="text-[#B5B5C3] font-sans text-xs md:text-sm leading-relaxed">
              Started building websites with JavaScript and PHP, now I craft them with TypeScript, React, Express, Node, .. and a little bit of magic!
            </p>
          </div>

          {/* Action button */}
          <div className="absolute bottom-6 right-6 w-8 h-8 border border-[#1E1E2E] rounded flex items-center justify-center text-white/60 group-hover:text-white group-hover:border-white/50 transition-colors cursor-pointer">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* DESIGN Card */}
        <div className="relative w-full p-8 border border-dashed border-[#1E1E2E]/80 rounded bg-transparent group">
          {/* Corner Brackets */}
          <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white transition-all group-hover:w-4 group-hover:h-4"></span>
          <span className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-white transition-all group-hover:w-4 group-hover:h-4"></span>
          <span className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-white transition-all group-hover:w-4 group-hover:h-4"></span>
          <span className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white transition-all group-hover:w-4 group-hover:h-4"></span>

          <div className="text-left pr-10">
            <h4 className="font-heading font-black text-2xl md:text-3xl text-white uppercase tracking-widest mb-1">
              DESIGN
            </h4>
            <p className="font-mono text-[9px] text-[#6B6B80] uppercase tracking-wider mb-4">
              Description
            </p>
            <p className="text-[#B5B5C3] font-sans text-xs md:text-sm leading-relaxed">
              I started designing as my hobby, but like all good hobbies, it slowly crept into my career—now it won't leave me alone!
            </p>
          </div>

          {/* Action button */}
          <div className="absolute bottom-6 right-6 w-8 h-8 border border-[#1E1E2E] rounded flex items-center justify-center text-white/60 group-hover:text-white group-hover:border-white/50 transition-colors cursor-pointer">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Skills;
