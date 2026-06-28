import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import useScrollReveal from '../../hooks/useScrollReveal';

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
  const [showCanvas, setShowCanvas] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowCanvas(true), 1800);
    return () => clearTimeout(timer);
  }, []);

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
          {showCanvas && (
            <Canvas camera={{ position: [0, 0, 3], fov: 60 }}>
              <ambientLight intensity={0.5} />
              <WhatIDo3DVisual />
            </Canvas>
          )}
        </div>
      </div>

      {/* Realistic Engineering Interfaces Column (Right) */}
      <div className="reveal-item w-full md:w-1/2 flex flex-col gap-10 relative">
        
        {/* DEVELOP: VSCode IDE Interface */}
        <div className="w-full rounded-lg bg-[#0e0e15] border border-[#1e1e2d] shadow-2xl overflow-hidden flex flex-col">
          {/* Editor Header / Title bar */}
          <div className="w-full h-9 bg-[#0a0a0f] border-b border-[#1e1e2d] flex items-center justify-between px-4 select-none">
            {/* Window control buttons */}
            <div className="flex gap-1.5 items-center">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444] opacity-80"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#eab308] opacity-80"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e] opacity-80"></span>
            </div>
            {/* Current file title */}
            <span className="font-mono text-[10px] text-[#6B6B80] tracking-wider uppercase font-semibold">
              DEVELOPER WORKSPACE &bull; skills.json
            </span>
            {/* Editor info */}
            <span className="font-mono text-[9px] text-[#00D4FF] font-semibold">JSON</span>
          </div>

          {/* IDE Body (Sidebar + Code Editor) */}
          <div className="flex flex-row h-52 font-mono text-[11px] md:text-xs">
            {/* File explorer sidebar */}
            <div className="w-24 bg-[#0a0a0f] border-r border-[#1e1e2d] p-3 flex flex-col gap-1.5 text-[#6B6B80] select-none text-[10px]">
              <span className="text-[#8e8ea0] font-black uppercase text-[8px] tracking-widest block mb-1">Files</span>
              <span className="text-[#00D4FF] font-semibold truncate">&bull; skills.json</span>
              <span className="truncate">&bull; main.py</span>
              <span className="truncate">&bull; routes.js</span>
            </div>

            {/* Code lines editor */}
            <div className="flex-1 p-4 bg-[#0e0e15] overflow-y-auto flex gap-4 text-left leading-relaxed">
              {/* Line numbers column */}
              <div className="text-[#6B6B80]/40 text-right select-none flex flex-col">
                <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span>
              </div>
              
              {/* Syntax highlighted JSON code block */}
              <div className="flex-1 text-[#E8E8F0] whitespace-pre font-medium">
                <div><span className="text-[#ef4444] font-semibold">&#123;</span></div>
                <div>  <span className="text-[#00D4FF]">"languages"</span>: <span className="text-[#eab308]">["TypeScript", "Python"]</span>,</div>
                <div>  <span className="text-[#00D4FF]">"backend"</span>: <span className="text-[#eab308]">["Node.js", "FastAPI", "Express"]</span>,</div>
                <div>  <span className="text-[#00D4FF]">"databases"</span>: <span className="text-[#eab308]">["PostgreSQL", "MongoDB"]</span>,</div>
                <div>  <span className="text-[#00D4FF]">"devops"</span>: <span className="text-[#eab308]">["Docker", "AWS", "Git"]</span></div>
                <div><span className="text-[#ef4444] font-semibold">&#125;</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* DESIGN: Figma Canvas Vector Layout Interface */}
        <div className="w-full rounded-lg bg-[#0e0e15] border border-[#1e1e2d] shadow-2xl overflow-hidden flex flex-col">
          {/* Design Workspace Header */}
          <div className="w-full h-9 bg-[#0a0a0f] border-b border-[#1e1e2d] flex items-center justify-between px-4 select-none">
            {/* Tool selectors (Cursor, Pen, Text, Canvas) */}
            <div className="flex gap-3 items-center text-white/50 text-[10px] font-mono">
              <span className="text-[#6C63FF] font-black cursor-pointer hover:text-white">&bull; SELECT</span>
              <span className="cursor-pointer hover:text-white">&bull; PATH</span>
              <span className="cursor-pointer hover:text-white">&bull; TEXT</span>
            </div>
            {/* File title */}
            <span className="font-mono text-[10px] text-[#6B6B80] tracking-wider uppercase font-semibold">
              DESIGN WORKSPACE &bull; VectorLayout
            </span>
            {/* Scale */}
            <span className="font-mono text-[9px] text-[#6C63FF] font-semibold">100%</span>
          </div>

          {/* Layout Body (Layers Panel + Grid Preview) */}
          <div className="flex flex-row h-52 font-mono text-[11px] md:text-xs">
            {/* Layers panel sidebar */}
            <div className="w-24 bg-[#0a0a0f] border-r border-[#1e1e2d] p-3 flex flex-col gap-1.5 text-[#6B6B80] select-none text-[10px]">
              <span className="text-[#8e8ea0] font-black uppercase text-[8px] tracking-widest block mb-1">Layers</span>
              <span className="text-[#6C63FF] font-semibold truncate">&bull; Canvas</span>
              <span className="truncate">&bull; ThreeJSMesh</span>
              <span className="truncate">&bull; GSAPAura</span>
              <span className="truncate">&bull; CSSGrid</span>
            </div>

            {/* Design canvas layout board */}
            <div className="flex-1 bg-[#12121c]/40 relative p-4 overflow-hidden flex items-center justify-center">
              {/* Ruler layout grid lines */}
              <div className="absolute inset-0 bg-[radial-gradient(#1e1e2d_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none"></div>

              {/* Graphic Mockup box with vector anchor nodes */}
              <div className="w-40 h-24 border border-dashed border-[#6C63FF] rounded flex flex-col justify-center items-center relative p-3 bg-[#6C63FF]/5 shadow-[0_0_20px_rgba(108,99,255,0.08)]">
                {/* 4 corner vector anchors */}
                <span className="absolute top-[-3px] left-[-3px] w-1.5 h-1.5 bg-white border border-[#6C63FF]"></span>
                <span className="absolute top-[-3px] right-[-3px] w-1.5 h-1.5 bg-white border border-[#6C63FF]"></span>
                <span className="absolute bottom-[-3px] left-[-3px] w-1.5 h-1.5 bg-white border border-[#6C63FF]"></span>
                <span className="absolute bottom-[-3px] right-[-3px] w-1.5 h-1.5 bg-white border border-[#6C63FF]"></span>
                
                {/* Designer tools details inside sandbox */}
                <span className="text-[9px] font-bold text-[#6C63FF] tracking-wider uppercase mb-1">CREATIVE ASSETS</span>
                <div className="flex gap-1.5 flex-wrap justify-center">
                  <span className="text-[7px] px-1.5 py-0.5 rounded-full bg-[#0a0a0f] border border-[#1e1e2d] text-[#E8E8F0]">Three.js</span>
                  <span className="text-[7px] px-1.5 py-0.5 rounded-full bg-[#0a0a0f] border border-[#1e1e2d] text-[#E8E8F0]">GSAP</span>
                  <span className="text-[7px] px-1.5 py-0.5 rounded-full bg-[#0a0a0f] border border-[#1e1e2d] text-[#E8E8F0]">HTML/CSS</span>
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
