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
        
        {/* 3D Character */}
        <div className="absolute inset-0 z-10 w-full h-full">
          <CharacterModel />
        </div>
      </div>

      {/* Skills details column (Right) */}
      <div className="what-box-in reveal-item w-full md:w-[50%] flex flex-col gap-10 relative z-20">
        
        {/* DEVELOP Card (High-Fidelity VS Code IDE clone) */}
        <div className="relative w-full p-4 sm:p-5 border border-dashed border-[#1E1E2E]/80 rounded bg-transparent group">
          {/* Corner Brackets */}
          <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white transition-all group-hover:w-4 group-hover:h-4"></span>
          <span className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-white transition-all group-hover:w-4 group-hover:h-4"></span>
          <span className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-white transition-all group-hover:w-4 group-hover:h-4"></span>
          <span className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white transition-all group-hover:w-4 group-hover:h-4"></span>

          <div className="w-full border border-[#1E1E2E] rounded-lg bg-[#0a0a0f] shadow-[0_20px_50px_rgba(0,0,0,0.65)] overflow-hidden flex flex-col">
            {/* VS Code Window Header Titlebar */}
            <div className="flex items-center justify-between px-3.5 py-2.5 bg-[#07070a] border-b border-[#1E1E2E]/80 select-none">
              <div className="flex items-center gap-1.5 w-1/4">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] opacity-90"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] opacity-90"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f] opacity-90"></span>
              </div>
              <span className="font-sans text-[10px] text-[#6B6B80] tracking-wide text-center">develop.json — Sumit-Portfolio</span>
              <div className="w-1/4"></div>
            </div>

            {/* VS Code Workspace Panels */}
            <div className="flex flex-row divide-x divide-[#1E1E2E]/60 min-h-[220px]">
              {/* File Explorer Sidebar (Desktop only) */}
              <div className="w-1/3 p-3 bg-[#07070a] font-sans text-[9px] text-[#6B6B80] select-none hidden sm:flex flex-col gap-3">
                <div className="font-bold uppercase tracking-wider text-[8px]">Explorer</div>
                <div className="flex flex-col gap-1.5 text-left pl-1">
                  <div className="flex items-center gap-1.5 text-[#E8E8F0] font-semibold">
                    <span>▼</span> <span className="text-[#6C63FF]">sumit-portfolio</span>
                  </div>
                  <div className="flex items-center gap-1.5 pl-3">
                    <span>▼</span> <span>src</span>
                  </div>
                  <div className="flex items-center gap-1.5 pl-6">
                    <span>▶</span> <span>components</span>
                  </div>
                  <div className="flex items-center gap-1.5 pl-6">
                    <span>▼</span> <span className="text-[#00D4FF]">data</span>
                  </div>
                  <div className="flex items-center gap-1.5 pl-9 text-[#eab308]">
                    <span>{`{}`}</span> <span className="font-bold border-b border-[#eab308]/50">develop.json</span>
                  </div>
                  <div className="flex items-center gap-1.5 pl-9">
                    <span>TS</span> <span>portfolio.ts</span>
                  </div>
                </div>
              </div>

              {/* Code Editor Area */}
              <div className="flex-1 flex flex-col bg-[#0a0a0f] overflow-hidden">
                {/* Editor Tabs bar */}
                <div className="flex bg-[#07070a] border-b border-[#1E1E2E]/40 text-[9px] font-sans text-[#6B6B80] select-none">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0a0a0f] border-t border-t-[#6C63FF] border-r border-[#1E1E2E]/40 text-[#E8E8F0]">
                    <span className="text-[#eab308]">{`{}`}</span>
                    <span>develop.json</span>
                    <span className="hover:text-red-500 cursor-pointer ml-1">×</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 border-r border-[#1E1E2E]/40 hover:bg-[#0e0e16]/30 cursor-pointer">
                    <span className="text-[#3178c6]">TS</span>
                    <span>portfolio.ts</span>
                  </div>
                </div>

                {/* Code viewport with syntax highlighting */}
                <div className="p-4 font-mono text-[9px] sm:text-xs leading-relaxed text-left overflow-x-auto bg-[#0a0a0f] text-[#E8E8F0] select-text">
                  <div className="flex">
                    <span className="text-[#6B6B80]/40 w-5 shrink-0 text-right pr-2 border-r border-[#1E1E2E]/30 select-none">1</span>
                    <span className="pl-3 text-[#c084fc]">{`{`}</span>
                  </div>
                  <div className="flex">
                    <span className="text-[#6B6B80]/40 w-5 shrink-0 text-right pr-2 border-r border-[#1E1E2E]/30 select-none">2</span>
                    <span className="pl-6"><span className="text-[#00D4FF]">"title"</span>: <span className="text-[#eab308]">"DEVELOPER"</span>,</span>
                  </div>
                  {/* Highlighted line */}
                  <div className="flex bg-[#6C63FF]/5 border-l border-l-[#6C63FF]">
                    <span className="text-[#6C63FF]/80 w-5 shrink-0 text-right pr-2 border-r border-[#1E1E2E]/30 select-none">3</span>
                    <span className="pl-6"><span className="text-[#00D4FF]">"description"</span>: <span className="text-[#10b981]">"Started building websites with JavaScript and PHP, now I craft them with TypeScript, React, Express, Node, .. and a little bit of magic!"</span>,</span>
                  </div>
                  <div className="flex">
                    <span className="text-[#6B6B80]/40 w-5 shrink-0 text-right pr-2 border-r border-[#1E1E2E]/30 select-none">4</span>
                    <span className="pl-6"><span className="text-[#00D4FF]">"environment"</span>: <span className="text-[#eab308]">"VS Code / Dark Theme"</span>,</span>
                  </div>
                  <div className="flex">
                    <span className="text-[#6B6B80]/40 w-5 shrink-0 text-right pr-2 border-r border-[#1E1E2E]/30 select-none">5</span>
                    <span className="pl-6"><span className="text-[#00D4FF]">"experience"</span>: <span className="text-[#6C63FF]">[</span><span className="text-[#eab308]">"Frontend"</span><span className="text-white">, </span><span className="text-[#eab308]">"Backend"</span><span className="text-white">, </span><span className="text-[#eab308]">"3D Graphics"</span><span className="text-[#6C63FF]">]</span></span>
                  </div>
                  <div className="flex">
                    <span className="text-[#6B6B80]/40 w-5 shrink-0 text-right pr-2 border-r border-[#1E1E2E]/30 select-none">6</span>
                    <span className="pl-3 text-[#c084fc]">{`}`}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* VS Code Bottom Status Bar */}
            <div className="flex items-center justify-between px-3.5 py-1 bg-[#6C63FF] text-white font-sans text-[8.5px] select-none">
              <div className="flex items-center gap-3 font-semibold">
                <div className="flex items-center gap-1">
                  <span>⊗</span> <span>0</span> <span>⚠</span> <span>0</span>
                </div>
                <span>main*</span>
              </div>
              <div className="flex items-center gap-3">
                <span>Ln 3, Col 12</span>
                <span>Spaces: 2</span>
                <span>UTF-8</span>
                <span className="font-bold">JSON</span>
              </div>
            </div>
          </div>
        </div>

        {/* DESIGN Card (High-Fidelity Figma Editor clone) */}
        <div className="relative w-full p-4 sm:p-5 border border-dashed border-[#1E1E2E]/80 rounded bg-transparent group">
          {/* Corner Brackets */}
          <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white transition-all group-hover:w-4 group-hover:h-4"></span>
          <span className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-white transition-all group-hover:w-4 group-hover:h-4"></span>
          <span className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-white transition-all group-hover:w-4 group-hover:h-4"></span>
          <span className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white transition-all group-hover:w-4 group-hover:h-4"></span>

          <div className="w-full border border-[#1E1E2E] rounded-lg bg-[#1e1e1e] shadow-[0_20px_50px_rgba(0,0,0,0.65)] overflow-hidden flex flex-col text-[#b3b3b3]">
            {/* Figma Top Toolbar */}
            <div className="flex items-center justify-between px-3 py-2 bg-[#2c2c2c] border-b border-[#151515] text-[10px] font-sans">
              <div className="flex items-center gap-4">
                {/* Figma Miniature Brand Logo */}
                <div className="flex flex-col gap-0.5 w-3 h-4 justify-center items-center select-none">
                  <div className="flex gap-0.5">
                    <span className="w-1.5 h-1.5 rounded-l-full bg-[#f24e1e]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff7262]" />
                  </div>
                  <div className="flex gap-0.5">
                    <span className="w-1.5 h-1.5 rounded-l-full bg-[#a259ff]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1abc9c]" />
                  </div>
                  <div className="flex gap-0.5 self-start">
                    <span className="w-1.5 h-1.5 rounded-l-full rounded-r-none bg-[#0acf83]" />
                  </div>
                </div>
                
                {/* Tool Selection set */}
                <div className="flex items-center gap-3.5 text-white/80 select-none">
                  {/* Select Tool (Active state - Figma Blue) */}
                  <div className="bg-[#0c8ce9] text-white p-1 rounded-sm flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
                      <path d="M4 2l15 11.2-6.5.8 4.2 6.5-2.2 1.2-4.2-6.5-6.3 5.3z" />
                    </svg>
                  </div>
                  {/* Region Tool (Frame #) */}
                  <span className="text-[12px] font-bold font-mono hover:text-white cursor-pointer px-1">#</span>
                  {/* Shape Tool */}
                  <svg className="w-2.5 h-2.5 fill-current hover:text-white cursor-pointer" viewBox="0 0 24 24">
                    <path d="M12 2L2 12l10 10 10-10z" />
                  </svg>
                  {/* Text Tool */}
                  <span className="font-serif text-[12px] leading-none hover:text-white cursor-pointer px-0.5">T</span>
                </div>
              </div>

              {/* Filename text */}
              <span className="text-[8px] text-white/35 font-mono tracking-widest uppercase">design-frame</span>

              {/* Collaboration Info & Zoom */}
              <div className="flex items-center gap-2 select-none">
                {/* User avatar indicator */}
                <div className="w-4.5 h-4.5 rounded-full bg-orange-500 text-white font-sans text-[8px] flex items-center justify-center font-bold border border-white/20">
                  S
                </div>
                <span className="text-[8.5px] font-sans text-white/55 bg-[#383838] px-1.5 py-0.5 rounded">84%</span>
              </div>
            </div>

            {/* Figma Content Viewport Workspace */}
            <div className="flex flex-row divide-x divide-[#151515] min-h-[170px]">
              {/* Layers List Panel (Left Side - Desktop only) */}
              <div className="w-[28%] p-3 bg-[#2c2c2c]/40 font-sans text-[9px] text-[#6B6B80] select-none text-left hidden sm:flex flex-col gap-2.5">
                <div className="font-bold text-[#E8E8F0]/80">Layers</div>
                <div className="flex flex-col gap-2 pl-1">
                  <div className="flex items-center gap-1.5 text-white/70">
                    <span className="text-[#0c8ce9]">#</span> <span className="font-bold">DESIGN</span>
                  </div>
                  <div className="flex items-center gap-1.5 pl-3.5">
                    <span className="font-serif text-[10px]">T</span> <span>Description</span>
                  </div>
                  <div className="flex items-center gap-1.5 pl-3.5">
                    <svg className="w-2 h-2 text-pink-500 fill-current" viewBox="0 0 24 24">
                      <path d="M4 2l15 11.2-6.5.8 4.2 6.5-2.2 1.2-4.2-6.5-6.3 5.3z" />
                    </svg>
                    <span>Sumit (Cursor)</span>
                  </div>
                </div>
              </div>

              {/* Design Canvas Pane */}
              <div className="flex-1 bg-[#1e1e1e] relative p-6 flex items-center justify-center overflow-hidden">
                {/* Dot Grid overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1.2px,transparent_1.2px)] [background-size:10px_10px] opacity-75"></div>

                {/* Selected Frame */}
                <div className="relative border-2 border-[#18a0fb] bg-[#18a0fb]/5 p-4 rounded max-w-sm text-left shadow-[0_5px_15px_rgba(0,0,0,0.35)]">
                  {/* Layer Frame Tag */}
                  <span className="absolute -top-[19px] -left-[2px] bg-[#18a0fb] text-white font-sans text-[8px] px-1.5 py-0.5 rounded-t font-extrabold tracking-wider">
                    DESIGN
                  </span>

                  {/* Red Alignment Guide line rulers (Figma feel) */}
                  <div className="absolute -left-12 top-1/2 w-12 border-t border-dashed border-red-500 pointer-events-none select-none">
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-[8px] text-red-400 font-mono">120px</span>
                  </div>

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

                {/* Collaborative User Cursor pointer tag */}
                <div className="absolute bottom-[10%] right-[10%] z-30 flex flex-col items-start select-none pointer-events-none animate-bounce">
                  <svg className="w-3.5 h-3.5 text-[#ff7096] fill-current drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]" viewBox="0 0 24 24">
                    <path d="M4 2l15 11.2-6.5.8 4.2 6.5-2.2 1.2-4.2-6.5-6.3 5.3z" />
                  </svg>
                  <span className="bg-[#ff7096] text-white font-sans text-[8px] font-bold px-1.5 py-0.5 rounded shadow ml-2.5 -mt-0.5">
                    Sumit
                  </span>
                </div>
              </div>

              {/* Right Properties Panel (Desktop only) */}
              <div className="w-[28%] p-3 bg-[#2c2c2c]/40 font-sans text-[9px] text-[#6B6B80] select-none text-left hidden lg:flex flex-col gap-2.5">
                <div className="font-bold text-[#E8E8F0]/80">Properties</div>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between border-b border-[#151515] pb-1 text-[8px] uppercase tracking-wider text-[#6B6B80]/70 font-bold">Align</div>
                  <div className="flex items-center gap-1.5 text-white/50 text-[8px]">
                    <span>⫷ Left</span> <span>⫸ Horizontal</span>
                  </div>
                  <div className="flex justify-between border-b border-[#151515] pb-1 text-[8px] uppercase tracking-wider text-[#6B6B80]/70 font-bold mt-1">Frame</div>
                  <div className="flex justify-between text-[#808080]">
                    <span>W: 280</span> <span>H: 110</span>
                  </div>
                  <div className="flex justify-between text-[#808080]">
                    <span>X: 120</span> <span>Y: 340</span>
                  </div>
                  <div className="flex justify-between border-b border-[#151515] pb-1 text-[8px] uppercase tracking-wider text-[#6B6B80]/70 font-bold mt-1">Fill</div>
                  <div className="flex items-center gap-1 text-[#E8E8F0]/90">
                    <span className="w-2.5 h-2.5 rounded bg-[#18a0fb]/20 border border-[#18a0fb]/40" />
                    <span>#18A0FB (5%)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Skills;
