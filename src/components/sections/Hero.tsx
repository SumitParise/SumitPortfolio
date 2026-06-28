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
      // Soft breathing scale
      const pulse = 1 + Math.sin(time * 0.5) * 0.05;
      meshRef.current.scale.set(pulse, pulse, pulse);
    }
    if (pointsRef.current) {
      pointsRef.current.rotation.y = -time * 0.03;
      pointsRef.current.rotation.x = -time * 0.01;
    }
  });

  const count = 250;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Distribute particles in a sphere-like shell
      const r = 3 + Math.random() * 4;
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
      {/* Central 3D Geometry */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <icosahedronGeometry args={[1.5, 1]} />
        <meshBasicMaterial color="#6C63FF" wireframe transparent opacity={0.2} />
      </mesh>
      
      {/* Outer Particle Field */}
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
          size={0.05}
          sizeAttenuation={true}
          transparent
          opacity={0.4}
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
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.04,
          duration: 0.8,
          ease: 'back.out(1.5)',
          delay: 0.4,
        }
      );

      // 2. Fade in subtitle, tagline and CTA buttons
      gsap.fromTo(
        '.hero-fade-in',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 1,
          ease: 'power3.out',
          delay: 1.0,
        }
      );

      // 3. Fade in 3D Canvas
      gsap.fromTo(
        '.canvas-container',
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1.5,
          ease: 'power2.out',
          delay: 0.8,
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
      className="relative w-full h-screen bg-[#0a0a0f] flex flex-col justify-center items-center overflow-hidden px-6"
    >
      {/* Signature Breathing Aurora Background */}
      <div className="aurora-container">
        <div className="aurora-glow-violet"></div>
        <div className="aurora-glow-cyan"></div>
      </div>

      {/* 3D Background Canvas */}
      <div className="canvas-container absolute inset-0 w-full h-full z-10 pointer-events-none opacity-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
          <ambientLight intensity={0.5} />
          <Floating3DBackground />
        </Canvas>
      </div>

      {/* Main Content Overlay */}
      <div className="relative z-20 flex flex-col items-center text-center max-w-4xl">
        <p className="hero-fade-in text-[#00D4FF] font-mono text-sm tracking-[0.2em] uppercase mb-4 opacity-0">
          Hello World, I'm
        </p>

        {/* Character-by-character name reveal */}
        <h1 className="text-5xl md:text-8xl font-heading font-bold text-white tracking-tight leading-none mb-6 select-none">
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

        <h2 className="hero-fade-in text-2xl md:text-4xl font-heading font-medium text-[#E8E8F0] mb-4 opacity-0">
          {PORTFOLIO.role}
        </h2>

        <p className="hero-fade-in text-base md:text-lg text-[#6B6B80] max-w-xl mb-10 leading-relaxed font-sans opacity-0">
          {PORTFOLIO.tagline}
        </p>

        <div className="hero-fade-in flex flex-col sm:flex-row items-center justify-center gap-4 w-full opacity-0">
          <button
            onClick={(e) => handleScrollTo(e, 'projects')}
            className="interactive px-8 py-3.5 rounded-full bg-[#6C63FF] text-[#E8E8F0] font-heading font-semibold hover:bg-[#6C63FF]/85 hover:shadow-[0_0_20px_rgba(108,99,255,0.4)] transition-all duration-300 w-full sm:w-auto"
          >
            View My Work
          </button>
          <button
            onClick={(e) => handleScrollTo(e, 'contact')}
            className="interactive px-8 py-3.5 rounded-full border border-[#1E1E2E] bg-[#111118]/80 text-[#E8E8F0] hover:border-[#00D4FF] hover:bg-[#111118] transition-all duration-300 font-heading font-semibold w-full sm:w-auto shadow-[0_0_15px_rgba(0,0,0,0.3)]"
          >
            Contact Me
          </button>
        </div>
      </div>

      {/* Down Arrow Indicator */}
      <div className="hero-fade-in absolute bottom-8 z-20 animate-bounce opacity-0">
        <button
          onClick={(e) => handleScrollTo(e, 'about')}
          className="text-[#6B6B80] hover:text-[#00D4FF] transition-colors duration-300"
          aria-label="Scroll Down"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default Hero;
