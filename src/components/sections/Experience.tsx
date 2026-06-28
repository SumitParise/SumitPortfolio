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
            start: 'top 20%',
            end: 'bottom 80%',
            scrub: true,
          },
        }
      );

      // 2. Animate timeline item blocks fade & slide in
      const items = container.querySelectorAll('.timeline-item');
      items.forEach((item, index) => {
        const direction = index % 2 === 0 ? -30 : 30;
        
        gsap.fromTo(
          item.querySelector('.timeline-content'),
          {
            opacity: 0,
            x: window.innerWidth > 768 ? direction : 30,
            y: 10,
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 1,
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

  return (
    <section
      id="experience"
      ref={containerRef}
      className="py-20 md:py-32 px-6 md:px-12 max-w-5xl mx-auto overflow-hidden"
    >
      <div className="flex flex-col items-center text-center mb-16">
        <div className="flex items-center gap-2 mb-4 justify-center">
          <span className="w-10 h-[2px] bg-[#6C63FF]"></span>
          <span className="font-mono text-sm tracking-widest text-[#6C63FF] uppercase font-semibold">
            History
          </span>
          <span className="w-10 h-[2px] bg-[#6C63FF]"></span>
        </div>
        
        <h3 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">
          Work Experience
        </h3>
        
        <p className="text-[#6B6B80] max-w-lg font-sans text-sm md:text-base">
          A look at where I've worked and the roles I've held throughout my software engineering career.
        </p>
      </div>

      {/* Timeline Wrapper */}
      <div className="relative w-full mt-12 min-h-[300px]">
        {/* Background Tracker Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-[#1E1E2E] transform -translate-x-1/2"></div>
        
        {/* Animated Progress Line */}
        <div
          ref={lineRef}
          className="absolute left-4 md:left-1/2 top-0 w-[2px] bg-gradient-to-b from-[#6C63FF] to-[#00D4FF] transform -translate-x-1/2 origin-top"
          style={{ height: '0%' }}
        ></div>

        {/* Timeline Entries */}
        <div className="space-y-16">
          {PORTFOLIO.experience.map((exp, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={idx}
                className="relative timeline-item w-full flex flex-col md:flex-row items-start"
              >
                {/* Node dot on timeline */}
                <div className="timeline-dot absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-[#111118] border-2 border-[#00D4FF] transform -translate-x-1/2 z-10 top-1.5 shadow-[0_0_8px_rgba(0,212,255,0.4)] opacity-0 scale-0"></div>

                {/* Content block */}
                <div
                  className={`timeline-content w-full pl-12 md:pl-0 md:w-[45%] opacity-0 ${
                    isEven
                      ? 'md:mr-auto md:text-right md:pr-10'
                      : 'md:ml-auto md:text-left md:pl-10'
                  }`}
                >
                  <span className="font-mono text-xs text-[#00D4FF] font-semibold tracking-wider">
                    {exp.period}
                  </span>
                  
                  <h4 className="text-xl font-heading font-bold text-white mt-1.5 mb-0.5">
                    {exp.role}
                  </h4>
                  
                  <h5 className="text-sm text-[#6C63FF] font-mono font-medium tracking-wide mb-4">
                    {exp.company}
                  </h5>
                  
                  <p className="text-[#6B6B80] font-sans text-sm md:text-base leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;
