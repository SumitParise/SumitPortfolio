import useScrollReveal from '../../hooks/useScrollReveal';
import { PORTFOLIO } from '../../data/portfolio';

const About = () => {
  // Use scroll reveal hook on the wrapper section
  const sectionRef = useScrollReveal<HTMLDivElement>();

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 md:py-32 px-6 md:px-12 max-w-6xl mx-auto flex flex-col md:flex-row gap-12 md:gap-20 items-center justify-between overflow-hidden"
    >
      {/* Bio text column */}
      <div className="reveal-item w-full md:w-1/2 flex flex-col items-start">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-10 h-[2px] bg-[#6C63FF]"></span>
          <span className="font-mono text-sm tracking-widest text-[#6C63FF] uppercase font-semibold">
            About Me
          </span>
        </div>
        
        <h3 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6 leading-tight">
          Crafting digital products at the intersection of code and visual art.
        </h3>
        
        <p className="text-[#E8E8F0] text-base md:text-lg leading-relaxed font-sans mb-6">
          {PORTFOLIO.about}
        </p>

        <p className="text-[#6B6B80] text-sm md:text-base leading-relaxed font-sans">
          I'm always looking to refine my skills and build performant products that stand out. 
          When I'm not writing code, I'm usually researching design systems, playing around with 
          Three.js shaders, or learning about cloud architectures.
        </p>
      </div>

      {/* Abstract terminal visual column */}
      <div className="reveal-item w-full md:w-1/2 flex items-center justify-center">
        <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
          {/* Moving background glow */}
          <div className="absolute w-72 h-72 rounded-full bg-[#6C63FF]/15 filter blur-3xl animate-pulse"></div>
          <div className="absolute w-60 h-60 rounded-full bg-[#00D4FF]/10 filter blur-3xl animate-pulse delay-700"></div>

          {/* Code Window Box */}
          <div className="relative w-full border border-[#1E1E2E] bg-[#111118]/80 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden group">
            {/* Top Glow bar */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#6C63FF] to-[#00D4FF]"></div>

            {/* Window header controls */}
            <div className="flex items-center gap-2 mb-6">
              <div className="w-3 h-3 rounded-full bg-red-500/40 group-hover:bg-red-500/80 transition-colors"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/40 group-hover:bg-yellow-500/80 transition-colors"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/40 group-hover:bg-green-500/80 transition-colors"></div>
              <span className="ml-auto font-mono text-[10px] text-[#6B6B80]">profile.ts</span>
            </div>

            {/* Code Content */}
            <div className="font-mono text-xs md:text-sm space-y-2.5 text-[#6B6B80] select-none">
              <p className="text-[#00D4FF] font-semibold">// Let's define the developer profile</p>
              <p className="text-[#E8E8F0]">
                <span className="text-[#6C63FF] font-medium">const</span> engineer = &#123;
              </p>
              <p className="pl-4">
                name: <span className="text-[#00D4FF] font-medium">"{PORTFOLIO.name}"</span>,
              </p>
              <p className="pl-4">
                role: <span className="text-[#00D4FF] font-medium">"{PORTFOLIO.role}"</span>,
              </p>
              <p className="pl-4">
                passion: <span className="text-white">"Clean code & immersive UI"</span>,
              </p>
              <p className="pl-4">
                openToWork: <span className="text-amber-400">true</span>,
              </p>
              <p className="pl-4">
                skills: [
              </p>
              <p className="pl-8 text-[#E8E8F0]">
                "React", "TypeScript", "Three.js",
              </p>
              <p className="pl-8 text-[#E8E8F0]">
                "Node.js", "GSAP", "Python"
              </p>
              <p className="pl-4">
                ]
              </p>
              <p className="text-[#E8E8F0]">&#125;;</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
