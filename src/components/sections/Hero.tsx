import { useEffect, useRef, useMemo, useState } from 'react';
import gsap from 'gsap';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { PORTFOLIO } from '../../data/portfolio';

// 3D centerpiece interaction props
interface SphereProps {
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
}

// Double rotating 3D centerpiece representing a glowing atomic molecule/nucleus system
function DualRotatingSphere({ mouseRef }: SphereProps) {
  const modelGroupRef = useRef<THREE.Group>(null);
  const nucleusGroupRef = useRef<THREE.Group>(null);
  
  const orbit1GroupRef = useRef<THREE.Group>(null);
  const orbit2GroupRef = useRef<THREE.Group>(null);
  const orbit3GroupRef = useRef<THREE.Group>(null);

  const e1Ref = useRef<THREE.Mesh>(null);
  const e2Ref = useRef<THREE.Mesh>(null);
  const e3Ref = useRef<THREE.Mesh>(null);
  
  const pointsRef = useRef<THREE.Points>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const { x, y } = mouseRef.current;

    // 1. Position the point light relative to pointer coords
    if (lightRef.current) {
      lightRef.current.position.x = THREE.MathUtils.lerp(lightRef.current.position.x, x * 5.0, 0.08);
      lightRef.current.position.y = THREE.MathUtils.lerp(lightRef.current.position.y, y * 5.0, 0.08);
    }

    // 2. Nucleus slow rotation
    if (nucleusGroupRef.current) {
      nucleusGroupRef.current.rotation.y = time * 0.15;
      nucleusGroupRef.current.rotation.x = time * 0.08;
    }

    // 3. Move electrons along their orbits over time
    const radius = 1.8;
    if (e1Ref.current) {
      e1Ref.current.position.x = radius * Math.cos(time * 1.6);
      e1Ref.current.position.y = radius * Math.sin(time * 1.6);
    }
    if (e2Ref.current) {
      e2Ref.current.position.x = radius * Math.cos(time * 2.3 + 1.0);
      e2Ref.current.position.y = radius * Math.sin(time * 2.3 + 1.0);
    }
    if (e3Ref.current) {
      e3Ref.current.position.x = radius * Math.cos(time * 1.9 + 2.0);
      e3Ref.current.position.y = radius * Math.sin(time * 1.9 + 2.0);
    }

    // 4. Smooth mouse tilt on the main model group
    if (modelGroupRef.current) {
      modelGroupRef.current.rotation.x = THREE.MathUtils.lerp(modelGroupRef.current.rotation.x, y * 0.5, 0.08);
      modelGroupRef.current.rotation.y = THREE.MathUtils.lerp(modelGroupRef.current.rotation.y, x * 0.5, 0.08);
    }

    // 5. Sway surrounding particle shell
    if (pointsRef.current) {
      pointsRef.current.rotation.y = -time * 0.015 - x * 0.08;
      pointsRef.current.rotation.x = time * 0.003 - y * 0.08;
      const scale = 1.0 + Math.sin(time * 0.3) * 0.04;
      pointsRef.current.scale.set(scale, scale, scale);
    }
  });

  // Particles coordinates
  const particlesCount = 260;
  const positions = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 2.4 + Math.random() * 2.6;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  return (
    <group>
      {/* Light tracking the pointer */}
      <pointLight ref={lightRef} intensity={35} distance={15} color="#00D4FF" />

      {/* Main Model Group (Tilts with mouse) */}
      <group ref={modelGroupRef}>
        
        {/* Central Nucleus Cluster */}
        <group ref={nucleusGroupRef}>
          {/* Binding Energy Cloud Core */}
          <mesh>
            <sphereGeometry args={[0.45, 32, 32]} />
            <meshStandardMaterial
              color="#00D4FF"
              emissive="#00D4FF"
              emissiveIntensity={0.65}
              transparent
              opacity={0.3}
              roughness={0.1}
              metalness={0.9}
            />
          </mesh>
          
          {/* Protons & Neutrons tightly bound */}
          {/* Proton 1 (Cyan) */}
          <mesh position={[0.12, 0.08, -0.05]}>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial color="#00D4FF" emissive="#00D4FF" emissiveIntensity={0.8} metalness={0.8} roughness={0.2} />
          </mesh>
          {/* Proton 2 (Cyan) */}
          <mesh position={[-0.12, -0.08, 0.05]}>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial color="#00D4FF" emissive="#00D4FF" emissiveIntensity={0.8} metalness={0.8} roughness={0.2} />
          </mesh>
          {/* Proton 3 (Cyan) */}
          <mesh position={[0.05, -0.12, -0.08]}>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial color="#00D4FF" emissive="#00D4FF" emissiveIntensity={0.8} metalness={0.8} roughness={0.2} />
          </mesh>
          {/* Neutron 1 (Purple) */}
          <mesh position={[-0.08, 0.12, 0.08]}>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial color="#6C63FF" emissive="#6C63FF" emissiveIntensity={0.7} metalness={0.8} roughness={0.2} />
          </mesh>
          {/* Neutron 2 (Purple) */}
          <mesh position={[0.08, -0.05, 0.12]}>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial color="#6C63FF" emissive="#6C63FF" emissiveIntensity={0.7} metalness={0.8} roughness={0.2} />
          </mesh>
          {/* Neutron 3 (Purple) */}
          <mesh position={[-0.05, -0.1, -0.12]}>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial color="#6C63FF" emissive="#6C63FF" emissiveIntensity={0.7} metalness={0.8} roughness={0.2} />
          </mesh>
        </group>

        {/* Orbit 1 (Tilted X) */}
        <group ref={orbit1GroupRef} rotation={[Math.PI / 3, 0, 0]}>
          {/* Orbit Line Ring */}
          <mesh>
            <torusGeometry args={[1.8, 0.008, 8, 64]} />
            <meshStandardMaterial color="#6C63FF" emissive="#6C63FF" emissiveIntensity={0.4} transparent opacity={0.35} />
          </mesh>
          {/* Electron 1 */}
          <mesh ref={e1Ref}>
            <sphereGeometry args={[0.09, 16, 16]} />
            <meshStandardMaterial color="#00D4FF" emissive="#00D4FF" emissiveIntensity={1.3} roughness={0.1} metalness={0.9} />
          </mesh>
        </group>

        {/* Orbit 2 (Tilted Y & Z) */}
        <group ref={orbit2GroupRef} rotation={[0, Math.PI / 3, Math.PI / 4]}>
          {/* Orbit Line Ring */}
          <mesh>
            <torusGeometry args={[1.8, 0.008, 8, 64]} />
            <meshStandardMaterial color="#00D4FF" emissive="#00D4FF" emissiveIntensity={0.4} transparent opacity={0.35} />
          </mesh>
          {/* Electron 2 */}
          <mesh ref={e2Ref}>
            <sphereGeometry args={[0.09, 16, 16]} />
            <meshStandardMaterial color="#6C63FF" emissive="#6C63FF" emissiveIntensity={1.3} roughness={0.1} metalness={0.9} />
          </mesh>
        </group>

        {/* Orbit 3 (Tilted Inverse) */}
        <group ref={orbit3GroupRef} rotation={[Math.PI / 4, -Math.PI / 3, 0]}>
          {/* Orbit Line Ring */}
          <mesh>
            <torusGeometry args={[1.8, 0.008, 8, 64]} />
            <meshStandardMaterial color="#00D4FF" emissive="#00D4FF" emissiveIntensity={0.4} transparent opacity={0.35} />
          </mesh>
          {/* Electron 3 */}
          <mesh ref={e3Ref}>
            <sphereGeometry args={[0.09, 16, 16]} />
            <meshStandardMaterial color="#00D4FF" emissive="#00D4FF" emissiveIntensity={1.3} roughness={0.1} metalness={0.9} />
          </mesh>
        </group>

      </group>

      {/* Surrounding starfield particles */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#00D4FF"
          size={0.065}
          sizeAttenuation={true}
          transparent
          opacity={0.65}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showCanvas, setShowCanvas] = useState(false);
  const mouseRef = useRef({ x: 0, y: 0 });

  // Split name for two lines
  const nameParts = useMemo(() => {
    const parts = PORTFOLIO.name.toUpperCase().split(' ');
    return {
      first: parts[0] || 'SUMIT',
      second: parts[1] || 'PARISE'
    };
  }, []);

  // Global mouse coordinates listener to prevent pointer-events issues
  useEffect(() => {
    const handleMouseMoveGlobal = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMoveGlobal);
    return () => window.removeEventListener('mousemove', handleMouseMoveGlobal);
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
              <ambientLight intensity={0.4} />
              {/* Static background contrast lights */}
              <pointLight position={[-6, 6, 4]} intensity={6} color="#6C63FF" />
              <pointLight position={[6, -6, 4]} intensity={6} color="#00D4FF" />
              <DualRotatingSphere mouseRef={mouseRef} />
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
