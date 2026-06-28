import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import useScrollReveal from '../../hooks/useScrollReveal';
import { PORTFOLIO } from '../../data/portfolio';

// 3D Visual for the What I Do section
function WhatIDo3DVisual() {
  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (pointsRef.current) {
      pointsRef.current.rotation.y = time * 0.1;
      pointsRef.current.rotation.z = time * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <icosahedronGeometry args={[1.4, 2]} />
      <pointsMaterial
        color="#6C63FF"
        size={0.06}
        sizeAttenuation={true}
        transparent
        opacity={0.5}
      />
    </points>
  );
}

const Skills = () => {
  const containerRef = useScrollReveal<HTMLDivElement>();

  // Filter skills dynamically from PORTFOLIO.skills
  const devSkills = PORTFOLIO.skills.filter(skill =>
    ['react', 'typescript', 'node.js', 'python', 'rest apis', 'git', 'docker', 'tailwind css', 'fastapi'].includes(skill.toLowerCase())
  );

  const designSkills = PORTFOLIO.skills.filter(skill =>
    ['three.js', 'gsap', 'html5/css3'].includes(skill.toLowerCase())
  );

  return (
    <section
      id="skills"
      ref={containerRef}
      className="py-20 md:py-32 px-6 md:px-12 max-w-6xl mx-auto flex flex-col md:flex-row gap-12 md:gap-20 items-center justify-between overflow-hidden"
    >
      {/* Title & 3D Column (Left) */}
      <div className="reveal-item w-full md:w-1/2 flex flex-col items-start justify-center">
        <h3 className="font-heading font-extrabold text-5xl md:text-7xl uppercase leading-[0.9] tracking-wider text-white mb-8">
          WHAT <br />
          <span className="text-[#6C63FF]">I DO</span>
        </h3>
        
        <div className="w-full max-w-[280px] h-[180px] pointer-events-none select-none">
          <Canvas camera={{ position: [0, 0, 3], fov: 60 }}>
            <ambientLight intensity={0.5} />
            <WhatIDo3DVisual />
          </Canvas>
        </div>
      </div>

      {/* Cards Column with Corner Brackets (Right) */}
      <div className="reveal-item w-full md:w-1/2 flex flex-col gap-10 relative">
        {/* Development Card */}
        <div className="corner-bracket-card p-8 bg-[#111118]/40 border border-[#1E1E2E]/50 rounded-lg hover:bg-[#111118]/80 transition-all duration-300">
          <div className="corner-bracket-child"></div>
          
          <h4 className="text-2xl font-heading font-extrabold tracking-wider text-[#00D4FF] mb-2">
            DEVELOP
          </h4>
          <span className="font-mono text-xs uppercase tracking-widest text-[#6B6B80] block mb-4">
            Engineering & Infrastructure
          </span>
          <p className="text-[#6B6B80] font-sans text-sm md:text-base leading-relaxed mb-6">
            Building responsive web architectures, clean RESTful endpoints, and implementing reliable backend system modules.
          </p>
          
          <div className="flex flex-wrap gap-2">
            {devSkills.map((skill) => (
              <span
                key={skill}
                className="interactive px-2.5 py-1 rounded-full bg-[#0a0a0f] border border-[#1E1E2E] text-xs font-mono text-[#E8E8F0] hover:text-[#00D4FF] hover:border-[#00D4FF] transition-all duration-300 select-none"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Design Card */}
        <div className="corner-bracket-card p-8 bg-[#111118]/40 border border-[#1E1E2E]/50 rounded-lg hover:bg-[#111118]/80 transition-all duration-300">
          <div className="corner-bracket-child"></div>
          
          <h4 className="text-2xl font-heading font-extrabold tracking-wider text-[#6C63FF] mb-2">
            DESIGN
          </h4>
          <span className="font-mono text-xs uppercase tracking-widest text-[#6B6B80] block mb-4">
            Creative & Interaction
          </span>
          <p className="text-[#6B6B80] font-sans text-sm md:text-base leading-relaxed mb-6">
            Crafting beautiful layouts, designing interactive 3D web interfaces, and creating fluid animation flows using modern engines.
          </p>
          
          <div className="flex flex-wrap gap-2">
            {designSkills.map((skill) => (
              <span
                key={skill}
                className="interactive px-2.5 py-1 rounded-full bg-[#0a0a0f] border border-[#1E1E2E] text-xs font-mono text-[#E8E8F0] hover:text-[#6C63FF] hover:border-[#6C63FF] transition-all duration-300 select-none"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
