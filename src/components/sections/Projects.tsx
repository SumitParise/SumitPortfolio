import useScrollReveal from '../../hooks/useScrollReveal';
import { PORTFOLIO } from '../../data/portfolio';

const Projects = () => {
  const containerRef = useScrollReveal<HTMLDivElement>({ stagger: 0.1 });

  // Format index (e.g., 0 -> "01", 1 -> "02")
  const formatIndex = (index: number) => `0${index + 1}`.slice(-2);

  return (
    <section
      id="projects"
      ref={containerRef}
      className="py-20 md:py-36 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Title */}
      <div className="flex flex-col items-start mb-20 pl-0 md:pl-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-10 h-[2px] bg-[#6C63FF]"></span>
          <span className="font-mono text-sm tracking-widest text-[#6C63FF] uppercase font-semibold">
            Work
          </span>
        </div>
        
        <h3 className="text-4xl md:text-6xl font-heading font-extrabold text-white leading-none">
          My <span className="text-[#6C63FF] italic font-semibold">Work</span>
        </h3>
      </div>

      {/* Horizontal Scroll Layout (Expanded dimensions) */}
      <div className="reveal-item flex flex-row overflow-x-auto gap-10 md:gap-16 pb-12 scrollbar-thin scrollbar-thumb-[#1E1E2E] scrollbar-track-transparent">
        {PORTFOLIO.projects.map((project, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <article
              key={idx}
              className="w-[330px] md:w-[500px] shrink-0 flex flex-col justify-between border-r border-[#1E1E2E]/60 pr-10 md:pr-16 last:border-r-0 last:pr-0 group"
            >
              {/* Alternating Layout: Media Top for Even, Details Top for Odd */}
              {isEven ? (
                // Even Layout: Media at Top, Details at Bottom
                <div className="flex flex-col gap-8 h-full justify-between">
                  
                  {/* Browser Mockup Preview - Dashboard Visual */}
                  <div className="w-full aspect-[16/10] bg-[#0c0c12] border border-[#1E1E2E] rounded-2xl overflow-hidden flex flex-col shadow-[0_20px_50px_rgba(0,0,0,0.4)] relative group transition-all duration-500 hover:border-[#00D4FF]/50 hover:shadow-[0_20px_50px_rgba(0,212,255,0.08)]">
                    {/* Browser top tab bar */}
                    <div className="w-full h-8 bg-[#07070a] border-b border-[#1E1E2E] flex items-center justify-between px-4 select-none">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500/40"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/40"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-green-500/40"></span>
                      </div>
                      <div className="w-32 h-4 bg-[#111118] rounded-md border border-[#1E1E2E]/50 flex items-center justify-center">
                        <span className="text-[9px] text-[#6B6B80] font-mono tracking-wider">localhost:5173</span>
                      </div>
                      <div className="w-3"></div>
                    </div>
                    
                    {/* Simulated Dashboard UI */}
                    <div className="flex-1 w-full flex bg-[#0c0c12] relative p-3 gap-3 overflow-hidden">
                      {/* Left Mini Sidebar */}
                      <div className="w-8 h-full bg-[#111118] border border-[#1E1E2E]/50 rounded-lg p-1.5 flex flex-col gap-2.5">
                        <div className="w-full aspect-square rounded bg-[#6C63FF]/30 animate-pulse"></div>
                        <div className="w-full aspect-square rounded bg-[#1E1E2E]"></div>
                        <div className="w-full aspect-square rounded bg-[#1E1E2E]"></div>
                      </div>
                      
                      {/* Right Main Dashboard Panel */}
                      <div className="flex-1 h-full flex flex-col gap-3">
                        {/* Upper panel stats */}
                        <div className="grid grid-cols-2 gap-2">
                          <div className="h-10 bg-[#111118] border border-[#1E1E2E]/50 rounded-lg p-2 flex flex-col justify-between">
                            <span className="text-[7px] text-[#6B6B80] font-mono uppercase">Status</span>
                            <span className="text-[8px] text-[#00D4FF] font-bold font-mono">ACTIVE // OK</span>
                          </div>
                          <div className="h-10 bg-[#111118] border border-[#1E1E2E]/50 rounded-lg p-2 flex flex-col justify-between">
                            <span className="text-[7px] text-[#6B6B80] font-mono uppercase">Metrics</span>
                            <div className="w-full h-1 bg-[#1E1E2E] rounded overflow-hidden">
                              <div className="w-3/4 h-full bg-gradient-to-r from-[#6C63FF] to-[#00D4FF]"></div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Main UI window mockup */}
                        <div className="flex-1 bg-[#111118]/60 border border-[#1E1E2E]/30 rounded-lg p-3 flex flex-col justify-center items-center relative group-hover:bg-[#111118]/90 transition-all duration-300">
                          <div className="absolute inset-0 bg-radial-glow opacity-10 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"></div>
                          <h5 className="font-heading font-black text-xl md:text-2xl text-[#E8E8F0] tracking-widest uppercase mb-1.5 text-center group-hover:scale-105 transition-transform duration-300 drop-shadow-[0_0_15px_rgba(108,99,255,0.25)]">
                            {project.title}
                          </h5>
                          <span className="font-mono text-[9px] text-[#6C63FF] tracking-[0.2em] uppercase font-semibold">
                            ACTIVE PROTOCOL
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="flex flex-col justify-end">
                    <div className="flex items-baseline justify-between mb-4 border-b border-[#1E1E2E]/30 pb-3">
                      <span className="font-heading font-black text-5xl md:text-6xl text-[#E8E8F0]/10 group-hover:text-[#00D4FF]/20 transition-colors duration-300 select-none">
                        {formatIndex(idx)}
                      </span>
                      <h4 className="text-2xl md:text-3xl font-heading font-extrabold text-white group-hover:text-[#00D4FF] transition-colors duration-300 tracking-wide">
                        {project.title}
                      </h4>
                    </div>

                    <span className="font-mono text-xs uppercase tracking-widest text-[#6B6B80] block mb-3 font-semibold">
                      Tools and features
                    </span>
                    
                    <p className="text-[#6B6B80] font-sans text-sm md:text-base leading-relaxed mb-6">
                      {project.description}
                    </p>

                    {/* Tech List and Links */}
                    <div className="flex items-center justify-between border-t border-[#1E1E2E]/40 pt-5 mt-2">
                      <div className="flex flex-wrap gap-2 max-w-[75%]">
                        {project.tech.map((techItem) => (
                          <span
                            key={techItem}
                            className="text-[#6B6B80] font-mono text-xs tracking-wide hover:text-[#00D4FF] transition-colors duration-200"
                          >
                            {techItem} &middot;
                          </span>
                        ))}
                      </div>
                      
                      {/* Icons */}
                      <div className="flex items-center gap-4 text-[#6B6B80]">
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-[#00D4FF] hover:scale-110 transform transition-all duration-300"
                            aria-label="GitHub"
                          >
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                          </a>
                        )}
                        {project.live && (
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-[#00D4FF] hover:scale-110 transform transition-all duration-300"
                            aria-label="Live Demo"
                          >
                            <svg className="w-5 h-5 fill-none stroke-current" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // Odd Layout: Details at Top, Media at Bottom
                <div className="flex flex-col gap-8 h-full justify-between">
                  
                  {/* Details */}
                  <div className="flex flex-col justify-start">
                    <div className="flex items-baseline justify-between mb-4 border-b border-[#1E1E2E]/30 pb-3">
                      <span className="font-heading font-black text-5xl md:text-6xl text-[#E8E8F0]/10 group-hover:text-[#6C63FF]/20 transition-colors duration-300 select-none">
                        {formatIndex(idx)}
                      </span>
                      <h4 className="text-2xl md:text-3xl font-heading font-extrabold text-white group-hover:text-[#6C63FF] transition-colors duration-300 tracking-wide">
                        {project.title}
                      </h4>
                    </div>

                    <span className="font-mono text-xs uppercase tracking-widest text-[#6B6B80] block mb-3 font-semibold">
                      Tools and features
                    </span>
                    
                    <p className="text-[#6B6B80] font-sans text-sm md:text-base leading-relaxed mb-6">
                      {project.description}
                    </p>

                    {/* Tech List and Links */}
                    <div className="flex items-center justify-between border-t border-[#1E1E2E]/40 pt-5 mt-2 mb-4">
                      <div className="flex flex-wrap gap-2 max-w-[75%]">
                        {project.tech.map((techItem) => (
                          <span
                            key={techItem}
                            className="text-[#6B6B80] font-mono text-xs tracking-wide hover:text-[#6C63FF] transition-colors duration-200"
                          >
                            {techItem} &middot;
                          </span>
                        ))}
                      </div>
                      
                      {/* Icons */}
                      <div className="flex items-center gap-4 text-[#6B6B80]">
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-[#6C63FF] hover:scale-110 transform transition-all duration-300"
                            aria-label="GitHub"
                          >
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                          </a>
                        )}
                        {project.live && (
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-[#6C63FF] hover:scale-110 transform transition-all duration-300"
                            aria-label="Live Demo"
                          >
                            <svg className="w-5 h-5 fill-none stroke-current" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Browser Mockup Preview - Dashboard Visual */}
                  <div className="w-full aspect-[16/10] bg-[#0c0c12] border border-[#1E1E2E] rounded-2xl overflow-hidden flex flex-col shadow-[0_20px_50px_rgba(0,0,0,0.4)] relative group transition-all duration-500 hover:border-[#6C63FF]/50 hover:shadow-[0_20px_50px_rgba(108,99,255,0.08)]">
                    {/* Browser top tab bar */}
                    <div className="w-full h-8 bg-[#07070a] border-b border-[#1E1E2E] flex items-center justify-between px-4 select-none">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500/40"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/40"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-green-500/40"></span>
                      </div>
                      <div className="w-32 h-4 bg-[#111118] rounded-md border border-[#1E1E2E]/50 flex items-center justify-center">
                        <span className="text-[9px] text-[#6B6B80] font-mono tracking-wider">localhost:5173</span>
                      </div>
                      <div className="w-3"></div>
                    </div>
                    
                    {/* Simulated Dashboard UI */}
                    <div className="flex-1 w-full flex bg-[#0c0c12] relative p-3 gap-3 overflow-hidden">
                      {/* Left Mini Sidebar */}
                      <div className="w-8 h-full bg-[#111118] border border-[#1E1E2E]/50 rounded-lg p-1.5 flex flex-col gap-2.5">
                        <div className="w-full aspect-square rounded bg-[#6C63FF]/30 animate-pulse"></div>
                        <div className="w-full aspect-square rounded bg-[#1E1E2E]"></div>
                        <div className="w-full aspect-square rounded bg-[#1E1E2E]"></div>
                      </div>
                      
                      {/* Right Main Dashboard Panel */}
                      <div className="flex-1 h-full flex flex-col gap-3">
                        {/* Upper panel stats */}
                        <div className="grid grid-cols-2 gap-2">
                          <div className="h-10 bg-[#111118] border border-[#1E1E2E]/50 rounded-lg p-2 flex flex-col justify-between">
                            <span className="text-[7px] text-[#6B6B80] font-mono uppercase">Status</span>
                            <span className="text-[8px] text-[#6C63FF] font-bold font-mono">ACTIVE // OK</span>
                          </div>
                          <div className="h-10 bg-[#111118] border border-[#1E1E2E]/50 rounded-lg p-2 flex flex-col justify-between">
                            <span className="text-[7px] text-[#6B6B80] font-mono uppercase">Metrics</span>
                            <div className="w-full h-1 bg-[#1E1E2E] rounded overflow-hidden">
                              <div className="w-3/4 h-full bg-gradient-to-r from-[#6C63FF] to-[#00D4FF]"></div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Main UI window mockup */}
                        <div className="flex-1 bg-[#111118]/60 border border-[#1E1E2E]/30 rounded-lg p-3 flex flex-col justify-center items-center relative group-hover:bg-[#111118]/90 transition-all duration-300">
                          <div className="absolute inset-0 bg-radial-glow opacity-10 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"></div>
                          <h5 className="font-heading font-black text-xl md:text-2xl text-[#E8E8F0] tracking-widest uppercase mb-1.5 text-center group-hover:scale-105 transition-transform duration-300 drop-shadow-[0_0_15px_rgba(108,99,255,0.25)]">
                            {project.title}
                          </h5>
                          <span className="font-mono text-[9px] text-[#6C63FF] tracking-[0.2em] uppercase font-semibold">
                            ACTIVE PROTOCOL
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Projects;
