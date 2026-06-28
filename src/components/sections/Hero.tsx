import { useEffect, useRef, useMemo, useState } from 'react';
import gsap from 'gsap';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { PORTFOLIO } from '../../data/portfolio';

// 3D centerpiece interaction props
interface SphereProps {
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
}

// Interactive 3D Solar System centerpiece with a glowing real Sun, planets, and moons
function DualRotatingSphere({ mouseRef }: SphereProps) {
  const modelGroupRef = useRef<THREE.Group>(null);
  
  const sunRef = useRef<THREE.Mesh>(null);
  const sunCoronaRef = useRef<THREE.Mesh>(null);
  
  const p1Ref = useRef<THREE.Mesh>(null);
  
  const p2GroupRef = useRef<THREE.Group>(null);
  const moonRef = useRef<THREE.Mesh>(null);
  
  const p3GroupRef = useRef<THREE.Group>(null);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const { x, y } = mouseRef.current;

    // 1. Orbit Planet 1 (Inner)
    if (p1Ref.current) {
      p1Ref.current.position.x = 1.2 * Math.cos(time * 1.8);
      p1Ref.current.position.y = 1.2 * Math.sin(time * 1.8);
      p1Ref.current.rotation.y = time * 2.0;
    }

    // 2. Orbit Planet 2 group (Middle)
    if (p2GroupRef.current) {
      p2GroupRef.current.position.x = 1.8 * Math.cos(time * 1.2);
      p2GroupRef.current.position.y = 1.8 * Math.sin(time * 1.2);
      p2GroupRef.current.rotation.y = time * 1.5;
    }
    // Orbit Moon locally around Planet 2
    if (moonRef.current) {
      moonRef.current.position.x = 0.22 * Math.cos(time * 4.5);
      moonRef.current.position.y = 0.22 * Math.sin(time * 4.5);
      moonRef.current.position.z = 0.08 * Math.sin(time * 4.5);
    }

    // 3. Orbit Planet 3 group (Outer)
    if (p3GroupRef.current) {
      p3GroupRef.current.position.x = 2.4 * Math.cos(time * 0.7);
      p3GroupRef.current.position.y = 2.4 * Math.sin(time * 0.7);
      p3GroupRef.current.rotation.y = time * 0.8;
    }

    // 4. Rotate Sun and pulse Corona glow
    if (sunRef.current) {
      sunRef.current.rotation.y = time * 0.15;
    }
    if (sunCoronaRef.current) {
      sunCoronaRef.current.rotation.y = -time * 0.05;
      const pulse = 1.0 + Math.sin(time * 1.5) * 0.03; // pulsing corona
      sunCoronaRef.current.scale.set(pulse, pulse, pulse);
    }

    // 5. Smooth mouse tilt on the solar system
    if (modelGroupRef.current) {
      modelGroupRef.current.rotation.x = THREE.MathUtils.lerp(modelGroupRef.current.rotation.x, y * 0.45, 0.08);
      modelGroupRef.current.rotation.y = THREE.MathUtils.lerp(modelGroupRef.current.rotation.y, x * 0.45, 0.08);
    }

    // 6. Starfield particles rotation
    if (pointsRef.current) {
      pointsRef.current.rotation.y = -time * 0.008 - x * 0.05;
      pointsRef.current.rotation.x = time * 0.001 - y * 0.05;
    }
  });

  // Particles coordinates (Outer Space background)
  const particlesCount = 280;
  const positions = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 2.6 + Math.random() * 2.8;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  return (
    <group>
      {/* Central Sun point light source casting rays outward */}
      <pointLight position={[0, 0, 0]} intensity={45} distance={15} color="#ffaa00" />

      {/* Main Solar System Model Group (Tilts with mouse) */}
      <group ref={modelGroupRef}>
        
        {/* Central Glowing Sun */}
        <group>
          {/* Main Hot Sun Core */}
          <mesh ref={sunRef}>
            <sphereGeometry args={[0.52, 32, 32]} />
            <meshStandardMaterial
              color="#ffcc00"
              emissive="#ff4400"
              emissiveIntensity={2.5}
              roughness={0.2}
              metalness={0.1}
            />
          </mesh>
          {/* Glowing Sun Corona Aura */}
          <mesh ref={sunCoronaRef}>
            <sphereGeometry args={[0.58, 32, 32]} />
            <meshBasicMaterial
              color="#ff7700"
              transparent
              opacity={0.4}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        </group>

        {/* Orbit 1 (Inner - Tilted slightly) */}
        <group rotation={[Math.PI / 12, 0, 0]}>
          {/* Orbit Line Ring */}
          <mesh>
            <torusGeometry args={[1.2, 0.005, 8, 64]} />
            <meshStandardMaterial color="#6B6B80" transparent opacity={0.12} />
          </mesh>
          {/* Mercury/Venus-like Planet */}
          <mesh ref={p1Ref}>
            <sphereGeometry args={[0.065, 16, 16]} />
            <meshStandardMaterial
              color="#ffb347"
              roughness={0.4}
              metalness={0.6}
              emissive="#ffb347"
              emissiveIntensity={0.15}
            />
          </mesh>
        </group>

        {/* Orbit 2 (Middle - Tilted Earth-like) */}
        <group rotation={[-Math.PI / 18, Math.PI / 24, 0]}>
          {/* Orbit Line Ring */}
          <mesh>
            <torusGeometry args={[1.8, 0.005, 8, 64]} />
            <meshStandardMaterial color="#6B6B80" transparent opacity={0.12} />
          </mesh>
          {/* Earth-like Planet + Orbiting Moon Group */}
          <group ref={p2GroupRef}>
            {/* Blue Planet */}
            <mesh>
              <sphereGeometry args={[0.09, 16, 16]} />
              <meshStandardMaterial
                color="#00aaff"
                roughness={0.2}
                metalness={0.8}
                emissive="#0066ff"
                emissiveIntensity={0.15}
              />
            </mesh>
            {/* Tiny Orbiting Moon */}
            <mesh ref={moonRef}>
              <sphereGeometry args={[0.025, 12, 12]} />
              <meshStandardMaterial
                color="#cccccc"
                roughness={0.6}
                metalness={0.1}
              />
            </mesh>
          </group>
        </group>

        {/* Orbit 3 (Outer - Tilted Saturn-like) */}
        <group rotation={[Math.PI / 24, -Math.PI / 16, 0]}>
          {/* Orbit Line Ring */}
          <mesh>
            <torusGeometry args={[2.4, 0.005, 8, 64]} />
            <meshStandardMaterial color="#6B6B80" transparent opacity={0.12} />
          </mesh>
          {/* Saturn Planet + Ring Group */}
          <group ref={p3GroupRef}>
            {/* Orange Planet */}
            <mesh>
              <sphereGeometry args={[0.08, 16, 16]} />
              <meshStandardMaterial
                color="#ff6600"
                roughness={0.3}
                metalness={0.7}
                emissive="#ff3300"
                emissiveIntensity={0.1}
              />
            </mesh>
            {/* Planetary Ring */}
            <mesh rotation={[Math.PI / 3, 0, 0]}>
              <torusGeometry args={[0.155, 0.012, 4, 32]} />
              <meshStandardMaterial
                color="#ccaa99"
                transparent
                opacity={0.65}
                roughness={0.4}
              />
            </mesh>
          </group>
        </group>

      </group>

      {/* Surrounding Space Starfield particles */}
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
