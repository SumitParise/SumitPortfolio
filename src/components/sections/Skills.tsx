import useScrollReveal from '../../hooks/useScrollReveal';
import CharacterModel from '../Character';

const Skills = () => {
  const containerRef = useScrollReveal<HTMLDivElement>();

  return (
    <section
      id="skills"
      ref={containerRef}
      className="whatIDO py-20 md:py-32 px-6 md:px-12 max-w-6xl mx-auto flex flex-col md:flex-row gap-12 md:gap-16 items-center justify-between overflow-hidden"
    >
      {/* Title & 3D Character Column (Left/Center) */}
      <div className="reveal-item w-full md:w-1/2 flex items-center justify-center relative min-h-[380px] md:min-h-[480px]">
        {/* Background "WHAT I DO" text */}
        <div className="absolute left-0 top-[22%] z-0 font-heading font-black text-6xl md:text-[7.5rem] leading-[0.8] uppercase select-none text-white/5 flex flex-col items-start">
          <span>WHAT</span>
          <span className="text-[#6C63FF]/10">I DO</span>
        </div>
        
        {/* 3D Character (Desktop) */}
        <div className="hidden md:block absolute inset-0 z-10 w-full h-full">
          <CharacterModel />
        </div>

        {/* Overlapping 3D developer character (mobile only backup) */}
        <div className="md:hidden relative z-10 w-[280px] md:w-[390px] h-auto pointer-events-none translate-x-[50px] md:translate-x-[70px] translate-y-[10px]">
          <img
            src="/developer_3d.png"
            alt="3D Developer at desk"
            className="w-full h-auto object-contain drop-shadow-[0_10px_35px_rgba(0,0,0,0.6)]"
          />
        </div>
      </div>

      {/* Skills details column (Right) */}
      <div className="what-box-in reveal-item w-full md:w-[48%] flex flex-col gap-8 relative z-20">
        
        {/* DEVELOP Card (IDE Style with JSON Data) */}
        <div className="relative w-full p-4 sm:p-6 border border-dashed border-[#1E1E2E]/80 rounded bg-transparent group">
          {/* Corner Brackets */}
          <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white transition-all group-hover:w-4 group-hover:h-4"></span>
          <span className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-white transition-all group-hover:w-4 group-hover:h-4"></span>
          <span className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-white transition-all group-hover:w-4 group-hover:h-4"></span>
          <span className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white transition-all group-hover:w-4 group-hover:h-4"></span>

          <div className="w-full border border-[#1E1E2E] rounded-lg bg-[#0b0b12]/95 shadow-[0_15px_35px_rgba(0,0,0,0.5)] overflow-hidden">
            {/* Mock IDE Title Bar */}
            <div className="flex items-center justify-between px-3.5 py-2.5 bg-[#07070b] border-b border-[#1E1E2E]/80 select-none">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#ff5f56] opacity-90"></span>
                <span className="w-2 h-2 rounded-full bg-[#ffbd2e] opacity-90"></span>
                <span className="w-2 h-2 rounded-full bg-[#27c93f] opacity-90"></span>
              </div>
              <span className="font-mono text-[9px] text-[#6B6B80] tracking-widest uppercase">develop.json</span>
              <div className="w-8"></div>
            </div>

            {/* IDE Editor Pane */}
            <div className="p-4 font-mono text-[10px] sm:text-xs leading-relaxed text-left overflow-x-auto bg-[#0a0a0f] text-[#E8E8F0] select-text">
              <div className="flex">
                <span className="text-[#6B6B80]/50 w-5 shrink-0 text-right pr-2 border-r border-[#1E1E2E]/50 select-none">1</span>
                <span className="pl-3 text-[#c084fc]">{`{`}</span>
              </div>
              <div className="flex">
                <span className="text-[#6B6B80]/50 w-5 shrink-0 text-right pr-2 border-r border-[#1E1E2E]/50 select-none">2</span>
                <span className="pl-6"><span className="text-[#00D4FF]">"title"</span>: <span className="text-[#eab308]">"DEVELOPER"</span>,</span>
              </div>
              <div className="flex">
                <span className="text-[#6B6B80]/50 w-5 shrink-0 text-right pr-2 border-r border-[#1E1E2E]/50 select-none">3</span>
                <span className="pl-6"><span className="text-[#00D4FF]">"description"</span>: <span className="text-[#10b981]">"Started building websites with JavaScript and PHP, now I craft them with TypeScript, React, Express, Node, .. and a little bit of magic!"</span>,</span>
              </div>
              <div className="flex">
                <span className="text-[#6B6B80]/50 w-5 shrink-0 text-right pr-2 border-r border-[#1E1E2E]/50 select-none">4</span>
                <span className="pl-6"><span className="text-[#00D4FF]">"environment"</span>: <span className="text-[#eab308]">"VS Code / Dark Theme"</span>,</span>
              </div>
              <div className="flex">
                <span className="text-[#6B6B80]/50 w-5 shrink-0 text-right pr-2 border-r border-[#1E1E2E]/50 select-none">5</span>
                <span className="pl-6"><span className="text-[#00D4FF]">"experience"</span>: <span className="text-[#6C63FF]">[</span><span className="text-[#eab308]">"Frontend"</span><span className="text-white">, </span><span className="text-[#eab308]">"Backend"</span><span className="text-white">, </span><span className="text-[#eab308]">"3D Graphics"</span><span className="text-[#6C63FF]">]</span></span>
              </div>
              <div className="flex">
                <span className="text-[#6B6B80]/50 w-5 shrink-0 text-right pr-2 border-r border-[#1E1E2E]/50 select-none">6</span>
                <span className="pl-3 text-[#c084fc]">{`}`}</span>
              </div>
            </div>
          </div>
        </div>

        {/* DESIGN Card (Figma Canvas Style) */}
        <div className="relative w-full p-4 sm:p-6 border border-dashed border-[#1E1E2E]/80 rounded bg-transparent group">
          {/* Corner Brackets */}
          <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white transition-all group-hover:w-4 group-hover:h-4"></span>
          <span className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-white transition-all group-hover:w-4 group-hover:h-4"></span>
          <span className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-white transition-all group-hover:w-4 group-hover:h-4"></span>
          <span className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white transition-all group-hover:w-4 group-hover:h-4"></span>

          <div className="w-full border border-[#1E1E2E] rounded-lg bg-[#1e1e1e] shadow-[0_15px_35px_rgba(0,0,0,0.5)] overflow-hidden text-[#b3b3b3] select-none">
            {/* Figma Header Bar */}
            <div className="flex items-center justify-between px-3 py-2 bg-[#2c2c2c] border-b border-[#151515] text-[10px] font-sans">
              <div className="flex items-center gap-3">
                {/* Figma Icon Grid style */}
                <div className="flex flex-col gap-0.5 w-3 h-3 justify-center items-center">
                  <div className="flex gap-0.5">
                    <span className="w-1 h-1 rounded-full bg-[#f24e1e]" />
                    <span className="w-1 h-1 rounded-full bg-[#a259ff]" />
                  </div>
                  <div className="flex gap-0.5">
                    <span className="w-1 h-1 rounded-full bg-[#0acf83]" />
                    <span className="w-1 h-1 rounded-full bg-[#1abc9c]" />
                  </div>
                </div>
                {/* Toolbar Tools */}
                <div className="flex items-center gap-3 text-white/80">
                  {/* Select Tool Icon */}
                  <svg className="w-2.5 h-2.5 text-[#00D4FF] fill-current" viewBox="0 0 24 24">
                    <path d="M4 2l15 11.2-6.5.8 4.2 6.5-2.2 1.2-4.2-6.5-6.3 5.3z" />
                  </svg>
                  {/* Frame Tool Icon */}
                  <span className="text-[11px] font-bold font-mono">#</span>
                  {/* Pencil/Shape */}
                  <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
                    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z" />
                  </svg>
                  {/* Text Tool */}
                  <span className="font-serif text-[11px] leading-none">T</span>
                </div>
              </div>
              <span className="text-[8px] text-white/30 font-mono tracking-wider uppercase">figma-canvas</span>
              <div className="flex gap-1.5 items-center">
                <span className="text-[8.5px] font-sans text-white/55 bg-[#383838] px-1.5 py-0.5 rounded">92%</span>
              </div>
            </div>

            {/* Figma Canvas Pane */}
            <div className="p-6 bg-[#1e1e1e] relative min-h-[160px] flex items-center justify-center overflow-hidden">
              {/* Dot Grid overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff04_1px,transparent_1px)] [background-size:10px_10px] opacity-75"></div>

              {/* Selected Frame */}
              <div className="relative border-2 border-[#18a0fb] bg-[#18a0fb]/5 p-5 rounded max-w-sm text-left shadow-[0_5px_15px_rgba(0,0,0,0.3)]">
                {/* Layer Frame Label */}
                <span className="absolute -top-[19px] -left-[2px] bg-[#18a0fb] text-white font-sans text-[8px] px-1.5 py-0.5 rounded-t font-bold tracking-wider">
                  DESIGN
                </span>

                {/* Sizing Handles */}
                <span className="absolute -top-[4px] -left-[4px] w-1.5 h-1.5 border border-[#18a0fb] bg-white rounded-sm"></span>
                <span className="absolute -top-[4px] -right-[4px] w-1.5 h-1.5 border border-[#18a0fb] bg-white rounded-sm"></span>
                <span className="absolute -bottom-[4px] -left-[4px] w-1.5 h-1.5 border border-[#18a0fb] bg-white rounded-sm"></span>
                <span className="absolute -bottom-[4px] -right-[4px] w-1.5 h-1.5 border border-[#18a0fb] bg-white rounded-sm"></span>

                {/* Text Content */}
                <p className="text-white text-[11px] sm:text-xs font-sans leading-relaxed">
                  I started designing as my hobby, but like all good hobbies, it slowly crept into my career—now it won't leave me alone!
                </p>
              </div>

              {/* Designer cursor tag */}
              <div className="absolute bottom-[12%] right-[10%] z-30 flex flex-col items-start select-none pointer-events-none animate-bounce">
                <svg className="w-3.5 h-3.5 text-[#ff7096] fill-current drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]" viewBox="0 0 24 24">
                  <path d="M4 2l15 11.2-6.5.8 4.2 6.5-2.2 1.2-4.2-6.5-6.3 5.3z" />
                </svg>
                <span className="bg-[#ff7096] text-white font-sans text-[8px] font-bold px-1.5 py-0.5 rounded shadow ml-2.5 -mt-0.5">
                  Sumit
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Skills;
