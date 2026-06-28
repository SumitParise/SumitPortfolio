import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import useScrollReveal from '../../hooks/useScrollReveal';
import { PORTFOLIO } from '../../data/portfolio';

// Dynamic sliced retrowave sun texture generator
const createSunTexture = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.clearRect(0, 0, 512, 512);
    
    // Sun gradient (neon pink to warm orange)
    const grad = ctx.createLinearGradient(0, 0, 0, 512);
    grad.addColorStop(0, '#ff007f');
    grad.addColorStop(1, '#ff8c00');
    ctx.fillStyle = grad;
    
    ctx.beginPath();
    ctx.arc(256, 256, 240, 0, Math.PI * 2);
    ctx.fill();
    
    // Sliced retro cuts (bottom stripes get thicker)
    ctx.globalCompositeOperation = 'destination-out';
    for (let y = 260; y < 512; y += 26) {
      const thickness = 5 + (y - 260) * 0.08;
      ctx.fillRect(0, y, 512, thickness);
    }
  }
  const texture = new THREE.CanvasTexture(canvas);
  return texture;
};

// Dynamic skyscraper window grid texture generator
const createBuildingTexture = (seed: number) => {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    // Skyscraper dark base
    ctx.fillStyle = '#0f0f14';
    ctx.fillRect(0, 0, 256, 512);
    
    // Draw office windows grid
    ctx.fillStyle = '#ffdf6d'; // Warm amber glow
    const rand = () => {
      const x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);
    };
    
    for (let x = 20; x < 256; x += 36) {
      for (let y = 30; y < 512; y += 45) {
        // Randomly turn windows on/off (55% chance on)
        if (rand() > 0.45) {
          ctx.shadowColor = '#ffdf6d';
          ctx.shadowBlur = 6;
          ctx.fillRect(x, y, 12, 18);
        }
      }
    }
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
};

