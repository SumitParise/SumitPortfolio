import * as THREE from "three";
import gsap from "gsap";

export function setCharTimeline(
  character: THREE.Object3D<THREE.Object3DEventMap> | null,
  _camera?: THREE.PerspectiveCamera
) {
  let intensity: number = 0;
  setInterval(() => {
    intensity = Math.random();
  }, 200);

  character?.traverse((object: any) => {
    if (object.name === "screenlight" && object.material) {
      object.material.transparent = true;
      object.material.opacity = 1;
      object.material.emissive.set("#C8BFFF");
      gsap.timeline({ repeat: -1, repeatRefresh: true }).to(object.material, {
        emissiveIntensity: () => intensity * 8,
        duration: () => Math.random() * 0.6,
        delay: () => Math.random() * 0.1,
      });
    }
    if (object.isMesh && object.material && object.material.name === "Material.027") {
      object.material.transparent = true;
      object.material.opacity = 1;
      object.material.color.set("#FFFFFF");
    }
  });
}

export function setAllTimeline() {
  // No-op for local model
}
