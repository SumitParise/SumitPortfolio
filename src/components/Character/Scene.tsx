import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import setCharacter from "./utils/character";
import setLighting from "./utils/lighting";
import { useLoading } from "../../context/LoadingProvider";
import handleResize from "./utils/resizeUtils";
import {
  handleMouseMove,
  handleTouchEnd,
  handleHeadRotation,
  handleTouchMove,
} from "./utils/mouseUtils";
import setAnimations from "./utils/animationUtils";

const Scene = ({ view = "skills" }: { view?: "skills" | "about" }) => {
  const canvasDiv = useRef<HTMLDivElement | null>(null);
  const hoverDivRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef(new THREE.Scene());
  const { setLoading } = useLoading();
  const [hasWebGL, setHasWebGL] = useState(true);

  const [character, setChar] = useState<THREE.Object3D | null>(null);

  useEffect(() => {
    if (canvasDiv.current) {
      let rect = canvasDiv.current.getBoundingClientRect();
      let container = { width: rect.width, height: rect.height };
      const aspect = container.width / container.height;
      const scene = sceneRef.current;

      const isMobile = window.innerWidth < 768;
      let renderer: THREE.WebGLRenderer | undefined;

      try {
        renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: !isMobile,
        });
        renderer.setSize(container.width, container.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2.0));
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1;
        canvasDiv.current.appendChild(renderer.domElement);
      } catch (e) {
        console.warn("WebGL renderer creation failed, falling back to static image:", e);
        setHasWebGL(false);
        setLoading(100);
        return;
      }

      const camera = new THREE.PerspectiveCamera(14.5, aspect, 0.1, 1000);
      camera.position.z = 10;
      if (view === "about") {
        camera.position.set(0, 13.1, 22.0);
      } else {
        camera.position.set(0, 8.4, 75.0);
      }
      camera.zoom = 1.1;
      camera.updateProjectionMatrix();

      let headBone: THREE.Object3D | null = null;
      let screenLight: any | null = null;
      let mixer: THREE.AnimationMixer;

      const clock = new THREE.Clock();

      const light = setLighting(scene);
      const { loadCharacter } = setCharacter(renderer, scene, camera);

      loadCharacter()
        .then((gltf) => {
          if (gltf) {
            const animations = setAnimations(gltf);
            hoverDivRef.current && animations.hover(gltf, hoverDivRef.current);
            mixer = animations.mixer;
            let charScene = gltf.scene;

            if (view === "about") {
              // Portrait close-up view facing camera slightly
              charScene.rotation.set(0, 0.7, 0);
            } else {
              // Align to typing desk immediately
              charScene.rotation.set(0.12, 0.92, 0);
              const neckBone = charScene.getObjectByName("spine005");
              if (neckBone) {
                neckBone.rotation.x = 0.6;
              }

              // Force monitor screen glow materials to be visible instantly
              charScene.traverse((child: any) => {
                if (child.name === "screenlight" && child.material) {
                  child.material.transparent = true;
                  child.material.opacity = 1;
                }
                if (child.isMesh && child.material && child.material.name === "Material.027") {
                  child.material.transparent = true;
                  child.material.opacity = 1;
                }
              });
            }

            setChar(charScene);
            scene.add(charScene);
            headBone = charScene.getObjectByName("spine006") || null;
            screenLight = charScene.getObjectByName("screenlight") || null;
            setLoading(100);

            // Turn on lights and begin animations
            light.turnOnLights();
            if (view === "about") {
              const blink = gltf.animations.find((clip) => clip.name === "Blink");
              if (blink) {
                mixer.clipAction(blink).play();
              }
            } else {
              animations.startIntro();
            }

            window.addEventListener("resize", () => {
              if (renderer) {
                handleResize(renderer, camera, canvasDiv, charScene);
              }
            });
          }
        })
        .catch((err) => {
          console.error("Failed to decrypt or parse character model, using static fallback:", err);
          setHasWebGL(false);
          setLoading(100);
        });

      let mouse = { x: 0, y: 0 },
        interpolation = { x: 0.1, y: 0.2 };

      const onMouseMove = (event: MouseEvent) => {
        handleMouseMove(event, (x, y) => (mouse = { x, y }));
      };
      let debounce: number | undefined;
      const onTouchStart = (event: TouchEvent) => {
        const element = event.target as HTMLElement;
        debounce = setTimeout(() => {
          element?.addEventListener("touchmove", (e: TouchEvent) =>
            handleTouchMove(e, (x, y) => (mouse = { x, y }))
          );
        }, 200);
      };

      const onTouchEnd = () => {
        handleTouchEnd((x, y, interpolationX, interpolationY) => {
          mouse = { x, y };
          interpolation = { x: interpolationX, y: interpolationY };
        });
      };

      document.addEventListener("mousemove", onMouseMove);
      const landingDiv = document.getElementById("landingDiv");
      if (landingDiv) {
        landingDiv.addEventListener("touchstart", onTouchStart);
        landingDiv.addEventListener("touchend", onTouchEnd);
      }
      
      let animationFrameId: number;
      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        if (headBone) {
          handleHeadRotation(
            headBone,
            mouse.x,
            mouse.y,
            interpolation.x,
            interpolation.y,
            THREE.MathUtils.lerp
          );
          light.setPointLight(screenLight);
        }
        const delta = clock.getDelta();
        if (mixer) {
          mixer.update(delta);
        }
        if (renderer) {
          renderer.render(scene, camera);
        }
      };
      animate();

      return () => {
        cancelAnimationFrame(animationFrameId);
        clearTimeout(debounce);
        scene.clear();
        if (renderer) {
          renderer.dispose();
          if (canvasDiv.current && renderer.domElement && canvasDiv.current.contains(renderer.domElement)) {
            canvasDiv.current.removeChild(renderer.domElement);
          }
        }
        window.removeEventListener("resize", () => {
          if (renderer && character) {
            handleResize(renderer, camera, canvasDiv, character);
          }
        });
        document.removeEventListener("mousemove", onMouseMove);
        if (landingDiv) {
          landingDiv.removeEventListener("touchstart", onTouchStart);
          landingDiv.removeEventListener("touchend", onTouchEnd);
        }
      };
    }
  }, [view]);

  if (!hasWebGL) {
    return (
      <div className="character-container flex items-center justify-center">
        <div className="w-[240px] md:w-[320px] h-auto pointer-events-none select-none relative z-10">
          <img
            src="/developer_3d.png"
            alt="3D Developer fallback"
            className="w-full h-auto object-contain drop-shadow-[0_15px_35px_rgba(0,0,0,0.5)]"
          />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="character-container">
        <div className="character-model" ref={canvasDiv}>
          <div className="character-rim"></div>
          <div className="character-hover" ref={hoverDivRef}></div>
        </div>
      </div>
    </>
  );
};

export default Scene;
