import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import useScrollReveal from '../../hooks/useScrollReveal';
import { PORTFOLIO } from '../../data/portfolio';

// Stylized Low-Poly Synthwave Car
function CyberCar() {
  const bodyRef = useRef<THREE.Group>(null);
  const wheelFL = useRef<THREE.Mesh>(null);
  const wheelFR = useRef<THREE.Mesh>(null);
  const wheelBL = useRef<THREE.Mesh>(null);
  const wheelBR = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Simulate engine idle rumble and bobbing
    if (bodyRef.current) {
      bodyRef.current.position.y = 0.35 + Math.sin(time * 18) * 0.01;
      bodyRef.current.rotation.z = Math.sin(time * 2) * 0.008;
    }
    
    // Spin wheels on drive
    const spinSpeed = 0.22;
    [wheelFL, wheelFR, wheelBL, wheelBR].forEach((ref) => {
      if (ref.current) {
        ref.current.rotation.x += spinSpeed;
      }
    });
  });

  return (
    <group ref={bodyRef} position={[0, 0.35, 1.8]}>
      {/* Car Body Base */}
      <mesh castShadow>
        <boxGeometry args={[1.0, 0.35, 1.9]} />
        <meshStandardMaterial color="#6C63FF" roughness={0.1} metalness={0.7} />
      </mesh>
      
      {/* Cabin/Glass (Cyan transparent) */}
      <mesh position={[0, 0.3, -0.1]} castShadow>
        <boxGeometry args={[0.8, 0.3, 0.9]} />
        <meshStandardMaterial color="#00D4FF" roughness={0.05} transparent opacity={0.5} />
      </mesh>

      {/* Driver Person sitting inside */}
      <group position={[0, 0.3, -0.1]}>
        {/* Head */}
        <mesh position={[0, 0.08, 0.1]}>
          <sphereGeometry args={[0.09, 8, 8]} />
          <meshBasicMaterial color="#eae5ec" />
        </mesh>
        {/* Torso */}
        <mesh position={[0, -0.06, 0.1]}>
          <boxGeometry args={[0.22, 0.14, 0.12]} />
          <meshBasicMaterial color="#0c0c12" />
        </mesh>
      </group>

      {/* Glowing Headlights */}
      <mesh position={[-0.38, 0.04, 0.96]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0.38, 0.04, 0.96]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      
      {/* Headlight spotlight beams */}
      <spotLight
        position={[0, 0.1, 1.0]}
        angle={0.45}
        penumbra={0.6}
        intensity={6}
        color="#00D4FF"
        distance={20}
      />

      {/* Wheels */}
      {/* Front Left */}
      <mesh ref={wheelFL} position={[-0.56, -0.12, 0.55]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.2, 0.2, 0.15, 12]} />
        <meshStandardMaterial color="#0a0a0f" roughness={0.9} />
      </mesh>
      {/* Front Right */}
      <mesh ref={wheelFR} position={[0.56, -0.12, 0.55]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.2, 0.2, 0.15, 12]} />
        <meshStandardMaterial color="#0a0a0f" roughness={0.9} />
      </mesh>
      {/* Back Left */}
      <mesh ref={wheelBL} position={[-0.56, -0.12, -0.55]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.2, 0.2, 0.15, 12]} />
        <meshStandardMaterial color="#0a0a0f" roughness={0.9} />
      </mesh>
      {/* Back Right */}
      <mesh ref={wheelBR} position={[0.56, -0.12, -0.55]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.2, 0.2, 0.15, 12]} />
        <meshStandardMaterial color="#0a0a0f" roughness={0.9} />
      </mesh>
    </group>
  );
}

