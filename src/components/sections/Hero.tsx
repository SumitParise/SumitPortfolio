import { useEffect, useRef, useMemo, useState } from 'react';
import gsap from 'gsap';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { PORTFOLIO } from '../../data/portfolio';

// Double rotating 3D centerpiece
function DualRotatingSphere() {
  const outerSphereRef = useRef<THREE.Mesh>(null);
  const innerSphereRef = useRef<THREE.Mesh>(null);
  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Outer Sphere - slow rotation
    if (outerSphereRef.current) {
      outerSphereRef.current.rotation.x = time * 0.05;
      outerSphereRef.current.rotation.y = time * 0.08;
      // Gentle breathing animation
      const scale = 1.8 + Math.sin(time * 0.5) * 0.08;
      outerSphereRef.current.scale.set(scale, scale, scale);
    }

    // Inner Sphere - faster rotation in opposite direction
    if (innerSphereRef.current) {
      innerSphereRef.current.rotation.x = -time * 0.1;
      innerSphereRef.current.rotation.y = -time * 0.15;
      const scale = 1.0 + Math.sin(time * 0.5) * 0.04;
      innerSphereRef.current.scale.set(scale, scale, scale);
    }

    // Outer particle shell rotation
    if (pointsRef.current) {
      pointsRef.current.rotation.y = -time * 0.03;
      pointsRef.current.rotation.x = time * 0.01;
    }
  });

  return (
    <group>
      {/* Outer Dense Wireframe Sphere */}
      <mesh ref={outerSphereRef}>
        <icosahedronGeometry args={[1.3, 2]} />
        <meshBasicMaterial color="#6C63FF" wireframe transparent opacity={0.35} />
      </mesh>

      {/* Inner Wireframe Sphere */}
      <mesh ref={innerSphereRef}>
        <icosahedronGeometry args={[0.8, 1]} />
        <meshBasicMaterial color="#00D4FF" wireframe transparent opacity={0.3} />
      </mesh>
      
      {/* Surrounding Particles (using standard sphereGeometry to prevent binding crashes) */}
      <points ref={pointsRef}>
        <sphereGeometry args={[3.2, 20, 20]} />
        <pointsMaterial
          color="#00D4FF"
          size={0.04}
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
  const [showCanvas, setShowCanvas] = useState(false);

  // Split name for two lines (e.g. "SUMIT" and "PARISE")
  const nameParts = useMemo(() => {
    const parts = PORTFOLIO.name.toUpperCase().split(' ');
    return {
      first: parts[0] || 'SUMIT',
      second: parts[1] || 'PARISE'
    };
  }, []);

  useEffect(() => {
    const canvasTimer = setTimeout(() => setShowCanvas(true), 1200);

    const ctx = gsap.context(() => {
      // 1. Line-by-line reveal of the name
      gsap.fromTo(
        '.reveal-name-line',
        { opacity: 0, y: '100%' },
        {
          opacity: 1,
          y: '0%',
          stagger: 0.15,
          duration: 1.0,
          ease: 'power4.out',
          delay: 0.3,
        }
      );

      // 2. Fade in subtitle, tagline and right side elements
      gsap.fromTo(
        '.hero-fade-in',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 1.0,
          ease: 'power3.out',
          delay: 0.7,
        }
      );

      // 3. Scale and fade in the centerpiece 3D Canvas
      gsap.fromTo(
        '.canvas-container',
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.8,
          ease: 'power2.out',
          delay: 0.4,
        }
      );
    }, containerRef);

    return () => {
      clearTimeout(canvasTimer);
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full h-screen bg-[#0a0a0f] overflow-hidden flex flex-col justify-center items-center px-6 md:px-12"
    >
      {/* Signature Breathing Aurora Background */}
      <div className="aurora-container">
        <div className="aurora-glow-violet"></div>
        <div className="aurora-glow-cyan"></div>
      </div>

      {/* 3D Centerpiece WebGL Canvas */}
      <div className="canvas-container absolute inset-0 w-full h-full z-10 flex items-center justify-center pointer-events-none opacity-0">
        <div className="w-full max-w-[900px] h-[80vh] md:h-screen">
          {showCanvas && (
            <Canvas camera={{ position: [0, 0, 5.5], fov: 60 }}>
              <ambientLight intensity={0.5} />
              <DualRotatingSphere />
            </Canvas>
          )}
        </div>
      </div>

      {/* Main Content Grid split horizontally */}
      <div className="relative z-20 w-full max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center h-full lg:h-auto py-20 lg:py-0 gap-12 lg:gap-0">
        
        {/* Left Column: Big Uppercase Split Name */}
        <div className="w-full lg:w-[45%] text-left self-start lg:self-center">
          <p className="hero-fade-in text-[#6C63FF] font-mono text-sm tracking-[0.25em] uppercase mb-4 opacity-0">
            Hello! I'm
          </p>
          
          <h1 className="font-heading font-black text-6xl md:text-8xl tracking-wider leading-[0.85] uppercase flex flex-col items-start mb-6">
            <div className="overflow-hidden h-fit py-1">
              <span className="reveal-name-line inline-block opacity-0 translate-y-full text-white">
                {nameParts.first}
              </span>
            </div>
            <div className="overflow-hidden h-fit py-1">
              <span className="reveal-name-line inline-block opacity-0 translate-y-full text-[#6C63FF]">
                {nameParts.second}
              </span>
            </div>
          </h1>

          <p className="hero-fade-in text-[#6B6B80] font-mono text-xs md:text-sm tracking-wider opacity-0 max-w-sm">
            {PORTFOLIO.tagline}
          </p>
        </div>

        {/* Right Column: Overlapping Roles */}
        <div className="w-full lg:w-[45%] text-left lg:text-right self-end lg:self-center flex flex-col items-start lg:items-end">
          <div className="hero-fade-in flex flex-col items-start lg:items-end relative select-none opacity-0">
            <span className="text-[#00D4FF] font-mono text-sm tracking-[0.25em] uppercase mb-4">
              A Creative
            </span>
            
            <div className="relative font-heading font-black leading-none uppercase tracking-widest mt-1">
              {/* Back outlined blurred role */}
              <div className="text-outline-gray text-6xl md:text-8xl opacity-15 select-none leading-none tracking-widest font-black">
                DEVELOPER
              </div>
              {/* Front solid overlapping role */}
              <div className="absolute top-[1.8rem] left-4 lg:left-auto lg:right-4 text-[#E8E8F0] text-5xl md:text-7xl font-extrabold select-none tracking-wider leading-none drop-shadow-[0_0_20px_rgba(108,99,255,0.4)]">
                ENGINEER
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
