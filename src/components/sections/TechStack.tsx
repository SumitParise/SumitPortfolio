import { useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import useScrollReveal from '../../hooks/useScrollReveal';
import { PORTFOLIO } from '../../data/portfolio';

// Dynamic canvas texture generator
const createTechTexture = (name: string, color: string) => {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    // 1. Glossy white base
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 256, 256);
    
    // 2. Circular accent ring
    ctx.strokeStyle = color;
    ctx.lineWidth = 14;
    ctx.beginPath();
    ctx.arc(128, 128, 110, 0, Math.PI * 2);
    ctx.stroke();
    
    // 3. Tech label text
    ctx.fillStyle = '#0a0a0f'; // Dark charcoal text
    ctx.font = 'bold 56px "Space Grotesk", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    const displayMap: Record<string, string> = {
      'React': 'React',
      'TypeScript': 'TS',
      'Node.js': 'NODE',
      'Python': 'PY',
      'Three.js': '3D',
      'GSAP': 'GSAP',
      'REST APIs': 'API',
      'Git': 'GIT',
      'Docker': 'DOCK',
      'Tailwind CSS': 'TW',
      'HTML5/CSS3': 'CSS',
      'FastAPI': 'API',
    };
    const text = displayMap[name] || name;
    ctx.fillText(text.toUpperCase(), 128, 128);
  }
  const texture = new THREE.CanvasTexture(canvas);
  return texture;
};

interface SpherePhysics {
  name: string;
  radius: number;
  pos: THREE.Vector3;
  vel: THREE.Vector3;
  meshRef: React.MutableRefObject<THREE.Mesh | null>;
  texture: THREE.CanvasTexture;
}

function PhysicsContainer({ spheres }: { spheres: SpherePhysics[] }) {
  useFrame((state) => {
    const count = spheres.length;
    
    // Mouse coords in 3D viewport space
    const mouseX = (state.pointer.x * state.viewport.width) / 2;
    const mouseY = (state.pointer.y * state.viewport.height) / 2;
    const mousePos = new THREE.Vector3(mouseX, mouseY, 0);

    // 1. Apply gravity attraction to center & mouse repulsion forces
    spheres.forEach((s) => {
      // Pull to center
      const toCenter = s.pos.clone().negate().normalize().multiplyScalar(0.008);
      s.vel.add(toCenter);

      // Repel from cursor pointer
      const toMouse = s.pos.clone().sub(mousePos);
      toMouse.z = 0; // Constrain force to 2D
      const distToMouse = toMouse.length();
      if (distToMouse < 2.8) {
        const force = (2.8 - distToMouse) * 0.06;
        s.vel.add(toMouse.normalize().multiplyScalar(force));
      }

      // Friction damping
      s.vel.multiplyScalar(0.93);
      
      // Update position
      s.pos.add(s.vel);
    });

    // 2. Multi-pass sphere-to-sphere collision solver for physics stability
    for (let k = 0; k < 3; k++) {
      for (let i = 0; i < count; i++) {
        for (let j = i + 1; j < count; j++) {
          const sA = spheres[i];
          const sB = spheres[j];
          
          const dir = sA.pos.clone().sub(sB.pos);
          dir.z = 0; // Keep collisions on 2D plane
          const dist = dir.length();
          const minDist = sA.radius + sB.radius;
          
          if (dist < minDist) {
            const overlap = minDist - dist;
            // Push overlap resolution
            const push = dir.normalize().multiplyScalar(overlap * 0.52);
            sA.pos.add(push);
            sB.pos.sub(push);
            
            // Elastic velocity transfer
            const relVel = sA.vel.clone().sub(sB.vel);
            const speed = relVel.dot(dir);
            if (speed < 0) {
              const impulse = dir.multiplyScalar(speed * 0.5);
              sA.vel.sub(impulse);
              sB.vel.add(impulse);
            }
          }
        }
      }
    }

    // 3. Boundary constraints (keep spheres in bounds)
    const limitX = state.viewport.width / 2 - 0.6;
    const limitY = state.viewport.height / 2 - 0.6;
    
    spheres.forEach((s) => {
      if (Math.abs(s.pos.x) > limitX) {
        s.pos.x = Math.sign(s.pos.x) * limitX;
        s.vel.x *= -0.4;
      }
      if (Math.abs(s.pos.y) > limitY) {
        s.pos.y = Math.sign(s.pos.y) * limitY;
        s.vel.y *= -0.4;
      }
    });

    // 4. Commit coords to Three meshes and spin them
    spheres.forEach((s) => {
      if (s.meshRef.current) {
        s.pos.z = 0; // Flatten on Z axis
        s.meshRef.current.position.copy(s.pos);
        s.meshRef.current.rotation.x += 0.004 + s.vel.y * 0.05;
        s.meshRef.current.rotation.y += 0.004 + s.vel.x * 0.05;
      }
    });
  });

  return (
    <group>
      {spheres.map((s, idx) => (
        <mesh ref={s.meshRef} key={idx} castShadow receiveShadow>
          <sphereGeometry args={[s.radius, 32, 32]} />
          <meshPhysicalMaterial
            map={s.texture}
            roughness={0.08}
            metalness={0.1}
            clearcoat={1.0}
            clearcoatRoughness={0.08}
            reflectivity={0.95}
          />
        </mesh>
      ))}
    </group>
  );
}