// Stylized Low-Poly Synthwave Car
function CyberCar() {
  const bodyRef = useRef<THREE.Group>(null);
  const wheelFL = useRef<THREE.Mesh>(null);
  const wheelFR = useRef<THREE.Mesh>(null);
  const wheelBL = useRef<THREE.Mesh>(null);
  const wheelBR = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Engine rumbling vibration
    if (bodyRef.current) {
      bodyRef.current.position.y = 0.35 + Math.sin(time * 20) * 0.008;
      bodyRef.current.rotation.z = Math.sin(time * 2.5) * 0.005;
    }
    
    // Wheels spin on drive
    const spinSpeed = 0.22;
    [wheelFL, wheelFR, wheelBL, wheelBR].forEach((ref) => {
      if (ref.current) {
        ref.current.rotation.x += spinSpeed;
      }
    });
  });

  return (
    <group ref={bodyRef} position={[0, 0.35, 1.8]}>
      {/* Car Body Base (Shiny metallic purple paint) */}
      <mesh castShadow>
        <boxGeometry args={[1.0, 0.32, 1.9]} />
        <meshPhysicalMaterial color="#3a1c6a" roughness={0.1} metalness={0.9} clearcoat={1.0} />
      </mesh>
      
      {/* Cabin/Glass (Cyan transparent) */}
      <mesh position={[0, 0.28, -0.1]} castShadow>
        <boxGeometry args={[0.8, 0.28, 0.9]} />
        <meshStandardMaterial color="#00D4FF" roughness={0.05} transparent opacity={0.6} />
      </mesh>

      {/* Driver Person sitting inside */}
      <group position={[0, 0.28, -0.1]}>
        <mesh position={[0, 0.08, 0.1]}>
          <sphereGeometry args={[0.09, 8, 8]} />
          <meshBasicMaterial color="#eae5ec" />
        </mesh>
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
      
      {/* Headlight beams */}
      <spotLight
        position={[0, 0.1, 1.0]}
        angle={0.45}
        penumbra={0.6}
        intensity={6}
        color="#00D4FF"
        distance={20}
      />

      {/* Red Exhaust Tail Light (Brakes glow) */}
      <mesh position={[0, 0.05, -0.96]}>
        <boxGeometry args={[0.7, 0.06, 0.02]} />
        <meshBasicMaterial color="#ff0055" />
      </mesh>
      {/* Tail light glow */}
      <pointLight position={[0, 0.1, -1.1]} intensity={2.0} distance={4} color="#ff0055" />

      {/* Wheels */}
      <mesh ref={wheelFL} position={[-0.56, -0.12, 0.55]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.2, 0.2, 0.15, 12]} />
        <meshStandardMaterial color="#0a0a0f" roughness={0.9} />
      </mesh>
      <mesh ref={wheelFR} position={[0.56, -0.12, 0.55]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.2, 0.2, 0.15, 12]} />
        <meshStandardMaterial color="#0a0a0f" roughness={0.9} />
      </mesh>
      <mesh ref={wheelBL} position={[-0.56, -0.12, -0.55]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.2, 0.2, 0.15, 12]} />
        <meshStandardMaterial color="#0a0a0f" roughness={0.9} />
      </mesh>
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
  const roadSpeed = 0.18;

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (dividersRef.current) {
      dividersRef.current.position.z = (time * roadSpeed * 60) % 6.0;
    }
  });

  return (
    <group>
      {/* Asphalt pavement */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[9, 120]} />
        <meshStandardMaterial color="#07070a" roughness={0.95} />
      </mesh>

      {/* Sidewalk curbs */}
      <mesh position={[-2.8, 0.05, 0]} receiveShadow>
        <boxGeometry args={[0.15, 0.1, 120]} />
        <meshStandardMaterial color="#333344" roughness={0.8} />
      </mesh>
      <mesh position={[2.8, 0.05, 0]} receiveShadow>
        <boxGeometry args={[0.15, 0.1, 120]} />
        <meshStandardMaterial color="#333344" roughness={0.8} />
      </mesh>

      {/* Divider dashes */}
      <group ref={dividersRef}>
        {[...Array(20)].map((_, idx) => {
          const z = -idx * 6.0;
          return (
            <mesh key={idx} position={[0, 0.02, z]} rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[0.12, 1.2]} />
              <meshBasicMaterial color="#00D4FF" transparent opacity={0.4} />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}

function TechBuildings({ skills, colorMap }: { skills: string[]; colorMap: Record<string, string> }) {
  const scrollSpeed = 0.18;

  // Build skyscraper grid textures
  const skyscraperTextures = useMemo(() => {
    return skills.map((_, idx) => createBuildingTexture(idx * 50));
  }, [skills]);

  // Setup buildings mapped onto alternating sides of the street
  const buildings = useMemo(() => {
    return skills.map((skill, idx) => {
      const isLeft = idx % 2 === 0;
      const x = isLeft ? -4.2 : 4.2;
      const z = -idx * 9.0;
      const height = 4.5 + Math.random() * 3.0;
      
      const ref = { current: null as THREE.Group | null };
      
      return {
        name: skill,
        x,
        z,
        height,
        ref,
        texture: skyscraperTextures[idx]
      };
    });
  }, [skills, skyscraperTextures]);

  useFrame(() => {
    const count = buildings.length;
    buildings.forEach((b) => {
      b.z += scrollSpeed;
      if (b.z > 8) {
        b.z = -count * 9.0 + 8;
        b.height = 4.5 + Math.random() * 3.0;
      }
      if (b.ref.current) {
        b.ref.current.position.set(b.x, b.height / 2, b.z);
      }
    });
  });

  return (
    <group>
      {buildings.map((b, idx) => {
        const isDesign = ['three.js', 'gsap', 'html5/css3', 'tailwind css'].includes(b.name.toLowerCase());
        const color = colorMap[b.name] || '#6C63FF';

        return (
          <group ref={b.ref} key={idx} position={[b.x, b.height / 2, b.z]}>
            
            {/* Real Office Skyscraper (Textured with glowing amber windows) */}
            <mesh castShadow receiveShadow>
              <boxGeometry args={[1.8, b.height, 1.8]} />
              <meshStandardMaterial map={b.texture} roughness={0.4} metalness={0.4} />
            </mesh>

            {/* Glowing Wireframe Skyscraper Outline */}
            <mesh>
              <boxGeometry args={[1.81, b.height + 0.01, 1.81]} />
              <meshBasicMaterial color={color} wireframe transparent opacity={0.25} />
            </mesh>

            {/* Sidewalk street lamp post */}
            <mesh position={[b.x < 0 ? 1.1 : -1.1, -b.height / 2 + 1.25, 0.8]}>
              <cylinderGeometry args={[0.03, 0.03, 2.5, 8]} />
              <meshStandardMaterial color="#2d2d3a" roughness={0.8} />
            </mesh>
            
            {/* Street lamp bulb */}
            <mesh position={[b.x < 0 ? 0.95 : -0.95, -b.height / 2 + 2.5, 0.8]}>
              <sphereGeometry args={[0.08, 8, 8]} />
              <meshBasicMaterial color="#ffea75" />
            </mesh>

            {/* Passing Streetlamp Spotlight Cone (Warm glow on road) */}
            <spotLight
              position={[b.x < 0 ? 0.95 : -0.95, -b.height / 2 + 2.4, 0.8]}
              angle={0.65}
              penumbra={0.6}
              intensity={2.8}
              color="#ffea75"
              distance={6.5}
            />

            {/* Localized neon emission light behind billboard */}
            <pointLight
              position={[b.x < 0 ? 0.95 : -0.95, 0, 0]}
              intensity={2.2}
              distance={6.0}
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

  // Sliced retrowave sunset horizon background
  const sunTexture = useMemo(() => createSunTexture(), []);

  return (
    <section
      id="techstack"
      ref={containerRef}
      className="py-20 md:py-36 px-6 md:px-12 max-w-6xl mx-auto overflow-hidden relative select-none"
    >
      {/* Giant Background Monospace Title */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none z-0">
        <h2 className="font-heading font-black text-5xl sm:text-7xl md:text-9xl text-white/[0.02] tracking-[0.25em] leading-none uppercase">
          MY TECHSTACK
        </h2>
      </div>

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
      <div className="reveal-item w-full h-[55vh] md:h-[70vh] relative z-10 overflow-hidden flex items-center justify-center border border-[#1E1E2E]/60 bg-[#060609]/65 rounded-2xl shadow-2xl">
        <Canvas
          shadows
          camera={{ position: [0, 2.0, 5.8], fov: 45 }}
          gl={{ alpha: true, antialias: true }}
        >
          <ambientLight intensity={0.9} />
          
          {/* Neon sky light */}
          <directionalLight position={[0, 10, -20]} intensity={1.5} color="#ff007f" />
          <spotLight position={[0, 20, 10]} penumbra={0.8} intensity={2.0} castShadow />

          {/* Far Horizon: Sliced Retrowave Sunset */}
          <mesh position={[0, 1.6, -45]}>
            <circleGeometry args={[13, 32]} />
            <meshBasicMaterial map={sunTexture} transparent />
          </mesh>

          {/* Far Horizon: Parallax Low-poly wireframe mountain flanking peaks */}
          <mesh position={[-18, 0.8, -44]} rotation={[0, Math.PI / 4, 0]}>
            <coneGeometry args={[14, 12, 4]} />
            <meshBasicMaterial color="#6c63ff" wireframe transparent opacity={0.12} />
          </mesh>
          <mesh position={[18, 0.6, -44]} rotation={[0, Math.PI / 4, 0]}>
            <coneGeometry args={[16, 14, 4]} />
            <meshBasicMaterial color="#00d4ff" wireframe transparent opacity={0.12} />
          </mesh>
          
          <ScrollingRoad />
          <CyberCar />
          <TechBuildings skills={skills} colorMap={colorMap} />
        </Canvas>
      </div>
    </section>
  );
};

export default TechStack;
