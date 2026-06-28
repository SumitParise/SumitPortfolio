import useScrollReveal from '../../hooks/useScrollReveal';
import { PORTFOLIO } from '../../data/portfolio';

const Projects = () => {
  const containerRef = useScrollReveal<HTMLDivElement>({ stagger: 0.1 });

  // Format index (e.g., 0 -> "01", 1 -> "02")
  const formatIndex = (index: number) => `0${index + 1}`.slice(-2);

  // Customize project roles to display like the screenshot
  const projectRoles: Record<string, string> = {
    'Interactive 3D Portfolio': 'Web Development',
    'AI Code Reviewer': 'Web Project',
    'DevSync': 'Web App'
  };

  return (
    <section
      id="projects"
      ref={containerRef}
      className="py-20 md:py-36 bg-[#0a0a0f] overflow-hidden relative"
    >
      {/* Background Theme Aurora Accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        <div className="absolute top-[20%] right-[-10%] w-[350px] h-[350px] rounded-full bg-[#00D4FF] filter blur-[120px]"></div>
        <div className="absolute bottom-[20%] left-[-10%] w-[350px] h-[350px] rounded-full bg-[#6C63FF] filter blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Title (Matches moncy.dev header placement) */}
        <div className="flex flex-col items-start mb-20 pl-4">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-10 h-[2px] bg-[#6C63FF]"></span>
            <span className="font-mono text-sm tracking-widest text-[#6C63FF] uppercase font-semibold">
              Work
            </span>
          </div>
          <h3 className="text-4xl md:text-6xl font-heading font-black text-white leading-none">
            My <span className="text-[#6C63FF] italic font-semibold">Work</span>
          </h3>
        </div>

        {/* Column-based Horizontal Scroll Container */}
        <div className="reveal-item flex flex-row overflow-x-auto gap-0 pb-12 scrollbar-thin scrollbar-thumb-[#1E1E2E] scrollbar-track-transparent">
          {PORTFOLIO.projects.map((project, idx) => {
            const isEven = idx % 2 === 0;
            const role = projectRoles[project.title] || 'Web Development';
            
            return (
              <article
                key={idx}
                className={`w-[300px] md:w-[440px] shrink-0 flex flex-col justify-between border-r border-[#1E1E2E] hover:border-[#6C63FF]/40 px-6 md:px-8 first:pl-4 last:border-r-0 last:pr-0 group transition-all duration-500 ease-out`}
              >
                {/* Alternating Layout: Media Top / Details Bottom for Even, and vice-versa for Odd */}
                {isEven ? (
                  // EVEN COLUMN: Media on top, Details on bottom
                  <div className="flex flex-col gap-10 h-full justify-between">
                    {/* Media container */}
                    <div className="w-full aspect-[1.6/1] bg-[#eae5ec] rounded-lg overflow-hidden flex flex-col relative shadow-lg border border-[#1E1E2E]/10 group-hover:scale-[1.03] group-hover:shadow-[0_0_35px_rgba(108,99,255,0.15)] group-hover:border-[#6C63FF]/30 transition-all duration-500 ease-out">
                      {/* Browser mock header */}
                      <div className="w-full h-5 bg-[#dcd7de] border-b border-[#c8c3ca] flex items-center gap-1 px-3 select-none">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                      </div>
                      {/* Web Screenshot Graphic */}
                      <div className="flex-1 p-4 flex flex-col justify-between text-[#0a0a0f] relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#6C63FF]/5 to-[#00D4FF]/5 pointer-events-none"></div>
                        <span className="font-heading font-black text-sm tracking-wider">SUMIT PARISE</span>
                        <div className="self-center w-16 h-16 rounded-full border border-dashed border-[#6c63ff]/40 flex items-center justify-center relative">
                          <span className="w-8 h-8 rounded-full bg-[#6c63ff]/20 animate-pulse"></span>
                        </div>
                        <span className="font-mono text-[9px] uppercase tracking-widest opacity-60">Developer // Portfolio</span>
                      </div>

                      {/* Top-Left Git Icon Button */}
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute top-8 left-4 w-8 h-8 rounded-full bg-[#0a0a0f]/80 backdrop-blur-sm border border-[#1E1E2E]/60 flex items-center justify-center text-white/80 z-20 hover:scale-110 hover:bg-black hover:text-[#6C63FF] hover:border-[#6C63FF] shadow-md hover:shadow-[0_0_15px_rgba(108,99,255,0.4)] transition-all duration-300"
                          aria-label="GitHub"
                        >
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                          </svg>
                        </a>
                      )}

                      {/* Bottom-Right Arrow Link Button */}
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute bottom-4 right-4 w-9 h-9 rounded-full bg-[#E8E8F0]/15 hover:bg-[#E8E8F0] backdrop-blur-sm border border-[#1E1E2E]/20 flex items-center justify-center text-white hover:text-black hover:shadow-[0_0_15px_rgba(255,255,255,0.4)] transition-all duration-300 z-20 hover:scale-110"
                          aria-label="Live Demo"
                        >
                          <svg className="w-3.5 h-3.5 stroke-current fill-none" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H9M17 7V15" />
                          </svg>
                        </a>
                      )}
                    </div>

                    {/* Details block */}
                    <div className="flex flex-col">
                      <div className="flex justify-between items-start w-full mb-3">
                        <span className="font-heading font-black text-5xl text-white/90 group-hover:text-[#6C63FF]/30 transition-colors duration-500 select-none">
                          {formatIndex(idx)}
                        </span>
                        
                        <div className="text-right">
                          <h4 className="text-lg md:text-xl font-heading font-extrabold text-white group-hover:text-[#6C63FF] transition-colors duration-500 uppercase tracking-wider">
                            {project.title}
                          </h4>
                          <span className="text-[10px] font-mono text-[#6C63FF] uppercase tracking-widest font-semibold block mt-1">
                            {role}
                          </span>
                        </div>
                      </div>

                      <div className="text-left w-full border-t border-[#1E1E2E] group-hover:border-[#6C63FF]/20 pt-3 transition-colors duration-500">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-[#6B6B80] block mb-1.5 font-bold">
                          Tools and features
                        </span>
                        <p className="text-[#6B6B80] group-hover:text-[#E8E8F0]/70 font-sans text-xs md:text-sm leading-relaxed transition-colors duration-500">
                          {project.tech.join(', ')}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  // ODD COLUMN: Details on top, Media on bottom
                  <div className="flex flex-col gap-10 h-full justify-between">
                    {/* Details block */}
                    <div className="flex flex-col">
                      <div className="flex justify-between items-start w-full mb-3">
                        <span className="font-heading font-black text-5xl text-white/90 group-hover:text-[#00D4FF]/30 transition-colors duration-500 select-none">
                          {formatIndex(idx)}
                        </span>
                        
                        <div className="text-right">
                          <h4 className="text-lg md:text-xl font-heading font-extrabold text-white group-hover:text-[#00D4FF] transition-colors duration-500 uppercase tracking-wider">
                            {project.title}
                          </h4>
                          <span className="text-[10px] font-mono text-[#6C63FF] uppercase tracking-widest font-semibold block mt-1">
                            {role}
                          </span>
                        </div>
                      </div>

                      <div className="text-left w-full border-t border-[#1E1E2E] group-hover:border-[#00D4FF]/20 pt-3 transition-colors duration-500">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-[#6B6B80] block mb-1.5 font-bold">
                          Tools and features
                        </span>
                        <p className="text-[#6B6B80] group-hover:text-[#E8E8F0]/70 font-sans text-xs md:text-sm leading-relaxed transition-colors duration-500">
                          {project.tech.join(', ')}
                        </p>
                      </div>
                    </div>

                    {/* Media container (Portrait size) */}
                    <div className="w-[180px] md:w-[220px] aspect-[1/1.6] bg-[#0c0c12] rounded-xl overflow-hidden flex flex-col relative mx-auto border border-[#1E1E2E] shadow-xl p-3 group-hover:scale-[1.03] group-hover:shadow-[0_0_35px_rgba(0,212,255,0.12)] group-hover:border-[#00D4FF]/30 transition-all duration-500 ease-out">
                      {/* Browser mock header */}
                      <div className="w-full h-4 border-b border-[#1E1E2E]/40 flex items-center gap-1 mb-3 select-none">
                        <span className="w-1 h-1 rounded-full bg-white/20"></span>
                        <span className="w-8 h-1 bg-white/10 rounded-full"></span>
                      </div>
                      {/* Mobile Screenshot Graphic */}
                      <div className="flex-1 flex flex-col gap-3 font-mono text-[8px] text-left relative overflow-hidden">
                        <div className="absolute inset-0 bg-radial-glow opacity-5 pointer-events-none"></div>
                        <div className="w-full bg-[#111118] p-2 rounded border border-[#1E1E2E]/50 text-emerald-400">
                          <span>$ review --all</span>
                        </div>
                        <div className="flex flex-col gap-1.5 text-white/40">
                          <div className="w-full h-1.5 bg-white/5 rounded"></div>
                          <div className="w-5/6 h-1.5 bg-white/5 rounded"></div>
                          <div className="w-4/5 h-1.5 bg-white/5 rounded"></div>
                        </div>
                        <div className="w-full bg-emerald-500/10 border border-emerald-500/20 p-2 rounded text-emerald-400 mt-2">
                          <span>✓ NO CRITICAL BUGS FOUND</span>
                        </div>
                      </div>

                      {/* Top-Left Git Icon Button */}
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute top-8 left-4 w-7 h-7 rounded-full bg-[#0a0a0f]/80 backdrop-blur-sm border border-[#1E1E2E]/60 flex items-center justify-center text-white/80 z-20 hover:scale-110 hover:bg-black hover:text-[#00D4FF] hover:border-[#00D4FF] shadow-md hover:shadow-[0_0_15px_rgba(0,212,255,0.4)] transition-all duration-300"
                          aria-label="GitHub"
                        >
                          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                          </svg>
                        </a>
                      )}

                      {/* Bottom-Right Arrow Link Button */}
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-[#E8E8F0]/15 hover:bg-[#E8E8F0] backdrop-blur-sm border border-[#1E1E2E]/20 flex items-center justify-center text-white hover:text-black hover:shadow-[0_0_15px_rgba(255,255,255,0.4)] transition-all duration-300 z-20 hover:scale-110"
                          aria-label="Live Demo"
                        >
                          <svg className="w-3 h-3 stroke-current fill-none" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H9M17 7V15" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
