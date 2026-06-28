import { useEffect, useRef, useMemo } from 'react';
import gsap from 'gsap';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { PORTFOLIO } from '../../data/portfolio';

// 3D Background scene element
function Floating3DBackground() {
  const meshRef = useRef<THREE.Mesh>(null);
  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.08;
      meshRef.current.rotation.y = time * 0.12;
      const pulse = 1.3 + Math.sin(time * 0.5) * 0.06;
      meshRef.current.scale.set(pulse, pulse, pulse);
    }
    if (pointsRef.current) {
      pointsRef.current.rotation.y = -time * 0.03;
      pointsRef.current.rotation.x = -time * 0.015;
    }
  });

  const count = 350;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2.5 + Math.random() * 3.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  return (
    <group>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <icosahedronGeometry args={[1.4, 1]} />
        <meshBasicMaterial color="#6C63FF" wireframe transparent opacity={0.25} />
      </mesh>
      
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#00D4FF"
          size={0.06}
          sizeAttenuation={true}
          transparent
          opacity={0.5}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const name = PORTFOLIO.name;
  const nameChars = useMemo(() => Array.from(name), [name]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Reveal name characters
      gsap.fromTo(
        '.char',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.03,
          duration: 0.8,
          ease: 'back.out(1.5)',
          delay: 0.4,
        }
      );

      // 2. Fade in labels and items
      gsap.fromTo(
        '.hero-fade-in',
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.9,
          ease: 'power3.out',
          delay: 0.8,
        }
      );

      // 3. Fade in 3D Canvas
      gsap.fromTo(
        '.canvas-container',
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.6,
          ease: 'power2.out',
          delay: 0.5,
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full h-screen bg-[#0a0a0f] overflow-hidden flex flex-col justify-between lg:justify-center items-center py-24 lg:py-0"
    >
      {/* Signature Breathing Aurora Background */}
      <div className="aurora-container">
        <div className="aurora-glow-violet"></div>
        <div className="aurora-glow-cyan"></div>
      </div>

      {/* 3D Background Canvas (Centerpiece) */}
      <div className="canvas-container absolute inset-0 w-full h-full z-10 flex items-center justify-center pointer-events-none opacity-0">
        <div className="w-full max-w-[800px] h-[75vh] md:h-screen">
          <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
            <ambientLight intensity={0.6} />
            <Floating3DBackground />
          </Canvas>
        </div>
      </div>

      {/* Left Column (Desktop: left sidebar role, Mobile: top center) */}
      <div className="relative z-20 w-full max-w-6xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row justify-between items-center h-full lg:h-auto gap-8 lg:gap-0">
        
        {/* Name Column */}
        <div className="w-full lg:w-auto text-left lg:max-w-md self-start lg:self-center">
          <p className="hero-fade-in text-[#6C63FF] font-mono text-sm tracking-[0.2em] uppercase mb-2 opacity-0">
            Hello! I'm
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-extrabold text-white tracking-tight leading-[1.1] mb-4 select-none">
            {nameChars.map((char, index) => (
              <span
                key={index}
                className="char inline-block opacity-0"
                style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
              >
                {char}
              </span>
            ))}
          </h1>
          <p className="hero-fade-in text-[#6B6B80] font-sans text-sm md:text-base leading-relaxed opacity-0 max-w-sm">
            {PORTFOLIO.tagline}
          </p>
        </div>

        {/* Right Column (Desktop: right sidebar role, Mobile: bottom center) */}
        <div className="w-full lg:w-auto text-left lg:max-w-md self-end lg:self-center flex flex-col items-start lg:items-end">
          <div className="hero-fade-in flex flex-col items-start lg:items-end relative select-none opacity-0">
            <span className="text-[#00D4FF] font-mono text-sm tracking-widest uppercase mb-1">
              A Creative
            </span>
            <div className="relative font-heading font-extrabold tracking-wider leading-none mt-2 select-none">
              {/* Back Outline text */}
              <div className="text-outline-gray text-5xl md:text-7xl opacity-35 select-none uppercase">
                DEVELOPER
              </div>
              {/* Front Solid Text */}
              <div className="absolute top-4 left-4 lg:left-auto lg:right-4 text-[#E8E8F0] text-4xl md:text-6xl font-black drop-shadow-[0_0_15px_rgba(108,99,255,0.35)] uppercase">
                ENGINEER
              </div>
            </div>
          </div>
          
          {/* Scroll Button Overlay */}
          <div className="hero-fade-in mt-12 flex gap-4 opacity-0">
            <button
              onClick={(e) => handleScrollTo(e, 'projects')}
              className="interactive px-6 py-2.5 rounded-full border border-[#6C63FF] text-[#E8E8F0] text-xs font-heading font-semibold hover:bg-[#6C63FF]/15 hover:border-[#00D4FF] transition-all duration-300 shadow-[0_0_15px_rgba(108,99,255,0.1)]"
            >
              My Work
            </button>
            <button
              onClick={(e) => handleScrollTo(e, 'contact')}
              className="interactive px-6 py-2.5 rounded-full border border-[#1E1E2E] bg-[#111118]/80 text-[#6B6B80] hover:text-white hover:border-[#6C63FF] transition-all duration-300 text-xs font-heading font-semibold"
            >
              Contact
            </button>
          </div>
        </div>

      </div>

      {/* Down Scroll Indicator */}
      <div className="hero-fade-in absolute bottom-6 z-20 animate-bounce hidden lg:block opacity-0">
        <button
          onClick={(e) => handleScrollTo(e, 'about')}
          className="text-[#6B6B80] hover:text-[#00D4FF] transition-colors duration-300"
          aria-label="Scroll Down"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default Hero;
