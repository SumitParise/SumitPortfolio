import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { SkeletonUtils } from "three-stdlib";
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
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasDiv = useRef<HTMLDivElement | null>(null);
  const hoverDivRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef(new THREE.Scene());
  const { setLoading } = useLoading();

  const [inView, setInView] = useState(false);
  const [loadingModel, setLoadingModel] = useState(true);
  const [hasWebGL, setHasWebGL] = useState(true);

  // 1. Intersection Observer to conditionally mount WebGL Canvas
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      {
        threshold: 0.01,
        rootMargin: "150px", // Preload slightly before viewport entry
      }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // 2. Initialize WebGL scene only when inView is true
  useEffect(() => {
    if (!inView) {
      setLoadingModel(true);
      return;
    }

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
        console.warn("WebGL creation failed, showing static fallback:", e);
        setHasWebGL(false);
        setLoadingModel(false);
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

      let onResize: (() => void) | null = null;

      loadCharacter()
        .then((gltf) => {
          if (gltf) {
            // Clone the skeleton structure and meshes to render in different scenes simultaneously
            const clonedScene = SkeletonUtils.clone(gltf.scene);
            const clonedGltf: any = {
              ...gltf,
              scene: clonedScene
            };

            const animations = setAnimations(clonedGltf);
            hoverDivRef.current && animations.hover(clonedGltf, hoverDivRef.current);
            mixer = animations.mixer;

            if (view === "about") {
              clonedScene.rotation.set(0, 0.7, 0);
            } else {
              clonedScene.rotation.set(0.12, 0.92, 0);
              const neckBone = clonedScene.getObjectByName("spine005");
              if (neckBone) {
                neckBone.rotation.x = 0.6;
              }

              clonedScene.traverse((child: any) => {
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

            scene.add(clonedScene);
            headBone = clonedScene.getObjectByName("spine006") || null;
            screenLight = clonedScene.getObjectByName("screenlight") || null;
            setLoadingModel(false);
            setLoading(100);

            light.turnOnLights();
            if (view === "about") {
              const blink = gltf.animations.find((clip) => clip.name === "Blink");
              if (blink) {
                mixer.clipAction(blink).play();
              }
            } else {
              animations.startIntro();
            }

            onResize = () => {
              if (renderer) {
                handleResize(renderer, camera, canvasDiv, clonedScene);
              }
            };
            window.addEventListener("resize", onResize);
          }
        })
        .catch((err) => {
          console.error("Error loading character model, falling back to static image:", err);
          setHasWebGL(false);
          setLoadingModel(false);
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
        if (onResize) {
          window.removeEventListener("resize", onResize);
        }
        document.removeEventListener("mousemove", onMouseMove);
        if (landingDiv) {
          landingDiv.removeEventListener("touchstart", onTouchStart);
          landingDiv.removeEventListener("touchend", onTouchEnd);
        }
      };
    }
  }, [inView, view]);

  return (
    <div ref={containerRef} className="character-container relative w-full h-full flex items-center justify-center">
      {/* 1. Purple Circle Rim Backdrop */}
      <div className="character-rim"></div>

      {/* 2. Static Fallback/Placeholder Image */}
      {(!hasWebGL || loadingModel) && (
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none select-none">
          <img
            src="/developer_3d.png"
            alt="3D Coder character placeholder"
            className="w-[240px] md:w-[320px] h-auto object-contain drop-shadow-[0_15px_35px_rgba(0,0,0,0.5)] transition-opacity duration-500 opacity-100"
          />
        </div>
      )}

      {/* 3. 3D WebGL Canvas Container */}
      {hasWebGL && inView && (
        <div className="character-model w-full h-full absolute inset-0 z-20" ref={canvasDiv}>
          <div className="character-hover w-full h-full" ref={hoverDivRef}></div>
        </div>
      )}
    </div>
  );
};

export default Scene;