// Infinite Scrolling Asphalt Road and Curb lines
function ScrollingRoad() {
  const dividersRef = useRef<THREE.Group>(null);
  const roadSpeed = 0.18; // Speed matching building parallax scroll

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (dividersRef.current) {
      // Loop the dividers infinitely
      dividersRef.current.position.z = (time * roadSpeed * 60) % 6.0;
    }
  });

  return (
    <group>
      {/* Main road surface */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[9, 120]} />
        <meshStandardMaterial color="#0b0b0f" roughness={0.9} />
      </mesh>

      {/* Sidewalk boundary curbs */}
      <mesh position={[-2.8, 0.05, 0]} receiveShadow>
        <boxGeometry args={[0.15, 0.1, 120]} />
        <meshStandardMaterial color="#2d2d3a" roughness={0.7} />
      </mesh>
      <mesh position={[2.8, 0.05, 0]} receiveShadow>
        <boxGeometry args={[0.15, 0.1, 120]} />
        <meshStandardMaterial color="#2d2d3a" roughness={0.7} />
      </mesh>

      {/* Scrolling central divider dashed lines */}
      <group ref={dividersRef}>
        {[...Array(20)].map((_, idx) => {
          const z = -idx * 6.0;
          return (
            <mesh key={idx} position={[0, 0.02, z]} rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[0.12, 1.2]} />
              <meshBasicMaterial color="#00D4FF" transparent opacity={0.5} />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}

function TechBuildings({ skills, colorMap }: { skills: string[]; colorMap: Record<string, string> }) {
  const scrollSpeed = 0.18; // parallax scrolling speed

  // Setup buildings mapped onto alternating sides of the street
  const buildings = useMemo(() => {
    return skills.map((skill, idx) => {
      const isLeft = idx % 2 === 0;
      const x = isLeft ? -4.2 : 4.2;
      const z = -idx * 9.0; // Staggered along depth
      const height = 4.0 + Math.random() * 2.8;
      
      const ref = { current: null as THREE.Group | null };
      
      return {
        name: skill,
        x,
        z,
        height,
        ref
      };
    });
  }, [skills]);

  useFrame(() => {
    const count = buildings.length;
    buildings.forEach((b) => {
      b.z += scrollSpeed;
      // Wrap around when building passes behind camera
      if (b.z > 8) {
        b.z = -count * 9.0 + 8;
        b.height = 4.0 + Math.random() * 2.8; // Randomize next height
      }

      if (b.ref.current) {
        b.ref.current.position.set(b.x, b.height / 2, b.z);
      }
    });
  });

  return (
    <group>
      {buildings.map((b, idx) => {
        // Tag categories
        const isDesign = ['three.js', 'gsap', 'html5/css3', 'tailwind css'].includes(b.name.toLowerCase());
        const color = colorMap[b.name] || '#6C63FF';

        return (
          <group ref={b.ref} key={idx} position={[b.x, b.height / 2, b.z]}>
            {/* Building solid structure (Lighter color to reflect light) */}
            <mesh castShadow receiveShadow>
              <boxGeometry args={[1.8, b.height, 1.8]} />
              <meshStandardMaterial color="#1c1c27" roughness={0.5} metalness={0.3} />
            </mesh>

            {/* Glowing Brand-Colored Skyscraper Outline */}
            <mesh>
              <boxGeometry args={[1.82, b.height + 0.02, 1.82]} />
              <meshBasicMaterial color={color} wireframe transparent opacity={0.3} />
            </mesh>

            {/* Localized neon emission pointLight to illuminate building facade & street */}
            <pointLight
              position={[b.x < 0 ? 0.95 : -0.95, 0, 0]}
              intensity={2.8}
              distance={6.5}
              color={color}
            />

            {/* Glowing neon backdrop backing the billboard */}
            <mesh
              position={[b.x < 0 ? 0.91 : -0.91, 0, 0]}
              rotation={[0, b.x < 0 ? Math.PI / 2 : -Math.PI / 2, 0]}
            >
              <planeGeometry args={[1.6, 0.9]} />
              <meshBasicMaterial color={color} transparent opacity={0.2} />
            </mesh>

            {/* 3D Projected Interactive Billboard Tag */}
            <Html
              position={[b.x < 0 ? 0.95 : -0.95, 0, 0]}
              rotation={[0, b.x < 0 ? Math.PI / 2 : -Math.PI / 2, 0]}
              transform
              occlude
              distanceFactor={6.2}
            >
              <div
                className="px-4 py-2 rounded-lg border text-center font-mono select-none transition-all duration-300 w-36 hover:scale-105 active:scale-95"
                style={{
                  backgroundColor: '#0a0a0f',
                  borderColor: color,
                  color: color,
                  boxShadow: `0 0 15px ${color}50`
                }}
              >
                <div className="text-xs font-black tracking-widest truncate">{b.name.toUpperCase()}</div>
                <div className="text-[7px] opacity-70 tracking-wider mt-1 uppercase font-semibold">
                  {isDesign ? 'DESIGN / FRONTEND' : 'DEVELOP / BACKEND'}
                </div>
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
}

const TechStack = () => {
  const containerRef = useScrollReveal<HTMLDivElement>();
  const skills = PORTFOLIO.skills;

  const colorMap: Record<string, string> = {
    'React': '#00d8ff',
    'TypeScript': '#3178c6',
    'Node.js': '#339933',
    'Python': '#3776ab',
    'Three.js': '#fbbf24',
    'GSAP': '#88ce02',
    'REST APIs': '#ff6c37',
    'Git': '#f05032',
    'Docker': '#2496ed',
    'Tailwind CSS': '#38bdf8',
    'HTML5/CSS3': '#e34f26',
    'FastAPI': '#009688',
    'Next.js': '#a855f7',
    'MongoDB': '#10b981',
    'PostgreSQL': '#3b82f6',
    'AWS': '#f97316',
    'Express': '#6b7280',
    'GraphQL': '#ec4899',
  };

  return (
    <section
      id="techstack"
      ref={containerRef}
      className="py-20 md:py-36 px-6 md:px-12 max-w-6xl mx-auto overflow-hidden relative select-none"
    >
      {/* Title */}
      <div className="flex flex-col items-center text-center mb-10 relative z-10">
        <div className="flex items-center gap-2 mb-4 justify-center">
          <span className="w-10 h-[2px] bg-[#00D4FF]"></span>
          <span className="font-mono text-sm tracking-widest text-[#00D4FF] uppercase font-semibold">
            Skills
          </span>
          <span className="w-10 h-[2px] bg-[#00D4FF]"></span>
        </div>
        
        <h3 className="text-3xl md:text-5xl font-heading font-extrabold text-white mb-4">
          Tech Drive
        </h3>
        
        <p className="text-[#6B6B80] max-w-lg font-sans text-xs md:text-sm">
          A low-poly retro car cruises down an infinite street of technology skills. Interact with the neon building banners as they scroll by!
        </p>
      </div>

      {/* 3D Scene Viewport */}
      <div className="reveal-item w-full h-[55vh] md:h-[70vh] relative z-10 overflow-hidden flex items-center justify-center border border-[#1E1E2E]/60 bg-[#060609]/60 rounded-2xl">
        <Canvas
          shadows
          camera={{ position: [0, 2.0, 5.8], fov: 45 }}
          gl={{ alpha: true, antialias: true }}
        >
          <ambientLight intensity={1.1} />
          {/* Neon sky pink background light */}
          <directionalLight position={[0, 12, -10]} intensity={1.5} color="#6C63FF" />
          <spotLight position={[0, 20, 20]} penumbra={1} intensity={2.0} castShadow />
          
          <ScrollingRoad />
          <CyberCar />
          <TechBuildings skills={skills} colorMap={colorMap} />
        </Canvas>
      </div>
    </section>
  );
};

export default TechStack;