const TechStack = () => {
  const containerRef = useScrollReveal<HTMLDivElement>();
  const skills = PORTFOLIO.skills;

  const colorMap: Record<string, string> = {
    'React': '#00D4FF',
    'TypeScript': '#6C63FF',
    'Node.js': '#10b981',
    'Python': '#fbbf24',
    'Three.js': '#c084fc',
    'GSAP': '#fb7185',
    'REST APIs': '#a78bfa',
    'Git': '#f87171',
    'Docker': '#38bdf8',
    'Tailwind CSS': '#00D4FF',
    'HTML5/CSS3': '#f43f5e',
    'FastAPI': '#059669',
  };

  // Generate canvas textures
  const textures = useMemo(() => {
    return skills.map(skill => createTechTexture(skill, colorMap[skill] || '#6C63FF'));
  }, [skills]);

  // Setup initial coordinates
  const spheres = useMemo(() => {
    return skills.map((skill, idx) => {
      const angle = (idx / skills.length) * Math.PI * 2;
      const radius = 2.4;
      
      const meshRef = { current: null as THREE.Mesh | null };
      
      return {
        name: skill,
        radius: 0.72,
        pos: new THREE.Vector3(
          Math.cos(angle) * radius + (Math.random() - 0.5) * 0.4,
          Math.sin(angle) * radius * 0.75 + (Math.random() - 0.5) * 0.4,
          0
        ),
        vel: new THREE.Vector3(0, 0, 0),
        meshRef,
        texture: textures[idx]
      };
    });
  }, [skills, textures]);

  return (
    <section
      id="techstack"
      ref={containerRef}
      className="py-20 md:py-32 px-6 md:px-12 max-w-6xl mx-auto overflow-hidden relative select-none"
    >
      {/* Giant Background Monospace Title (Matches moncy.dev aesthetic) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none z-0">
        <h2 className="font-heading font-black text-5xl sm:text-7xl md:text-9xl text-white/[0.02] tracking-[0.25em] leading-none uppercase">
          MY TECHSTACK
        </h2>
      </div>

      {/* 3D Physics Canvas Container */}
      <div className="reveal-item w-full h-[50vh] md:h-[65vh] relative z-10 overflow-hidden flex items-center justify-center">
        <Canvas
          shadows
          camera={{ position: [0, 0, 8.5], fov: 45 }}
          gl={{ alpha: true, antialias: true }}
          onCreated={(state) => (state.gl.toneMappingExposure = 1.2)}
          className="w-full h-full"
        >
          <ambientLight intensity={0.9} />
          <spotLight position={[20, 20, 25]} penumbra={1} angle={0.2} castShadow />
          <directionalLight position={[-5, 5, -5]} intensity={0.4} />
          <PhysicsContainer spheres={spheres} />
        </Canvas>
      </div>
    </section>
  );
};

export default TechStack;
