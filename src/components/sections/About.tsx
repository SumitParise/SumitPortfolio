import useScrollReveal from '../../hooks/useScrollReveal';
import { PORTFOLIO } from '../../data/portfolio';
import CharacterModel from '../Character';

const About = () => {
  const sectionRef = useScrollReveal<HTMLDivElement>();

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 md:py-32 px-6 md:px-12 max-w-6xl mx-auto flex flex-col md:flex-row gap-12 md:gap-20 items-center justify-between overflow-hidden"
    >
      {/* 3D Visual Column (Left) */}
      <div className="reveal-item w-full md:w-1/2 flex items-center justify-center h-[400px] md:h-[500px]">
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Moving background glow */}
          <div className="absolute w-60 h-60 rounded-full bg-[#6C63FF]/5 filter blur-3xl animate-pulse"></div>
          <div className="absolute w-48 h-48 rounded-full bg-[#00D4FF]/5 filter blur-3xl animate-pulse delay-500"></div>

          {/* 3D Character */}
          <div className="absolute inset-0 z-10 w-full h-full">
            <CharacterModel view="about" />
          </div>
        </div>
      </div>

      {/* Bio Text Column (Right) */}
      <div className="reveal-item w-full md:w-1/2 flex flex-col items-start">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-10 h-[2px] bg-[#6C63FF]"></span>
          <span className="font-mono text-sm tracking-widest text-[#6C63FF] uppercase font-semibold">
            About Me
          </span>
        </div>
        
        <h3 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6 leading-tight">
          Designing and engineering immersive digital products.
        </h3>
        
        <p className="text-[#E8E8F0] text-base md:text-lg leading-relaxed font-sans mb-6">
          {PORTFOLIO.about}
        </p>

        <p className="text-[#6B6B80] text-sm md:text-base leading-relaxed font-sans">
          I am driven by a passion for technical excellence and aesthetic details. 
          I love coding clean micro-interactions, optimizing performance, and building interfaces 
          that feel fast, fluid, and responsive on every browser.
        </p>
      </div>
    </section>
  );
};

export default About;
