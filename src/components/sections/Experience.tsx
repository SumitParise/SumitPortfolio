import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PORTFOLIO } from '../../data/portfolio';

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const line = lineRef.current;
    if (!container || !line) return;

    const ctx = gsap.context(() => {
      // 1. Animate drawing the vertical timeline line
      gsap.fromTo(
        line,
        { height: '0%' },
        {
          height: '100%',
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top 30%',
            end: 'bottom 70%',
            scrub: true,
          },
        }
      );

      // 2. Animate timeline item blocks fade & slide in
      const items = container.querySelectorAll('.timeline-item');
      items.forEach((item) => {
        gsap.fromTo(
          item.querySelectorAll('.reveal-fade'),
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );

        // Animate the timeline node dots
        gsap.fromTo(
          item.querySelector('.timeline-dot'),
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: 'back.out(2)',
            scrollTrigger: {
              trigger: item,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, container);

    return () => ctx.revert();
  }, []);

  // Helper to extract year from period text (e.g., "Jan 2023 – Present" -> "2023")
  const getYear = (period: string) => {
    const match = period.match(/\b\d{4}\b/);
    return match ? match[0] : period;
  };

  return (
    <section
      id="experience"
      ref={containerRef}
      className="py-20 md:py-32 px-6 md:px-12 max-w-5xl mx-auto overflow-hidden"
    >
      {/* Title */}
      <div className="flex flex-col items-center text-center mb-20">
        <div className="flex items-center gap-2 mb-4 justify-center">
          <span className="w-10 h-[2px] bg-[#6C63FF]"></span>
          <span className="font-mono text-sm tracking-widest text-[#6C63FF] uppercase font-semibold">
            History
          </span>
          <span className="w-10 h-[2px] bg-[#6C63FF]"></span>
        </div>
        
        <h3 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">
          My career & experience
        </h3>
      </div>

      {/* Timeline Wrapper */}
      <div className="relative w-full mt-12">
        {/* Background Tracker Line (Desktop: center, Mobile: left-4) */}
        <div className="absolute left-4 md:left-[50%] top-0 bottom-0 w-[1.5px] bg-[#1E1E2E] transform -translate-x-1/2"></div>
        
        {/* Animated Progress Line */}
        <div
          ref={lineRef}
          className="absolute left-4 md:left-[50%] top-0 w-[1.5px] bg-gradient-to-b from-[#6C63FF] to-[#00D4FF] transform -translate-x-1/2 origin-top"
          style={{ height: '0%' }}
        ></div>

        {/* Timeline Entries */}
        <div className="space-y-20">
          {PORTFOLIO.experience.map((exp, idx) => (
            <div
              key={idx}
              className="relative timeline-item w-full grid grid-cols-1 md:grid-cols-[1fr_120px_1fr] gap-6 md:gap-0 items-start"
            >
              {/* Left Column: Role and Company (Desktop: aligns right, Mobile: stacked on right) */}
              <div className="reveal-fade md:text-right md:pr-10 pl-12 md:pl-0">
                <h4 className="text-xl md:text-2xl font-heading font-extrabold text-white mb-1.5 leading-tight">
                  {exp.role}
                </h4>
                <h5 className="text-sm md:text-base font-mono text-[#6C63FF] font-medium uppercase tracking-wider">
                  {exp.company}
                </h5>
              </div>

              {/* Center Column: Year and Dot */}
              <div className="absolute md:relative left-0 md:left-auto top-1.5 md:top-auto flex md:flex-row items-center justify-start md:justify-center w-full h-full">
                {/* Year Indicator (Desktop: shown left of line, Mobile: shown top) */}
                <span className="font-heading font-extrabold text-2xl md:text-3xl text-white/90 md:mr-6 absolute left-12 md:left-auto md:relative top-[-4px] md:top-auto select-none">
                  {getYear(exp.period)}
                </span>
                
                {/* Timeline node dot */}
                <div className="timeline-dot w-4 h-4 rounded-full bg-[#0a0a0f] border-2 border-[#00D4FF] shadow-[0_0_8px_rgba(0,212,255,0.4)] z-10 absolute left-4 md:left-[50%] transform -translate-x-1/2 opacity-0 scale-0"></div>
              </div>

              {/* Right Column: Description */}
              <div className="reveal-fade pl-12 md:pl-10 md:pt-1">
                <p className="text-[#6B6B80] font-sans text-sm md:text-base leading-relaxed max-w-md">
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
